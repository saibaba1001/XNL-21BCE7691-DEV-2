import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDistance } from 'date-fns';
import { ArrowUp, ArrowDown } from 'lucide-react';
import type { MetricData } from '../types';

interface MetricsCardProps {
  title: string;
  value: number;
  change: number;
  data: MetricData[];
  unit?: string;
  gradient?: string;
}

export function MetricsCard({ title, value, change, data, unit = '', gradient = 'from-indigo-500 to-purple-600' }: MetricsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-lg shadow-xl p-6`}>
      <h3 className="text-gray-100 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-white">
          {value.toLocaleString()}{unit}
        </p>
        <span className={`ml-2 flex items-center text-sm ${
          isPositive ? 'text-green-300' : 'text-red-300'
        }`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {Math.abs(change)}%
        </span>
      </div>
      <div className="mt-4 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#fff" 
              strokeWidth={2} 
              dot={false}
              strokeOpacity={0.8}
            />
            <XAxis 
              dataKey="timestamp" 
              hide 
            />
            <YAxis hide />
            <Tooltip
              labelFormatter={(label) => formatDistance(new Date(label), new Date(), { addSuffix: true })}
              formatter={(value: number) => [value.toLocaleString() + unit, '']}
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '4px',
                color: '#fff'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}