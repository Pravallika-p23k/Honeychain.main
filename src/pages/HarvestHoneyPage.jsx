import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Sprout, CheckCircle2, QrCode, Database, ArrowRight, ShieldCheck } from 'lucide-react';

export const HarvestHoneyPage = () => {
  const { hives, addHarvest } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hiveId: hives[0]?.id || 'HC-AP-017',
    harvestDate: new Date().toISOString().split('T')[0],
    quantityKg: '35.0',
    floralSource: 'Wildflower & Mustard',
    location: user.location || 'Madanapalle, Chittoor, AP',
    collector: user.name || 'Ramesh Kumar',
    estimatedPrice: '650',
    notes: 'High clarity raw extraction from top supers. No artificial feeding.'
  });

  const [createdBatchId, setCreatedBatchId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = addHarvest(formData);
    setCreatedBatchId(generatedId);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
          <Sprout className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Digital Honey Harvest Registration</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
          Log extraction yield from registered smart hives to generate a unique government Batch ID and cryptographic blockchain receipt.
        </p>
      </div>

      {!createdBatchId ? (
        /* Harvest Log Form */
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Source Smart Hive Node</label>
              <select
                value={formData.hiveId}
                onChange={(e) => setFormData({ ...formData, hiveId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-900"
              >
                {hives.map(h => (
                  <option key={h.id} value={h.id}>
                    {h.id} — {h.location.split('(')[0]} ({h.beeSpecies})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Harvest Extraction Date</label>
              <input
                type="date"
                required
                value={formData.harvestDate}
                onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Extracted Quantity (Kilograms - kg)</label>
              <input
                type="number"
                step="0.5"
                required
                value={formData.quantityKg}
                onChange={(e) => setFormData({ ...formData, quantityKg: e.target.value })}
                placeholder="e.g. 45.0"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Floral Source</label>
              <select
                value={formData.floralSource}
                onChange={(e) => setFormData({ ...formData, floralSource: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-900"
              >
                <option value="Wildflower & Mustard">Wildflower & Mustard</option>
                <option value="Mono-Floral Eucalyptus">Mono-Floral Eucalyptus</option>
                <option value="Organic Neem Blossom">Organic Neem Blossom</option>
                <option value="Acacia Honey">Acacia Honey</option>
                <option value="Kashmir Multi-Flora">Kashmir Multi-Flora</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Extraction Location / Village</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Beekeeper / Collector Name</label>
              <input
                type="text"
                required
                value={formData.collector}
                onChange={(e) => setFormData({ ...formData, collector: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Extraction Notes & Quality Remarks</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm"
            ></textarea>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <Database className="w-4 h-4 text-amber-700" />
              <span>Automatic Government Ledger Minting</span>
            </div>
            <p>Submitting this form immediately mints a digital batch token and submits the batch for KVIC NABL Lab Testing.</p>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-base shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Sprout className="w-5 h-5" />
            Generate Government Honey Batch ID
          </button>
        </form>
      ) : (
        /* Success Screen */
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono font-bold uppercase text-emerald-700 tracking-wider">Harvest Successfully Registered</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">{createdBatchId}</h2>
            <p className="text-xs text-slate-500 mt-1">Digital QR Batch Token Created & Logged to Blockchain Ledger</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Source Hive:</span> <span className="font-bold">{formData.hiveId}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Yield Quantity:</span> <span className="font-bold">{formData.quantityKg} kg</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Floral Source:</span> <span className="font-bold">{formData.floralSource}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Status:</span> <span className="font-bold text-amber-700">Submitted to KVIC Lab</span></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/batches')}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
            >
              View Batch Inventory <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCreatedBatchId(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs"
            >
              Record Another Harvest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
