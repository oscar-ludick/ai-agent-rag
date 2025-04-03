import { AgentMessage } from "../interfaces";

export type AgentResponse = (message: AgentMessage) => void;
