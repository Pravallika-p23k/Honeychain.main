import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Box, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Thermometer, 
  Droplet, 
  Scale, 
  Activity, 
  MapPin, 
  ChevronRight,
  X
} from 'lucide-react';

export const MyHivesPage = () => {
  const { hives, addHive } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHiveForm, setNewHiveForm] = useState({
    location: 'Madanapalle - Plot 4 (Chittoor AP)',
    beeSpecies: 'Apis cerana indica',
    queenInfo: 'Queen #Q-2026-AP19 (Marked Blue)',
    initialWeight: 38.0
  });

  const filteredHives = hives.filter(h => {
    const matchesSearch = h.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          h.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          h.beeSpecies.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'ALL' || h.colonyStatus === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleCreateHive = (e) => {
    e.preventDefault();
    addHive(newHiveForm);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Box className="w-7 h-7 text-amber-600" />
            Registered Smart Hives
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage cellular IoT nodes, colony health profiles, and inspection history.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Register New Hive
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search Hive ID, location, species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              statusFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Hives ({hives.length})
          </button>
          <button
            onClick={() => setStatusFilter('HEALTHY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              statusFilter === 'HEALTHY' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Healthy ({hives.filter(h => h.colonyStatus === 'HEALTHY').length})
          </button>
          <button
            onClick={() => setStatusFilter('ATTENTION_REQUIRED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              statusFilter === 'ATTENTION_REQUIRED' ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Attention Required
          </button>
          <button
            onClick={() => setStatusFilter('SWARMING_RISK')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0 ${
              statusFilter === 'SWARMING_RISK' ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Swarming Risk
          </button>
        </div>
      </div>

      {/* Hive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHives.map((hive) => (
          <div 
            key={hive.id} 
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg text-amber-400">{hive.id}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {hive.qrId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-1 truncate max-w-[200px]">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    {hive.location}
                  </p>
                </div>
                <StatusBadge status={hive.colonyStatus} />
              </div>

              {/* Card Body - Telemetry Gauges */}
              <div className="p-5 space-y-4">
                {/* Health Score Progress Bar */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold mb-1">
                    <span className="text-slate-600">Health Score</span>
                    <span className={`font-bold ${hive.healthScore > 80 ? 'text-emerald-700' : hive.healthScore > 60 ? 'text-amber-700' : 'text-rose-700'}`}>
                      {hive.healthScore} / 100
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${hive.healthScore > 80 ? 'bg-emerald-500' : hive.healthScore > 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${hive.healthScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Sensor Stats Grid */}
                <div className="grid grid-cols-3 gap-2 py-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block flex items-center justify-center gap-1">
                      <Thermometer className="w-3 h-3 text-rose-500" /> Temp
                    </span>
                    <span className="text-sm font-bold text-slate-900">{hive.temperature}°C</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block flex items-center justify-center gap-1">
                      <Droplet className="w-3 h-3 text-blue-500" /> Hum
                    </span>
                    <span className="text-sm font-bold text-slate-900">{hive.humidity}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block flex items-center justify-center gap-1">
                      <Scale className="w-3 h-3 text-amber-600" /> Weight
                    </span>
                    <span className="text-sm font-bold text-slate-900">{hive.weight} kg</span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-600 border-t border-slate-100 pt-3">
                  <p><span className="font-semibold text-slate-800">Species:</span> {hive.beeSpecies}</p>
                  <p className="truncate"><span className="font-semibold text-slate-800">Queen:</span> {hive.queenInfo}</p>
                  <p><span className="font-semibold text-slate-800">Last Inspection:</span> {hive.lastInspection}</p>
                </div>
              </div>
            </div>

            {/* Card Footer Link */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-center">
              <Link
                to={`/hives/${hive.id}`}
                className="w-full bg-white hover:bg-amber-50 text-amber-800 border border-amber-300 font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>View Full Telemetry & Inspection Profile</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Hive Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Box className="w-5 h-5 text-amber-400" />
                Register New Smart Hive Node
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
            </div>

            <form onSubmit={handleCreateHive} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Geographic Location / Plot Name</label>
                <input
                  type="text"
                  required
                  value={newHiveForm.location}
                  onChange={(e) => setNewHiveForm({ ...newHiveForm, location: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bee Species</label>
                  <select
                    value={newHiveForm.beeSpecies}
                    onChange={(e) => setNewHiveForm({ ...newHiveForm, beeSpecies: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Apis cerana indica">Apis cerana indica (Indian)</option>
                    <option value="Apis mellifera">Apis mellifera (European)</option>
                    <option value="Apis dorsata">Apis dorsata (Wild Rock)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Hive Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newHiveForm.initialWeight}
                    onChange={(e) => setNewHiveForm({ ...newHiveForm, initialWeight: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Queen Information & Tag</label>
                <input
                  type="text"
                  required
                  value={newHiveForm.queenInfo}
                  onChange={(e) => setNewHiveForm({ ...newHiveForm, queenInfo: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg text-[11px] text-amber-900 border border-amber-200">
                Registering a hive automatically provisions a unique government QR token and initializes 4G cellular IoT node polling.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Register Hive Node
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
