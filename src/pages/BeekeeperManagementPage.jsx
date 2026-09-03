import React, { useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';
import { Users, Search, CheckCircle2, MapPin, Award, UserCheck, ShieldAlert } from 'lucide-react';

export const BeekeeperManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [beekeepers, setBeekeepers] = useState([
    {
      id: "RBH-4821",
      name: "Ramesh Kumar",
      cluster: "Andhra Pradesh - Chittoor Cluster",
      village: "Madanapalle, AP",
      hivesCount: 12,
      annualProdKg: 420,
      verificationStatus: "VERIFIED",
      regDate: "2024-03-15",
      phone: "+91 98765 43210"
    },
    {
      id: "RBH-1102",
      name: "Sunita Devi",
      cluster: "Uttar Pradesh - Lucknow Cluster",
      village: "Malihabad, UP",
      hivesCount: 25,
      annualProdKg: 950,
      verificationStatus: "VERIFIED",
      regDate: "2023-11-10",
      phone: "+91 94120 88765"
    },
    {
      id: "RBH-9042",
      name: "Ganesh Patil",
      cluster: "Karnataka - Coorg Cluster",
      village: "Somwarpet, KA",
      hivesCount: 8,
      annualProdKg: 280,
      verificationStatus: "PENDING",
      regDate: "2026-08-01",
      phone: "+91 98450 11223"
    },
    {
      id: "RBH-3319",
      name: "Bikram Mondal",
      cluster: "West Bengal - Sundarbans Cluster",
      village: "Canning, WB",
      hivesCount: 18,
      annualProdKg: 640,
      verificationStatus: "VERIFIED",
      regDate: "2024-09-20",
      phone: "+91 97330 44556"
    }
  ]);

  const toggleVerification = (id) => {
    setBeekeepers(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          verificationStatus: b.verificationStatus === 'VERIFIED' ? 'PENDING' : 'VERIFIED'
        };
      }
      return b;
    }));
  };

  const filteredBeekeepers = beekeepers.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.cluster.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600" />
            KVIC Certified Rural Beekeeper Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">Official register of trained beekeepers, cluster allocations, and verification status.</p>
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search name, ID, cluster..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="py-3 px-4">Beekeeper ID</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Assigned Geo Cluster</th>
                <th className="py-3 px-4">Hives Count</th>
                <th className="py-3 px-4">Annual Yield</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Officer Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredBeekeepers.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{b.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{b.name}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{b.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{b.cluster}</td>
                  <td className="py-3.5 px-4 font-extrabold text-blue-700">{b.hivesCount} Hives</td>
                  <td className="py-3.5 px-4 font-extrabold text-amber-800">{b.annualProdKg} kg</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={b.verificationStatus} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleVerification(b.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        b.verificationStatus === 'VERIFIED' 
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      }`}
                    >
                      {b.verificationStatus === 'VERIFIED' ? 'Revoke Verification' : 'Approve & Certify'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
