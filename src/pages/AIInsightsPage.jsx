import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { predictHiveHealth, AI_DISCLAIMER, getClusterAnalyticsAI } from '../services/aiService';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  ChevronRight,
  ShieldAlert,
  Calendar
} from 'lucide-react';

export const AIInsightsPage = () => {
  const { hives } = useData();
  const [selectedHiveId, setSelectedHiveId] = useState(hives[0]?.id || 'HC-AP-017');

  const selectedHive = hives.find(h => h.id === selectedHiveId) || hives[0];
  const aiDiagnosis = predictHiveHealth(selectedHive);
  const clusterAI = getClusterAnalyticsAI();

  return (
    <div className="space-y-6">
      {/* Disclaimer Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-blue-900 text-xs">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">AI PREDICTIVE ADVISORY DISCLAIMER: </span>
          <span>{AI_DISCLAIMER}</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-600" />
            AI Biological Predictive Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">Colony stress risk modeling, acoustic disease indicators, and harvest volume forecasting.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600">Select Hive for AI Audit:</span>
          <select
            value={selectedHiveId}
            onChange={(e) => setSelectedHiveId(e.target.value)}
            className="px-3 py-2 bg-slate-900 text-amber-400 font-mono font-bold rounded-xl text-xs border border-slate-800"
          >
            {hives.map(h => (
              <option key={h.id} value={h.id}>
                {h.id} ({h.colonyStatus})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 Predictive Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Colony Health Score */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">Colony Health Index</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900">{aiDiagnosis.healthScore}</span>
              <span className="text-slate-500 text-sm font-semibold">/ 100</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Derived from 24h thermal variance, acoustic sound frequency, and load cell stability.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Predicted Status:</span>
            <StatusBadge status={aiDiagnosis.statusLevel} />
          </div>
        </div>

        {/* Disease & Stress Risk */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">Stress & Pest Risk Level</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${aiDiagnosis.diseaseRiskScore > 40 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {aiDiagnosis.diseaseRiskScore}%
              </span>
              <span className="text-slate-500 text-xs font-semibold">Probability</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              {selectedHive.temperature > 37 
                ? `Hive ${selectedHive.id} has an elevated stress risk. Inspect within 24 hours.`
                : `Hive ${selectedHive.id} exhibits stable microclimate parameters with minimal stress probability.`}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Primary Vulnerability:</span>
            <span className="font-bold text-slate-900">{aiDiagnosis.risks[0]?.category || 'None'}</span>
          </div>
        </div>

        {/* Honey Production Prediction */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase">Yield Forecast (30 Days)</span>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-amber-700">{aiDiagnosis.predictedYieldKg} kg</span>
              <span className="text-slate-500 text-xs font-semibold">Estimated</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Based on regional floral density index and daily frame weight accumulation velocity.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Optimal Extraction Window:</span>
            <span className="font-bold text-amber-800">{aiDiagnosis.estimatedHarvestDays} Days</span>
          </div>
        </div>
      </div>

      {/* Detailed AI Risk Advisory Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identified Risk Factors */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            Detected Risk Factors & Acoustic Indicators
          </h3>

          <div className="space-y-4">
            {aiDiagnosis.risks.map((r, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{r.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    r.level === 'HIGH' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {r.probability} Possible
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{r.details}</p>
                <div className="text-[11px] font-mono text-slate-400 pt-1">Model: RF-Biological-v4.2</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Action Checklist */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            Actionable Beekeeper Advisory Steps
          </h3>

          <div className="space-y-3">
            {aiDiagnosis.recommendations.map((rec, i) => (
              <div key={i} className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-emerald-950">Action Item #{i + 1}</p>
                  <p className="text-xs text-emerald-850 mt-1 leading-relaxed">{rec}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-900 text-white rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Regional Floral Summary</h4>
            <p className="text-xs text-slate-300">{clusterAI.aiInsightSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
