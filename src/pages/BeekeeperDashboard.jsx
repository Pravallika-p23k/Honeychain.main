import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Box, 
  CheckCircle2, 
  AlertTriangle, 
  Droplet, 
  Layers, 
  TrendingUp, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  PlusCircle,
  Bell
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const BeekeeperDashboard = () => {
  const { hives, batches, alerts } = useData();
  const { user } = useAuth();

  const totalHives = hives.length;
  const healthyHives = hives.filter(h => h.colonyStatus === 'HEALTHY').length;
  const attentionHives = hives.filter(h => h.colonyStatus !== 'HEALTHY').length;
  const totalHoneyKg = batches.reduce((acc, b) => acc + (b.quantityKg || 0), 0);
  const activeBatchesCount = batches.length;

  // Chart 1: Hive Health Distribution Data
  const healthDistributionData = [
    { name: 'Healthy', value: healthyHives, color: '#10B981' },
    { name: 'Attention Needed', value: attentionHives, color: '#F59E0B' },
  ];

  // Chart 2: Honey Production Monthly Data
  const productionData = [
    { month: 'Apr', yieldKg: 28 },
    { month: 'May', yieldKg: 45 },
    { month: 'Jun', yieldKg: 62 },
    { month: 'Jul', yieldKg: 50 },
    { month: 'Aug', yieldKg: 87.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>KVIC BEEKEEPER DASHBOARD | CLUSTER: {user.cluster || 'Chittoor AP'}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Welcome back, {user.name}</h1>
          <p className="text-xs text-slate-300 mt-1">Reg ID: {user.regNo || 'KVIC-RBH-2024-8841'} | 12 Cellular IoT Hives Connected</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/harvest"
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Record Harvest
          </Link>
          <Link
            to="/iot"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-amber-400" />
            Live Sensors
          </Link>
        </div>
      </div>

      {/* Top 5 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Hives</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Box className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{totalHives}</p>
          <p className="text-[11px] text-slate-500 mt-1">Smart Cellular Nodes</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Healthy Hives</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700">{healthyHives}</p>
          <p className="text-[11px] text-emerald-600 mt-1">{(healthyHives / totalHives * 100).toFixed(0)}% Optimal Microclimate</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Requires Attention</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><AlertTriangle className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-extrabold text-amber-600">{attentionHives}</p>
          <p className="text-[11px] text-amber-700 mt-1">Temp/Swarm Advisories</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Honey Produced</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Droplet className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-extrabold text-amber-800">{totalHoneyKg} kg</p>
          <p className="text-[11px] text-slate-500 mt-1">This Season's Yield</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Active Batches</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Layers className="w-4 h-4" /></div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{activeBatchesCount}</p>
          <p className="text-[11px] text-purple-700 mt-1">KVIC Verified Batches</p>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Honey Production Trend */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                Honey Harvest Yield Trajectory (kg)
              </h3>
              <p className="text-xs text-slate-500">Monthly total extraction across active hives</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">+24% vs Last Season</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tickLine={false} stroke="#64748B" fontSize={12} />
                <YAxis tickLine={false} stroke="#64748B" fontSize={12} unit=" kg" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none' }}
                  formatter={(val) => [`${val} kg`, 'Yield']}
                />
                <Bar dataKey="yieldKg" fill="#D97706" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Hive Health Status */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Colony Health Index</h3>
            <p className="text-xs text-slate-500 mb-4">Real-time status breakdown of monitored hives</p>
            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={healthDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {healthDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Optimal Health
              </span>
              <span className="font-bold text-slate-900">{healthyHives} Hives</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span> Microclimate Stress / Swarm
              </span>
              <span className="font-bold text-slate-900">{attentionHives} Hives</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Alerts & Recent Harvests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent System Alerts */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-600" />
              Recent System Alerts & Advisories
            </h3>
            <Link to="/alerts" className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((a) => (
              <div key={a.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
                <StatusBadge status={a.severity} />
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">{a.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{a.message}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">{a.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Harvest Batches */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              Recent Harvest Batches
            </h3>
            <Link to="/batches" className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1">
              View Catalog <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {batches.map((b) => (
              <div key={b.batchId} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-slate-900">{b.batchId}</p>
                  <p className="text-xs text-slate-600">{b.floralSource} | {b.quantityKg} kg</p>
                  <p className="text-[10px] text-slate-400 font-mono">Date: {b.harvestDate}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={b.qualityStatus} />
                  <p className="text-[10px] text-emerald-700 font-mono mt-1">Purity: {b.purityScore}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
