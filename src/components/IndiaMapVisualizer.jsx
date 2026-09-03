import React, { useState } from 'react';
import { MapPin, ShieldCheck, Activity, Award, ChevronRight } from 'lucide-react';

export const IndiaMapVisualizer = () => {
  const [selectedCluster, setSelectedCluster] = useState('Chittoor (AP)');

  const clusters = [
    {
      id: 'Chittoor (AP)',
      state: 'Andhra Pradesh',
      district: 'Chittoor',
      beekeepers: 142,
      hives: 1840,
      annualYieldTons: 64.5,
      qualityRate: '98.6%',
      status: 'OPTIMAL',
      coords: { x: '45%', y: '72%' }
    },
    {
      id: 'Lucknow (UP)',
      state: 'Uttar Pradesh',
      district: 'Lucknow',
      beekeepers: 310,
      hives: 4200,
      annualYieldTons: 148.0,
      qualityRate: '97.2%',
      status: 'OPTIMAL',
      coords: { x: '52%', y: '38%' }
    },
    {
      id: 'Coorg (KA)',
      state: 'Karnataka',
      district: 'Kodagu',
      beekeepers: 98,
      hives: 1250,
      annualYieldTons: 42.0,
      qualityRate: '99.1%',
      status: 'OPTIMAL',
      coords: { x: '38%', y: '78%' }
    },
    {
      id: 'Sundarbans (WB)',
      state: 'West Bengal',
      district: 'South 24 Parganas',
      beekeepers: 215,
      hives: 2900,
      annualYieldTons: 95.0,
      qualityRate: '96.5%',
      status: 'MONITORING',
      coords: { x: '72%', y: '50%' }
    },
    {
      id: 'Muzaffarpur (BR)',
      state: 'Bihar',
      district: 'Muzaffarpur',
      beekeepers: 260,
      hives: 3600,
      annualYieldTons: 112.0,
      qualityRate: '97.8%',
      status: 'OPTIMAL',
      coords: { x: '65%', y: '42%' }
    }
  ];

  const current = clusters.find(c => c.id === selectedCluster) || clusters[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-base flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            National KVIC Honey Cluster Geographic Oversight Map
          </h3>
          <p className="text-xs text-slate-300">Live IoT Telemetry & Quality Monitoring Across Recognized Beekeeping Clusters</p>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full font-mono font-medium">
          5 Active Geo-Clusters
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-6">
        {/* Map Visualization Area */}
        <div className="lg:col-span-2 bg-slate-900 rounded-lg p-6 relative min-h-[320px] flex items-center justify-center overflow-hidden border border-slate-800">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          {/* India Outline Representation */}
          <div className="relative w-full max-w-sm aspect-4/5 flex items-center justify-center">
            {/* SVG India Schematic outline */}
            <svg viewBox="0 0 300 350" className="w-full h-full opacity-30 stroke-amber-400 fill-amber-950/20 stroke-1">
              <path d="M 120,20 L 160,25 L 190,40 L 210,70 L 240,110 L 280,140 L 270,170 L 230,175 L 220,200 L 180,210 L 160,250 L 140,310 L 120,320 L 110,290 L 100,240 L 70,200 L 60,160 L 80,120 L 100,80 Z" />
            </svg>

            {/* Interactive Cluster Pin Markers */}
            {clusters.map((c) => {
              const isSelected = c.id === selectedCluster;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCluster(c.id)}
                  style={{ left: c.coords.x, top: c.coords.y }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all z-10`}
                >
                  <div className="relative">
                    {/* Ripple effect for active */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping"></span>
                    )}
                    <div className={`p-2 rounded-full shadow-lg flex items-center justify-center transition-transform ${
                      isSelected ? 'bg-amber-500 text-slate-950 scale-125 ring-2 ring-white' : 'bg-slate-800 text-amber-400 hover:bg-slate-700 hover:scale-110'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    {/* Tooltip label */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none shadow-md z-20">
                      {c.id}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs border border-slate-800 text-[11px] text-slate-300 py-1.5 px-3 rounded-md flex items-center gap-3">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Optimal Flow</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> High Moisture</span>
          </div>
        </div>

        {/* Selected Cluster Detail Panel */}
        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">Active Region</span>
                <h4 className="text-lg font-bold text-slate-900">{current.district}, {current.state}</h4>
              </div>
              <span className="gov-badge gov-badge-success">{current.status}</span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Registered Beekeepers</span>
                <span className="font-bold text-slate-900">{current.beekeepers}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Monitored Smart Hives</span>
                <span className="font-bold text-slate-900">{current.hives}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Annual Production</span>
                <span className="font-bold text-amber-700">{current.annualYieldTons} MT</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1">
                <span className="text-slate-600">Purity Compliance</span>
                <span className="font-bold text-emerald-700">{current.qualityRate}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Switch Cluster View:</label>
            <div className="flex flex-wrap gap-1.5">
              {clusters.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCluster(c.id)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    c.id === selectedCluster 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
