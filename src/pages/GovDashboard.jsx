import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { IndiaMapVisualizer } from '../components/IndiaMapVisualizer';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Building2, 
  Users, 
  Box, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Database,
  Award
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const GovDashboard = () => {
  const { hives, batches, alerts, blockchainLogs } = useData();
  const { user } = useAuth();

  const govProdData = [
    { month: 'Jan', tons: 42.0 },
    { month: 'Feb', tons: 58.5 },
    { month: 'Mar', tons: 72.0 },
    { month: 'Apr', tons: 95.4 },
    { month: 'May', tons: 120.0 },
    { month: 'Jun', tons: 148.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
            <Building2 className="w-4 h-4" />
            <span>KVIC NATIONAL HONEY OVERSIGHT PORTAL | OFFICER: {user.name}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">National Beekeeping & Quality Control Center</h1>
          <p className="text-xs text-slate-300 mt-1">Jurisdiction: {user.jurisdiction || 'Southern Zone (AP, TS, KA)'} | NABL Lab Network Sync Active</p>
        </div>

        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono px-3 py-1.5 rounded-xl font-bold">
          KVIC GOV BADGE: #{user.badgeNo || 'GOV-IN-9042'}
        </span>
      </div>

      {/* 6 Top Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Total Beekeepers</span>
          <p className="text-2xl font-black text-slate-900">1,840</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+12% YoY Growth</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Total Smart Hives</span>
          <p className="text-2xl font-black text-blue-700">12,480</p>
          <span className="text-[10px] text-slate-500 font-semibold">Cellular Connected</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Active Clusters</span>
          <p className="text-2xl font-black text-amber-700">5 Clusters</p>
          <span className="text-[10px] text-amber-600 font-semibold">AP, UP, KA, WB, BR</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Honey Production</span>
          <p className="text-2xl font-black text-slate-900">340.5 MT</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Metric Tons (2026)</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Verified Batches</span>
          <p className="text-2xl font-black text-emerald-700">894 Lots</p>
          <span className="text-[10px] text-emerald-600 font-semibold">99.4% Pass Rate</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Quality Flags</span>
          <p className="text-2xl font-black text-rose-600">3 Flags</p>
          <span className="text-[10px] text-rose-600 font-semibold">Requires Inspection</span>
        </div>
      </div>

      {/* India Map Cluster Visualization */}
      <IndiaMapVisualizer />

      {/* Production Trends & Blockchain Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* National Production Trend */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                National Certified Honey Yield (Metric Tons)
              </h3>
              <p className="text-xs text-slate-500">Monthly aggregate production reported via Honey Chain</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={govProdData}>
                <defs>
                  <linearGradient id="govGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} unit=" MT" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none' }} />
                <Area type="monotone" dataKey="tons" stroke="#1E3A8A" fillOpacity={1} fill="url(#govGrad)" name="Production (MT)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Blockchain Audit Trail */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                Live Blockchain Cryptographic Receipts
              </h3>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">LEDGER ONLINE</span>
            </div>

            <div className="space-y-3">
              {blockchainLogs.slice(0, 4).map((log) => (
                <div key={log.txHash} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between font-mono mb-1">
                    <span className="font-bold text-amber-700">{log.batchId}</span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-900 font-semibold">{log.event}</p>
                  <p className="text-slate-500 text-[11px] truncate font-mono mt-0.5">Hash: {log.txHash}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
