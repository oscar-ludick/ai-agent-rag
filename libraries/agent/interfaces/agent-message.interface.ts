import { AgentRole } from "../enums";

export interface AgentMessage {
  readonly role: AgentRole;
  readonly content: string;
}
