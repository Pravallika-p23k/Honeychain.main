import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/StatusBadge';
import { SupplyChainTimeline } from '../components/SupplyChainTimeline';
import { QRModal } from '../components/QRModal';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  MapPin, 
  User, 
  Calendar, 
  Droplet, 
  Award, 
  QrCode,
  Info,
  ArrowRight,
  Database
} from 'lucide-react';

export const ConsumerVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const { batches } = useData();

  const queryBatchId = searchParams.get('batchId') || 'HC-AP-2026-0001';
  const [inputBatchId, setInputBatchId] = useState(queryBatchId);
  const [activeBatchId, setActiveBatchId] = useState(queryBatchId);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    if (searchParams.get('batchId')) {
      setInputBatchId(searchParams.get('batchId'));
      setActiveBatchId(searchParams.get('batchId'));
    }
  }, [searchParams]);

  const batch = batches.find(b => b.batchId.toUpperCase() === activeBatchId.toUpperCase()) || batches[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputBatchId.trim()) {
      setActiveBatchId(inputBatchId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Verification Hero Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md text-amber-200 border border-white/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🍯</span>
          </div>
          <span className="text-xs font-mono font-bold uppercase text-amber-200 tracking-widest block mb-1">
            Official Public Verification Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Honey Chain Verification</h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-2 max-w-lg mx-auto">
            Scan or search your honey packaging Batch ID to verify origin, beekeeper credentials, and government purity lab certificates.
          </p>

          {/* Verification Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mt-6 max-w-md mx-auto flex gap-2">
            <input
              type="text"
              placeholder="Enter Batch ID (e.g. HC-AP-2026-0001)..."
              value={inputBatchId}
              onChange={(e) => setInputBatchId(e.target.value)}
              className="flex-1 px-4 py-3 bg-white text-slate-900 placeholder-slate-400 font-mono font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-md"
            />
            <button
              type="submit"
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" /> Verify
            </button>
          </form>
        </div>

        {/* Verification Result Card */}
        {batch ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Authenticity Certificate Banner */}
            <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg border border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider font-bold">Verification Status</span>
                    <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded">
                      KVIC CERTIFIED PURE
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-white mt-0.5">Authentic & Verified Batch</h2>
                  <p className="text-xs text-emerald-200 font-mono mt-0.5">Batch Record ID: {batch.batchId}</p>
                </div>
              </div>

              <button
                onClick={() => setShowQrModal(true)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors border border-emerald-700"
              >
                <QrCode className="w-4 h-4 text-emerald-300" /> View Digital Hologram
              </button>
            </div>

            {/* Blockchain Notice Badge */}
            <div className="bg-slate-900 text-slate-300 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                Blockchain verification: Pending backend network integration
              </span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">Ledger Node #Besu-Testnet</span>
            </div>

            {/* Batch Attributes Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin & Beekeeper Info */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">Harvest Origin & Producer Details</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Beekeeper / Producer:</span>
                    <span className="font-bold text-slate-900">{batch.beekeeperName} ({batch.beekeeperId})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Geographic Cluster:</span>
                    <span className="font-bold text-slate-900">{batch.cluster}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Extraction Village:</span>
                    <span className="font-bold text-slate-900">{batch.location}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Harvest Date:</span>
                    <span className="font-bold text-slate-900">{batch.harvestDate}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Primary Floral Source:</span>
                    <span className="font-bold text-amber-700">{batch.floralSource}</span>
                  </div>
                </div>
              </div>

              {/* Lab Test Results */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-2">KVIC NABL Lab Quality Certificates</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Purity Score</span>
                    <span className="text-lg font-extrabold text-amber-800">{batch.purityScore}</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Moisture Content</span>
                    <span className="text-lg font-extrabold text-blue-800">{batch.moistureContent}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">HMF Content</span>
                    <span className="text-lg font-extrabold text-slate-900">{batch.hmfPpm}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">C4 Sugar Adulteration</span>
                    <span className="text-xs font-extrabold text-emerald-800">{batch.c4SugarTest}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Traceability Journey Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">Verified Supply Chain Journey</h3>
              <p className="text-xs text-slate-500 mb-4">Complete audit trail from hive extraction to retail shelf</p>
              
              <SupplyChainTimeline batch={batch} />
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center">
            <p className="text-lg font-bold text-slate-900">Batch ID Not Found</p>
            <p className="text-xs text-slate-500 mt-1">Please verify the Batch ID printed on your honey jar label.</p>
          </div>
        )}

        <QRModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} batchId={batch?.batchId} />
      </div>
    </div>
  );
};
