import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import type { ServiceHealth } from '../types';

interface ServiceHealthListProps {
  services: ServiceHealth[];
}

const statusIcons = {
  healthy: <CheckCircle className="text-green-500" size={20} />,
  degraded: <AlertTriangle className="text-yellow-500" size={20} />,
  down: <XCircle className="text-red-500" size={20} />
};

export function ServiceHealthList({ services }: ServiceHealthListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Service Health</h2>
        <div className="mt-6 divide-y divide-gray-200">
          {services.map((service) => (
            <div key={service.name} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                {statusIcons[service.status]}
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {service.name}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{service.latency}ms</span>
                <span>{service.uptime.toFixed(2)}% uptime</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}