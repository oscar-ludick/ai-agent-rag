import { AgentMessage } from "./interfaces";
import { AgentRole } from "./enums";

export class AgentPrompt {
  public initPrompt(instruction: string): AgentMessage {
    return { role: AgentRole.SYSTEM, content: instruction };
  }

  public forSystem(instruction: string, content: string): AgentMessage {
    return { role: AgentRole.SYSTEM, content: `${instruction} ${content}` };
  }

  public forAssistant(content: string): AgentMessage {
    return { role: AgentRole.ASSISTANT, content };
  }

  public forUser(content: string): AgentMessage {
    return { role: AgentRole.USER, content };
  }
}
