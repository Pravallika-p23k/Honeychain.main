import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/StatusBadge';
import { SupplyChainTimeline } from '../components/SupplyChainTimeline';
import { QRModal } from '../components/QRModal';
import { 
  Layers, 
  Search, 
  QrCode, 
  Database, 
  ShoppingBag, 
  TestTube, 
  Sparkles, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

export const HoneyBatchesPage = () => {
  const { batches, toggleMarketplaceListing } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(batches[0] || null);
  const [qrModalBatchId, setQrModalBatchId] = useState(null);

  const filteredBatches = batches.filter(b => 
    b.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.floralSource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.beekeeperName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-7 h-7 text-amber-600" />
            Registered Honey Batches & Traceability
          </h1>
          <p className="text-xs text-slate-500 mt-1">Certified harvest lot tracking, KVIC NABL lab purity logs, and supply chain timeline.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search Batch ID, floral, beekeeper..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Batch Cards List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Active Batch Inventory ({filteredBatches.length})</h3>
          
          {filteredBatches.map((b) => {
            const isSelected = selectedBatch?.batchId === b.batchId;
            return (
              <div
                key={b.batchId}
                onClick={() => setSelectedBatch(b)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/30' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-base text-slate-900">{b.batchId}</span>
                  <StatusBadge status={b.qualityStatus} />
                </div>

                <p className="text-xs font-semibold text-slate-700">{b.floralSource} | {b.quantityKg} kg</p>
                <p className="text-xs text-slate-500 mt-1">Beekeeper: {b.beekeeperName} ({b.cluster})</p>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[10px]">Harvest: {b.harvestDate}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setQrModalBatchId(b.batchId); }}
                    className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 text-[11px]"
                  >
                    <QrCode className="w-3.5 h-3.5" /> QR Code
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Batch Comprehensive Detail & Supply Chain Timeline */}
        {selectedBatch && (
          <div className="lg:col-span-2 space-y-6">
            {/* Batch Summary Header */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-1">Certified Batch Record</span>
                  <h2 className="text-3xl font-extrabold text-white">{selectedBatch.batchId}</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setQrModalBatchId(selectedBatch.batchId)}
                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <QrCode className="w-4 h-4" /> QR Code
                  </button>
                  <button
                    onClick={() => toggleMarketplaceListing(selectedBatch.batchId, selectedBatch.pricePerKg)}
                    className={`font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors ${
                      selectedBatch.isListedOnMarketplace 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {selectedBatch.isListedOnMarketplace ? 'Listed on Marketplace' : 'List on Marketplace'}
                  </button>
                </div>
              </div>

              {/* Quality Lab Results Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Purity Score</span>
                  <span className="font-bold text-emerald-400 text-sm">{selectedBatch.purityScore}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Moisture</span>
                  <span className="font-bold text-amber-300 text-sm">{selectedBatch.moistureContent}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">HMF Content</span>
                  <span className="font-bold text-white text-sm">{selectedBatch.hmfPpm}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">C4 Sugar Adulteration</span>
                  <span className="font-bold text-emerald-400 text-sm">{selectedBatch.c4SugarTest}</span>
                </div>
              </div>
            </div>

            {/* Interactive Supply Chain Timeline */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="font-bold text-slate-900 text-base mb-2">End-to-End Honey Supply Chain Traceability</h3>
              <p className="text-xs text-slate-500 mb-6">Cryptographically verified milestones from smart hive extraction to retail shelf.</p>
              
              <SupplyChainTimeline batch={selectedBatch} />
            </div>
          </div>
        )}
      </div>

      <QRModal isOpen={!!qrModalBatchId} onClose={() => setQrModalBatchId(null)} batchId={qrModalBatchId} />
    </div>
  );
};
