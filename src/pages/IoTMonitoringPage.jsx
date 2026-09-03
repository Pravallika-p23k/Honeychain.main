import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/StatusBadge';
import { IOT_DISCLAIMER } from '../services/iotService';
import { 
  Cpu, 
  RefreshCw, 
  Thermometer, 
  Droplet, 
  Scale, 
  Volume2, 
  BatteryCharging, 
  Radio, 
  AlertTriangle,
  Wifi,
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const IoTMonitoringPage = () => {
  const { hives } = useData();
  const [selectedHiveId, setSelectedHiveId] = useState(hives[0]?.id || 'HC-AP-017');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString());

  const currentHive = hives.find(h => h.id === selectedHiveId) || hives[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString());
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Demo Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-950">
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="bg-amber-600 text-white px-2.5 py-0.5 rounded font-mono uppercase text-[10px]">DEMO DATA</span>
          <span>{IOT_DISCLAIMER}</span>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh IoT Stream</span>
        </button>
      </div>

      {/* Header & Hive Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Cpu className="w-7 h-7 text-blue-600" />
            Cellular IoT Live Telemetry Grid
          </h1>
          <p className="text-xs text-slate-500 mt-1">Real-time internal microclimate and acoustic frequency feeds across active nodes.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Active Node:</span>
          <select
            value={selectedHiveId}
            onChange={(e) => setSelectedHiveId(e.target.value)}
            className="px-3 py-2 bg-slate-900 text-amber-400 font-mono font-bold rounded-xl text-xs border border-slate-800 focus:outline-none"
          >
            {hives.map(h => (
              <option key={h.id} value={h.id}>
                {h.id} — {h.location.split('(')[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Sensor Dials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature Dial */}
        <div className={`p-5 rounded-2xl border transition-all ${
          currentHive.temperature > 37 ? 'bg-rose-50 border-rose-300' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-rose-500" /> Brood Temp
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">ONLINE</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mb-1">{currentHive.temperature}°C</p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Optimal: 32.0 - 37.0°C</span>
            {currentHive.temperature > 37 && <span className="text-rose-700 font-bold flex items-center gap-0.5"><AlertTriangle className="w-3 h-3"/> High</span>}
          </div>
        </div>

        {/* Humidity Dial */}
        <div className={`p-5 rounded-2xl border transition-all ${
          currentHive.humidity > 70 ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-blue-500" /> Relative Humidity
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">ONLINE</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mb-1">{currentHive.humidity}%</p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Target: 45 - 65%</span>
            {currentHive.humidity > 70 && <span className="text-amber-700 font-bold flex items-center gap-0.5"><AlertTriangle className="w-3 h-3"/> High</span>}
          </div>
        </div>

        {/* Scale Weight Dial */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-600" /> Load Cell Weight
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">ONLINE</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 mb-1">{currentHive.weight} kg</p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>24h Change: {currentHive.weightDrop24h > 0 ? `-${currentHive.weightDrop24h}kg` : 'Stable'}</span>
            {currentHive.weightDrop24h > 2.0 && <span className="text-rose-600 font-bold">Swarm Alert</span>}
          </div>
        </div>

        {/* Activity & Battery */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-600 uppercase flex items-center gap-1.5">
              <BatteryCharging className="w-4 h-4 text-emerald-600" /> Battery & Signal
            </span>
            <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-bold">4G LTE</span>
          </div>
          <p className="text-3xl font-extrabold text-emerald-700 mb-1">{currentHive.battery}%</p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Solar Charging</span>
            <span className="font-mono text-[10px] text-slate-400">Last: {lastRefreshed}</span>
          </div>
        </div>
      </div>

      {/* Multi-parameter Telemetry Charts */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Radio className="w-5 h-5 text-amber-600" />
              Hive {currentHive.id} Telemetry Time-Series
            </h3>
            <p className="text-xs text-slate-500">Continuous 24-hour sensor data stream with upper/lower safety thresholds</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-amber-700 font-semibold"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Temp (°C)</span>
            <span className="flex items-center gap-1 text-blue-700 font-semibold"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Humidity (%)</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentHive.telemetry}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="timestamp" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none' }} />
              <Line type="monotone" dataKey="temperature" stroke="#D97706" strokeWidth={2.5} dot={false} name="Temp (°C)" />
              <Line type="monotone" dataKey="humidity" stroke="#3B82F6" strokeWidth={2} dot={false} name="Humidity (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
