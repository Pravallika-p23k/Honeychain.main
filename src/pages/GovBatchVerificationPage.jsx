import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/StatusBadge';
import { SupplyChainTimeline } from '../components/SupplyChainTimeline';
import { 
  FileCheck, 
  Search, 
  TestTube, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Database,
  Building2
} from 'lucide-react';

export const GovBatchVerificationPage = () => {
  const { batches, updateBatchQuality } = useData();
  const [searchId, setSearchId] = useState('HC-AP-2026-0002');
  const [activeBatchId, setActiveBatchId] = useState('HC-AP-2026-0002');

  const [labForm, setLabForm] = useState({
    purityScore: '99.4%',
    moistureContent: '17.1%',
    hmfPpm: '12 mg/kg',
    c4SugarTest: 'Passed Negative (<7%)'
  });

  const batch = batches.find(b => b.batchId === activeBatchId) || batches[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      setActiveBatchId(searchId.trim());
    }
  };

  const handleApprove = () => {
    updateBatchQuality(batch.batchId, 'PASSED_KVIC_TEST', labForm);
  };

  const handleReject = () => {
    updateBatchQuality(batch.batchId, 'REJECTED', { purityScore: 'Failed Purity', c4SugarTest: 'Adulteration Detected' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-7 h-7 text-blue-600" />
            Government Batch Audit & Lab Certification Desk
          </h1>
          <p className="text-xs text-slate-500 mt-1">Audit harvest submissions, input NABL laboratory test results, and grant digital KVIC seal.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Enter Batch ID (e.g. HC-AP-2026-0002)..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-9 pr-20 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 rounded-lg"
          >
            Audit
          </button>
        </form>
      </div>

      {/* Main Audit Panel */}
      {batch && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Batch Detail Card */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">KVIC Audit Record</span>
                <StatusBadge status={batch.qualityStatus} />
              </div>
              <h2 className="text-3xl font-extrabold text-white">{batch.batchId}</h2>

              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                <div className="flex justify-between"><span className="text-slate-500">Beekeeper:</span> <span className="font-bold text-white">{batch.beekeeperName} ({batch.beekeeperId})</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Cluster:</span> <span className="font-bold text-white">{batch.cluster}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Harvest Date:</span> <span className="font-bold text-white">{batch.harvestDate}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Lot Weight:</span> <span className="font-bold text-amber-400">{batch.quantityKg} kg</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Floral Type:</span> <span className="font-bold text-white">{batch.floralSource}</span></div>
              </div>
            </div>

            {/* Officer Action Card: Lab Test Results Entry */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <TestTube className="w-5 h-5 text-blue-600" />
                NABL Laboratory Test Parameters
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Purity Score (%)</label>
                  <input
                    type="text"
                    value={labForm.purityScore}
                    onChange={(e) => setLabForm({ ...labForm, purityScore: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Moisture Content (%)</label>
                  <input
                    type="text"
                    value={labForm.moistureContent}
                    onChange={(e) => setLabForm({ ...labForm, moistureContent: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">HMF (Hydroxymethylfurfural)</label>
                  <input
                    type="text"
                    value={labForm.hmfPpm}
                    onChange={(e) => setLabForm({ ...labForm, hmfPpm: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">C4 Sugar Adulteration Test</label>
                  <input
                    type="text"
                    value={labForm.c4SugarTest}
                    onChange={(e) => setLabForm({ ...labForm, c4SugarTest: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleApprove}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" /> Grant KVIC Seal
                </button>
                <button
                  onClick={handleReject}
                  className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Reject Lot
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Supply Chain Traceability Timeline */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base mb-2">Audit Traceability Inspection</h3>
            <p className="text-xs text-slate-500 mb-4">Complete audit trail for Batch {batch.batchId}</p>
            <SupplyChainTimeline batch={batch} />
          </div>
        </div>
      )}
    </div>
  );
};
