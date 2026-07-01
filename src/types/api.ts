export interface PingResponse {
  message: string;
  service: string;
  timestamp: string;
}

export interface HealthResponse {
  status: string;
}

export interface ApiStatus {
  ping: PingResponse;
  health: HealthResponse;
}

export interface StatusState {
  loading: boolean;
  error: string | null;
  ping: PingResponse | null;
  health: HealthResponse | null;
  lastUpdated: string | null;
}
