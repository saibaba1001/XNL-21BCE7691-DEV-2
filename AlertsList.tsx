import React from 'react';
import { Bell, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { formatDistance } from 'date-fns';
import type { AlertNotification } from '../types';
import { useMetricsStore } from '../store/metrics';

interface AlertsListProps {
  alerts: AlertNotification[];
}

const alertIcons = {
  error: <XCircle className="text-red-500" size={20} />,
  warning: <AlertTriangle className="text-yellow-500" size={20} />,
  info: <Bell className="text-blue-500" size={20} />,
  success: <CheckCircle className="text-green-500" size={20} />
};

export function AlertsList({ alerts }: AlertsListProps) {
  const acknowledgeAlert = useMetricsStore(state => state.acknowledgeAlert);

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Bell className="mr-2 h-5 w-5 text-indigo-400" />
          Active Alerts
        </h2>
        <div className="mt-6 divide-y divide-gray-700">
          {alerts.filter(alert => !alert.acknowledged).map((alert) => (
            <div key={alert.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                {alertIcons[alert.type]}
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {alert.message}
                  </p>
                  <p className="text-sm text-gray-400">
                    {alert.service} • {formatDistance(new Date(alert.timestamp), new Date(), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => acknowledgeAlert(alert.id)}
                className="ml-4 px-3 py-1 text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-400 hover:border-indigo-300 rounded-md transition-colors"
              >
                Acknowledge
              </button>
            </div>
          ))}
          {alerts.filter(alert => !alert.acknowledged).length === 0 && (
            <p className="py-4 text-gray-400 text-center">No active alerts</p>
          )}
        </div>
      </div>
    </div>
  );
}