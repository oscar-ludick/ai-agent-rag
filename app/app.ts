import { EnvUtil } from '../libraries/core';
import { Agent, AgentOllama } from '../libraries/agent';
import { Parser, ParserTextService } from '../libraries/parser';
import { Metadata, MetadataResult, MetadataService } from '../libraries/metadata';

import { ResourceFacade } from './resource';
import { MessageFacade, MessageModel } from './message';
import { EmbeddingFacade, EmbeddingModel } from './embedding';

export class App {
  private readonly agent!: Agent;

  private readonly parser!: Parser;

  private readonly metadata!: Metadata;

  private readonly messageFacade!: MessageFacade;

  private readonly resourceFacade!: ResourceFacade;

  private readonly embeddingFacade!: EmbeddingFacade;

  constructor() {
    this.parser = new ParserTextService();
    this.metadata = new MetadataService();

    this.messageFacade = new MessageFacade();
    this.resourceFacade = new ResourceFacade();
    this.embeddingFacade = new EmbeddingFacade();

    const model = EnvUtil.load('AI_MODEL');
    const alive = EnvUtil.load('AI_ALIVE');
    this.agent = new AgentOllama(model, alive);
  }

  public async startChatAgent(query: string, onResponse: (content: string) => void): Promise<void> {
    const resources = await this.getEmbeddingContentFromQuery(query);
    const options = {
      resources,
      prompt: query,
      initialInstruction:
        'You are a helpful assistant.\n' +
        ' Follow the next instructions provided by the role: system.\n' +
        ' All the instructions must be read/interpreted in english.\n' +
        ' Always answer to the user in spanish, does not matter if the question is in english.\n' +
        ' Use the knowledge base as the only resource to answer the user question.\n' +
        ' Only respond to questions using information from the knowledge base.\n' +
        ' if no relevant information is found on the knowledge base respond with: "Sorry, I don\'t know."',
      concurrentInstruction: 'Answer the next user question using this as the knowledge base:',
    };
    const chatId = this.agent.getId();
    const results = await this.agent.getChat(options, ({ content }) => onResponse(content));
    const models: MessageModel[] = results.map(({ content }) => ({ chatId, message: content }));
    const messages = await this.messageFacade.insertManyUseCase.execute(models);
    const contents = this.getMessageContent(messages);
    const metadata = this.getContentMetadata(contents);
    await this.updateKnowledgeBaseWithMetadata(metadata);
  }

  public async createKnowledgeBase(): Promise<void> {
    await this.resourceFacade.deleteManyUseCase.execute();
    await this.embeddingFacade.deleteManyUseCase.execute();
    const contents = this.getDirectoryContent();
    const metadata = this.getContentMetadata(contents);
    await this.updateKnowledgeBaseWithMetadata(metadata);
  }

  public async updateKnowledgeBase(): Promise<void> {
    const messages = await this.messageFacade.selectAllUseCase.execute();
    const contents = this.getMessageContent(messages);
    const metadata = this.getContentMetadata(contents);
    await this.updateKnowledgeBaseWithMetadata(metadata);
  }

  private async updateKnowledgeBaseWithMetadata(metadata: MetadataResult[]): Promise<void> {
    for (const { source, content, chunks } of metadata) {
      const resource = await this.resourceFacade.insertOneUseCase.execute({ source, content });
      if (resource && resource.id) {
        const embeddings: EmbeddingModel[] = await this.agent.getEmbedding(chunks);
        await this.embeddingFacade.insertManyUseCase.execute(resource.id, embeddings);
      }
    }
  }

  private getDirectoryContent(): Map<string, string> {
    const directory = EnvUtil.load('DATA_DIRECTORY');
    return this.parser.parse(directory);
  }

  private getContentMetadata(contents: Map<string, string>): MetadataResult[] {
    const size = Number(EnvUtil.load('CHUNK_SIZE'));
    const split = new RegExp(EnvUtil.load('CHUNK_SPLIT'));
    return this.metadata.createMetadata(contents, { size, split });
  }

  public async getEmbeddingContentFromQuery(query: string): Promise<string[]> {
    const [{ embedding }] = await this.agent.getEmbedding(query);
    const similarities = await this.embeddingFacade.selectSimilarityUseCase.execute(embedding);
    return similarities.map(({ content }) => content);
  }

  private getMessageContent(messages: MessageModel[]): Map<string, string> {
    const entries = new Map<string, string>();
    for (const { message, chatId } of messages) {
      const chat = entries.get(chatId) || '';
      const newChat = chat.concat(`${message} `);
      entries.set(chatId, newChat);
    }
    return entries;
  }
}
