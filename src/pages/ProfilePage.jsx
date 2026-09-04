import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  LogOut,
  IdCard,
} from "lucide-react";

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* =========================================
          PROFILE HEADER
         ========================================= */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Image */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-500 shadow-lg"
        />

        {/* Profile Information */}
        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
            {/* Role */}
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/20 px-2.5 py-1 rounded border border-amber-500/30">
              {user.role?.replace("_", " ")}
            </span>

            {/* KVIC Certified */}
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              KVIC Certified
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-white">{user.name}</h1>

          <p className="text-sm text-slate-300 mt-1">{user.roleTitle}</p>

          <p className="text-xs text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {user.cluster || user.department || user.company || user.location}
          </p>
        </div>
      </div>

      {/* =========================================
          OFFICIAL CREDENTIALS
         ========================================= */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-4 flex items-center gap-2">
          <div className="w-9 h-9 bg-amber-50 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-amber-600" />
          </div>
          Official Government User Registration Credentials
        </h3>

        {/* Credential Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Government ID */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <IdCard className="w-5 h-5 text-amber-600" />
              </div>

              <div>
                <span className="text-xs text-slate-500 block font-medium mb-1">
                  Government ID / Reg No:
                </span>

                <span className="text-sm font-extrabold text-slate-900 font-mono">
                  {user.govtId ||
                    user.regNo ||
                    user.badgeNo ||
                    user.licenseNo ||
                    "Not Available"}
                </span>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5 text-amber-600" />
              </div>

              <div>
                <span className="text-xs text-slate-500 block font-medium mb-1">
                  Contact Email:
                </span>

                <span className="text-sm font-bold text-slate-900 break-all">
                  {user.email || "Not Available"}
                </span>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Phone className="w-5 h-5 text-amber-600" />
              </div>

              <div>
                <span className="text-xs text-slate-500 block font-medium mb-1">
                  Registered Phone:
                </span>

                <span className="text-sm font-bold text-slate-900">
                  {user.phone || "Not Available"}
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>

              <div>
                <span className="text-xs text-slate-500 block font-medium mb-1">
                  Location / Jurisdiction:
                </span>

                <span className="text-sm font-bold text-slate-900">
                  {user.location ||
                    user.jurisdiction ||
                    user.cluster ||
                    user.department ||
                    user.company ||
                    "Not Available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          ACCOUNT LOGOUT
         ========================================= */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6 sm:p-7">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* Logout Information */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>

            <div>
              <h3 className="font-bold text-red-700 text-lg">Account Logout</h3>

              <p className="text-sm text-slate-600 mt-1">
                Sign out from your HoneyChain portal account and securely end
                your session.
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-sm transition-all w-full sm:w-auto"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Security Message */}
        <div className="mt-5 p-4 bg-white/60 border border-red-200 rounded-xl">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />

            <p className="text-sm text-slate-600">
              For security reasons, please logout after completing your work,
              especially when using shared or public computers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
