import { IDUtil } from '../../core';

import { Agent } from '../agent';
import { AgentPrompt } from '../agent-prompt';
import { AgentResource, AgentResponse } from '../types';
import { AgentChat, AgentEmbedding, AgentMessage } from '../interfaces';

import { AgentOllamaClientService, AgentOllamaEmbeddingService } from './services';

export class AgentOllama extends Agent {
  private readonly chatId!: string;

  private readonly prompt!: AgentPrompt;

  private readonly client!: AgentOllamaClientService;

  private readonly embedding!: AgentOllamaEmbeddingService;

  private history!: AgentMessage[];

  constructor(model: string, alive: string) {
    super(model, alive);
    this.chatId = IDUtil.createRandomID();
    this.prompt = new AgentPrompt();
    this.embedding = new AgentOllamaEmbeddingService();
    this.client = new AgentOllamaClientService(this.model, this.alive);
  }

  public getId(): string {
    return this.chatId;
  }

  public async getEmbedding(data: AgentResource): Promise<AgentEmbedding[]> {
    const chunks: string[] = Array.isArray(data) ? data : [data];
    return this.embedding.create(chunks);
  }

  public async getChat(chat: AgentChat, onResponse: AgentResponse): Promise<AgentMessage[]> {
    const { prompt, resources } = chat;
    this.history = this.history ? this.history : [this.prompt.initPrompt(chat.initialInstruction)];
    const resource: string = this.joinResource(resources);
    const userMessage: AgentMessage = this.prompt.forUser(prompt);
    const systemMessage: AgentMessage = this.prompt.forSystem(chat.concurrentInstruction, resource);
    this.history.push(systemMessage, userMessage);
    console.log(this.history);
    const response: string = await this.client.chat(this.history, onResponse);
    const assistantMessage: AgentMessage = this.prompt.forAssistant(response);
    this.history.push(assistantMessage);
    return [userMessage, assistantMessage];
  }

  private joinResource(resource: AgentResource): string {
    if (!Array.isArray(resource)) {
      return resource || '';
    }
    return resource.join('\t\t');
  }
}
