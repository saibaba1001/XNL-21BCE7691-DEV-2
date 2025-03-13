import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDistance } from 'date-fns';
import type { DeploymentStatus } from '../types';

interface DeploymentListProps {
  deployments: DeploymentStatus[];
}

const statusIcons = {
  success: <CheckCircle className="text-green-500" size={20} />,
  failed: <XCircle className="text-red-500" size={20} />,
  'in-progress': <Clock className="text-blue-500" size={20} />
};

export function DeploymentList({ deployments }: DeploymentListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Deployments</h2>
        <div className="mt-6 divide-y divide-gray-200">
          {deployments.map((deployment) => (
            <div key={deployment.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                {statusIcons[deployment.status]}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {deployment.service}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDistance(new Date(deployment.timestamp), new Date(), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}