export type CallStatus = "waiting" | "in-progress" | "ended";

export interface CallRecord {
  channelName: string;
  token?: string;        // Agora token
  status: CallStatus;
  createdAt: number;       // ms epoch
  lastHeartbeatAt: number; // ms epoch
  callerUid: number;       // e.g., 0
  operatorUid?: number;    // set when operator joins
}

