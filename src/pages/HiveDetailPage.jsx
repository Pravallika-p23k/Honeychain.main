import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { predictHiveHealth } from '../services/aiService';
import { StatusBadge } from '../components/StatusBadge';
import { QRModal } from '../components/QRModal';
import { 
  Box, 
  MapPin, 
  QrCode, 
  Thermometer, 
  Droplet, 
  Scale, 
  Activity, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  ArrowLeft,
  Clock,
  Volume2,
  Battery
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

export const HiveDetailPage = () => {
  const { id } = useParams();
  const { hives } = useData();
  const [showQR, setShowQR] = useState(false);
  const [newInspection, setNewInspection] = useState('');

  const hive = hives.find(h => h.id === id) || hives[0];
  const aiReport = predictHiveHealth(hive);

  const [inspectionsList, setInspectionsList] = useState(hive.inspections || []);

  const handleAddInspection = (e) => {
    e.preventDefault();
    if (!newInspection.trim()) return;
    const newRecord = {
      date: new Date().toISOString().split('T')[0],
      inspector: "Ramesh Kumar",
      notes: newInspection.trim(),
      condition: "Good"
    };
    setInspectionsList([newRecord, ...inspectionsList]);
    setNewInspection('');
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/hives" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to All Hives
        </Link>
        <span className="text-xs font-mono text-slate-400">Node Ref: {hive.qrId}</span>
      </div>

      {/* Hive Overview Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-amber-400">{hive.id}</h1>
            <StatusBadge status={hive.colonyStatus} />
            <button
              onClick={() => setShowQR(true)}
              className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              View Hive QR Tag
            </button>
          </div>

          <p className="text-sm text-slate-300 flex items-center gap-1 mb-4">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            {hive.location}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div><span className="text-slate-500 block">Bee Species:</span> <span className="font-semibold text-white">{hive.beeSpecies}</span></div>
            <div><span className="text-slate-500 block">Queen Details:</span> <span className="font-semibold text-white">{hive.queenInfo}</span></div>
            <div><span className="text-slate-500 block">Installed:</span> <span className="font-semibold text-white">{hive.installationDate}</span></div>
          </div>
        </div>

        {/* Health Score Dial Card */}
        <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 flex flex-col justify-between items-center text-center min-w-[220px]">
          <span className="text-xs font-mono font-semibold uppercase text-slate-400">AI Health Index</span>
          <div className="my-2">
            <span className={`text-4xl font-extrabold ${aiReport.healthScore > 80 ? 'text-emerald-400' : aiReport.healthScore > 60 ? 'text-amber-400' : 'text-rose-400'}`}>
              {aiReport.healthScore}
            </span>
            <span className="text-slate-500 text-sm font-bold"> / 100</span>
          </div>
          <span className="text-[11px] font-semibold bg-amber-500/20 text-amber-300 px-3 py-0.5 rounded-full border border-amber-500/30">
            {aiReport.statusLevel}
          </span>
        </div>
      </div>

      {/* Sensor Telemetry Cards Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Temperature</span>
            <Thermometer className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">{hive.temperature}°C</p>
          <span className="text-[10px] text-slate-500">Brood ideal: 32-37°C</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Humidity</span>
            <Droplet className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">{hive.humidity}%</p>
          <span className="text-[10px] text-slate-500">Target: 45-65%</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Scale Weight</span>
            <Scale className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">{hive.weight} kg</p>
          <span className="text-[10px] text-slate-500">Honey stores load</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Sound Frequency</span>
            <Volume2 className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl font-extrabold text-slate-900">220 Hz</p>
          <span className="text-[10px] text-slate-500">Normal acoustics</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
            <span>Battery Level</span>
            <Battery className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-extrabold text-emerald-700">{hive.battery}%</p>
          <span className="text-[10px] text-slate-500">Solar cell charging</span>
        </div>
      </div>

      {/* Historical Telemetry Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">24-Hour IoT Telemetry Stream</h3>
            <p className="text-xs text-slate-500">Real-time internal microclimate telemetry readings</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded">Polling Rate: 60 min</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hive.telemetry}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D97706" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="timestamp" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} domain={['dataMin - 5', 'dataMax + 5']} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', color: '#FFF', borderRadius: '8px', border: 'none' }} />
              <Area type="monotone" dataKey="temperature" stroke="#D97706" fillOpacity={1} fill="url(#tempGrad)" name="Temperature (°C)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Risk Analysis & Inspection Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Health Advisory Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">AI Early Warning Predictive Diagnosis</h3>
          </div>

          <div className="space-y-3 mb-4">
            {aiReport.risks.map((risk, idx) => (
              <div key={idx} className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-900">{risk.title}</span>
                  <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">{risk.probability} Risk</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">{risk.details}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Recommended Advisory Actions:</h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {aiReport.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Inspection History & Log Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Field Inspection History
            </h3>

            {/* Log form */}
            <form onSubmit={handleAddInspection} className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Log physical frame check notes..."
                value={newInspection}
                onChange={(e) => setNewInspection(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2 rounded-lg text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Log
              </button>
            </form>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {inspectionsList.map((ins, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                    <span>{ins.date} — {ins.inspector}</span>
                    <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">{ins.condition}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{ins.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} batchId={hive.qrId} title="Hive Digital RFID QR Token" />
    </div>
  );
};
