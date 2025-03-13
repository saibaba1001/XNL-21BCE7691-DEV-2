import React, { useEffect, useState } from 'react';
import { Activity, AlertTriangle, Search, Layout } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import GridLayout from 'react-grid-layout';
import { MetricsCard } from './components/MetricsCard';
import { ServiceHealthList } from './components/ServiceHealthList';
import { DeploymentList } from './components/DeploymentList';
import { AlertsList } from './components/AlertsList';
import { InfrastructureView } from './components/InfrastructureView';
import { SearchBar } from './components/SearchBar';
import { useMetricsStore } from './store/metrics';
import { mockSystemData } from './utils/mockData';

function App() {
  const { metrics, services, deployments, alerts, setMetrics, addAlert } = useMetricsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = mockSystemData();
      setMetrics(newData.metrics);
      
      if (Math.random() > 0.9) {
        const alert = {
          id: crypto.randomUUID(),
          type: Math.random() > 0.5 ? 'warning' : 'error',
          message: `High CPU usage detected in ${newData.services[0].name}`,
          timestamp: new Date().toISOString(),
          service: newData.services[0].name,
          acknowledged: false,
        };
        addAlert(alert);
        toast.error(alert.message);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [setMetrics, addAlert]);

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />
      <div className="py-6">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-400" />
              <h1 className="ml-3 text-2xl font-bold leading-7 text-white sm:leading-9 sm:truncate">
                XNL Innovations Command Center
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <button
                onClick={() => setIsCustomizing(!isCustomizing)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Layout className="h-5 w-5 text-gray-300" />
              </button>
              {alerts.filter(a => !a.acknowledged).length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-yellow-400"
                >
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  <span>{alerts.filter(a => !a.acknowledged).length} active alerts</span>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                <MetricsCard
                  title="Requests/sec"
                  value={metrics.requests[metrics.requests.length - 1]?.value || 0}
                  change={5.25}
                  data={metrics.requests}
                  gradient="from-purple-500 to-indigo-600"
                />
                <MetricsCard
                  title="CPU Usage"
                  value={metrics.cpu[metrics.cpu.length - 1]?.value || 0}
                  change={-2.15}
                  data={metrics.cpu}
                  unit="%"
                  gradient="from-orange-500 to-red-600"
                />
                <MetricsCard
                  title="Memory Usage"
                  value={metrics.memory[metrics.memory.length - 1]?.value || 0}
                  change={1.08}
                  data={metrics.memory}
                  unit="%"
                  gradient="from-green-500 to-emerald-600"
                />
                <MetricsCard
                  title="Error Rate"
                  value={metrics.errors[metrics.errors.length - 1]?.value || 0}
                  change={-0.83}
                  data={metrics.errors}
                  unit="%"
                  gradient="from-red-500 to-pink-600"
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-8">
              <InfrastructureView />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ServiceHealthList services={filteredServices} />
              <div className="space-y-6">
                <DeploymentList deployments={deployments} />
                <AlertsList alerts={alerts} />
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-8 py-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-400">
              © Copyright SAIBABA2025 - XNL Innovations. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;