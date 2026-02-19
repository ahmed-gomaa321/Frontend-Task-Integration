export interface AgentTools {
  allowHangUp: boolean;
  allowCallback: boolean;
  liveTransfer: boolean;
}

export interface CreateAgentRequest {
  name: string;
  description?: string;
  callType: string;
  language: string;
  voice: string;
  prompt: string;
  model: string;
  latency: number;
  speed: number;
  callScript?: string;
  serviceDescription?: string;
  attachments: string[];
  tools: AgentTools;
}

export interface Agent extends CreateAgentRequest {
  id: string;
}
