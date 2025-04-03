import AsyncIterator = NodeJS.AsyncIterator;

import ollama, { ChatResponse } from 'ollama';

import { AgentMessage } from '../../interfaces';
import { AgentResponse } from '../../types';

export class AgentOllamaClientService {
  constructor(
    private readonly model: string,
    private readonly alive: string,
  ) {}

  public async chat(messages: AgentMessage[], onResponse: AgentResponse): Promise<string> {
    const results: string[] = [];
    const response: AsyncIterator<ChatResponse> = await this.createChat(messages);
    for await (const { message } of response) {
      const { content, role } = message as AgentMessage;
      onResponse({ content, role });
      results.push(content);
    }
    return results.join('');
  }

  private createChat(messages: AgentMessage[]): Promise<AsyncIterator<ChatResponse>> {
    return ollama.chat({
      stream: true,
      model: this.model,
      keep_alive: this.alive,
      messages,
    }) as never as Promise<AsyncIterator<ChatResponse>>;
  }
}
