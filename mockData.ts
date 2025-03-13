import type { SystemMetrics, ServiceHealth, DeploymentStatus } from '../types';

function generateMetricData(baseValue: number, variance: number, count: number) {
  return Array.from({ length: count }, (_, i) => ({
    timestamp: new Date(Date.now() - (count - i) * 60000).toISOString(),
    value: Math.max(0, baseValue + (Math.random() - 0.5) * variance)
  }));
}

export function mockSystemData() {
  const metrics: SystemMetrics = {
    cpu: generateMetricData(65, 30, 24),
    memory: generateMetricData(75, 20, 24),
    requests: generateMetricData(8500, 3000, 24),
    errors: generateMetricData(2, 1, 24),
    latency: generateMetricData(120, 50, 24)
  };

  const services: ServiceHealth[] = [
    {
      id: '1',
      name: 'API Gateway',
      status: Math.random() > 0.9 ? 'degraded' : 'healthy',
      latency: Math.floor(Math.random() * 100 + 50),
      uptime: 99.99,
      region: 'us-east-1',
      metrics: {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        requests: Math.floor(Math.random() * 10000)
      }
    },
    {
      id: '2',
      name: 'Auth Service',
      status: Math.random() > 0.95 ? 'down' : 'healthy',
      latency: Math.floor(Math.random() * 100 + 30),
      uptime: 99.95,
      region: 'eu-west-1',
      metrics: {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        requests: Math.floor(Math.random() * 10000)
      }
    },
    {
      id: '3',
      name: 'Database Cluster',
      status: Math.random() > 0.8 ? 'degraded' : 'healthy',
      latency: Math.floor(Math.random() * 100 + 20),
      uptime: 99.999,
      region: 'ap-southeast-1',
      metrics: {
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        requests: Math.floor(Math.random() * 10000)
      }
    }
  ];

  const deployments: DeploymentStatus[] = [
    {
      id: '1',
      service: 'API Gateway',
      status: 'success',
      timestamp: new Date(Date.now() - 1000000).toISOString(),
      version: 'v2.1.0',
      author: 'Sarah Chen',
      commitHash: '8f4d76b',
      environment: 'production',
      duration: 245,
      rollbackAvailable: true
    },
    {
      id: '2',
      service: 'Auth Service',
      status: 'in-progress',
      timestamp: new Date(Date.now() - 500000).toISOString(),
      version: 'v1.5.2',
      author: 'Mike Johnson',
      commitHash: '3a2b1c9',
      environment: 'staging',
      duration: 180,
      rollbackAvailable: false
    },
    {
      id: '3',
      service: 'Database Cluster',
      status: 'failed',
      timestamp: new Date(Date.now() - 2000000).toISOString(),
      version: 'v3.0.1',
      author: 'Alex Kim',
      commitHash: '5e7f9d2',
      environment: 'development',
      duration: 320,
      rollbackAvailable: true
    }
  ];

  return { metrics, services, deployments };
}