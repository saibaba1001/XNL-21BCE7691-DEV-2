import create from 'zustand';
import type { SystemMetrics, ServiceHealth, DeploymentStatus, AlertNotification } from '../types';

interface MetricsStore {
  metrics: SystemMetrics;
  services: ServiceHealth[];
  deployments: DeploymentStatus[];
  alerts: AlertNotification[];
  setMetrics: (metrics: SystemMetrics) => void;
  updateService: (service: ServiceHealth) => void;
  addDeployment: (deployment: DeploymentStatus) => void;
  addAlert: (alert: AlertNotification) => void;
  acknowledgeAlert: (id: string) => void;
}

export const useMetricsStore = create<MetricsStore>((set) => ({
  metrics: {
    cpu: [],
    memory: [],
    requests: [],
    errors: [],
    latency: []
  },
  services: [],
  deployments: [],
  alerts: [],
  setMetrics: (metrics) => set({ metrics }),
  updateService: (updatedService) =>
    set((state) => ({
      services: state.services.map((service) =>
        service.id === updatedService.id ? updatedService : service
      ),
    })),
  addDeployment: (deployment) =>
    set((state) => ({
      deployments: [deployment, ...state.deployments].slice(0, 10),
    })),
  addAlert: (alert) =>
    set((state) => ({
      alerts: [alert, ...state.alerts],
    })),
  acknowledgeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      ),
    })),
}));