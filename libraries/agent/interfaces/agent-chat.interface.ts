import { AgentResource } from "../types";

export interface AgentChat {
  readonly prompt: string;
  readonly initialInstruction: string;
  readonly concurrentInstruction: string;
  readonly resources: AgentResource;
}
