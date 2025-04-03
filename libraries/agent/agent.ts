import { AgentResource, AgentResponse } from "./types";
import { AgentChat, AgentEmbedding, AgentMessage } from "./interfaces";

export abstract class Agent {
  protected constructor(
    protected readonly model: string,
    protected readonly alive: string,
  ) {
    console.log(`Generating agent with model ${model} with alive ${alive}`);
  }

  public abstract getId(): string;

  public abstract getEmbedding(data: AgentResource): Promise<AgentEmbedding[]>;

  public abstract getChat(chat: AgentChat, onResponse: AgentResponse): Promise<AgentMessage[]>;
}
