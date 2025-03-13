export interface MetricData {
  timestamp: string;
  value: number;
}

export interface ServiceHealth {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  uptime: number;
  region: string;
  lastIncident?: string;
  metrics: {
    cpu: number;
    memory: number;
    requests: number;
  };
}

export interface DeploymentStatus {
  id: string;
  service: string;
  status: 'success' | 'failed' | 'in-progress' | 'rollback';
  timestamp: string;
  version: string;
  author: string;
  commitHash: string;
  environment: 'production' | 'staging' | 'development';
  duration: number;
  rollbackAvailable: boolean;
}

export interface AlertNotification {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  timestamp: string;
  service: string;
  acknowledged: boolean;
}

export interface SystemMetrics {
  cpu: MetricData[];
  memory: MetricData[];
  requests: MetricData[];
  errors: MetricData[];
  latency: MetricData[];
}