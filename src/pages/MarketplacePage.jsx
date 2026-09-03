import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { QRModal } from '../components/QRModal';
import { 
  ShoppingBag, 
  Search, 
  ShieldCheck, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  Building2, 
  ExternalLink,
  MessageSquare,
  X
} from 'lucide-react';

export const MarketplacePage = () => {
  const { batches } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [qrModalBatchId, setQrModalBatchId] = useState(null);

  const listedBatches = batches.filter(b => b.isListedOnMarketplace);

  const filteredListings = listedBatches.filter(b => 
    b.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.floralSource.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.cluster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="space-y-6">
      {/* Marketplace Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-amber-200 font-bold uppercase tracking-widest block mb-1">
            KVIC B2B HONEY PROCUREMENT MARKETPLACE
          </span>
          <h1 className="text-2xl font-extrabold text-white">Direct Beekeeper-to-Buyer Portal</h1>
          <p className="text-xs text-amber-100 mt-1 max-w-xl">
            Source 100% NABL lab-certified, blockchain-traceable pure honey directly from government recognized rural beekeeper clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-900/50 p-3 rounded-xl border border-amber-500/30 text-center">
            <span className="text-xl font-extrabold text-white block">{listedBatches.length}</span>
            <span className="text-[10px] text-amber-200 uppercase font-semibold">Active Lots</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search honey type, batch ID, region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Showing {filteredListings.length} Verified Commercial Lots
        </span>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((lot) => (
          <div key={lot.batchId} className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-base text-amber-400">{lot.batchId}</span>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    {lot.cluster}
                  </p>
                </div>
                <StatusBadge status={lot.qualityStatus} />
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{lot.floralSource}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Producer: {lot.beekeeperName} ({lot.beekeeperId})</p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Lot Quantity</span>
                    <span className="font-extrabold text-slate-900 text-sm">{lot.quantityKg} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Price per kg</span>
                    <span className="font-extrabold text-amber-700 text-sm">₹{lot.pricePerKg} / kg</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex justify-between"><span>Purity Score:</span> <span className="font-bold text-emerald-700">{lot.purityScore}</span></div>
                  <div className="flex justify-between"><span>Moisture Content:</span> <span className="font-bold text-slate-800">{lot.moistureContent}</span></div>
                  <div className="flex justify-between"><span>C4 Sugar Test:</span> <span className="font-bold text-emerald-700">{lot.c4SugarTest}</span></div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex gap-2">
              <button
                onClick={() => setSelectedListing(lot)}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" /> Procure Lot / Inquire
              </button>
              <button
                onClick={() => setQrModalBatchId(lot.batchId)}
                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 p-2.5 rounded-xl text-xs transition-colors"
                title="View QR"
              >
                <QrCode className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Procurement Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">Lot Procurement Request</span>
                <h3 className="font-extrabold text-lg text-white">{selectedListing.batchId}</h3>
              </div>
              <button onClick={() => { setSelectedListing(null); setInquirySent(false); }} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!inquirySent ? (
              <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
                <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs space-y-1 text-amber-900">
                  <div className="flex justify-between font-bold"><span>Honey Type:</span> <span>{selectedListing.floralSource}</span></div>
                  <div className="flex justify-between"><span>Available Quantity:</span> <span>{selectedListing.quantityKg} kg</span></div>
                  <div className="flex justify-between font-bold text-amber-800"><span>Quoted Price:</span> <span>₹{selectedListing.pricePerKg} / kg (Total: ₹{(selectedListing.quantityKg * selectedListing.pricePerKg).toLocaleString()})</span></div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Buyer Organization / Company Name</label>
                  <input
                    type="text"
                    required
                    defaultValue={user.company || "Apex Organic Honey Exports Ltd."}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Requested Quantity (kg)</label>
                  <input
                    type="number"
                    max={selectedListing.quantityKg}
                    defaultValue={selectedListing.quantityKg}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Destination & Specifications</label>
                  <textarea
                    rows="2"
                    placeholder="Enter logistics requirement..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Send Direct Procurement Purchase Order
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Procurement Inquiry Sent!</h4>
                <p className="text-xs text-slate-600">The beekeeper and KVIC cluster officer have received your purchase intent.</p>
                <button
                  onClick={() => { setSelectedListing(null); setInquirySent(false); }}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                >
                  Close Modal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <QRModal isOpen={!!qrModalBatchId} onClose={() => setQrModalBatchId(null)} batchId={qrModalBatchId} />
    </div>
  );
};
