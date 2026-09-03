import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Building2, ShoppingBag, Award, ShieldCheck, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user, switchRole } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-500 shadow-lg"
        />
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30">
              {user.role.replace('_', ' ')}
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> KVIC Certified
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>
          <p className="text-sm text-slate-300 mt-1">{user.roleTitle}</p>
          <p className="text-xs text-slate-400 mt-0.5">{user.cluster || user.department || user.company}</p>
        </div>
      </div>

      {/* Role Profile Details */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-600" />
          Official Government User Registration Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block font-medium mb-1">Government ID / Reg No:</span>
            <span className="text-sm font-extrabold text-slate-900 font-mono">{user.regNo || user.badgeNo || user.licenseNo}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block font-medium mb-1">Contact Email:</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Mail className="w-4 h-4 text-amber-600"/> {user.email}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block font-medium mb-1">Registered Phone:</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Phone className="w-4 h-4 text-amber-600"/> {user.phone}</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 block font-medium mb-1">Location / Jurisdiction:</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-600"/> {user.location || user.jurisdiction}</span>
          </div>
        </div>

        {/* Switch Role Quick Tester in Profile */}
        <div className="p-5 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-3">
          <p className="font-bold text-amber-950">Switch Active Portal Perspective (Prototype Demonstration):</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => switchRole('beekeeper')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                user.role === 'beekeeper' ? 'bg-amber-600 text-white shadow-xs' : 'bg-white border border-amber-300 text-amber-900'
              }`}
            >
              Switch to Beekeeper Role
            </button>
            <button
              onClick={() => switchRole('gov_officer')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                user.role === 'gov_officer' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-amber-300 text-amber-900'
              }`}
            >
              Switch to KVIC Officer Role
            </button>
            <button
              onClick={() => switchRole('buyer')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                user.role === 'buyer' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border border-amber-300 text-amber-900'
              }`}
            >
              Switch to Buyer Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
