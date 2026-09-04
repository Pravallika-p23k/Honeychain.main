import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import {
  ShieldCheck,
  Search,
  Bell,
  User,
  LogOut,
  Hexagon,
  Building2,
  UserCheck,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

export const Header = ({ toggleMobileSidebar }) => {
const { user, logout } = useAuth();
  const { alerts } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  // Alerts and profile should NOT appear on Home or Login pages
  const isPublicPage =
    location.pathname === "/" || location.pathname === "/login";

  const showUserActions = user && !isPublicPage;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/verify?batchId=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="tricolor-bar"></div>

     

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMobileSidebar}
            className="md:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Hexagon className="w-6 h-6 text-slate-950 fill-amber-300 stroke-slate-950 stroke-2" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                  Honey
                </span>
                <span className="font-extrabold text-xl text-amber-600 tracking-tight">
                  Chain
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-mono font-bold px-1.5 py-0.5 rounded border border-slate-200">
                  GOV.IN
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                National Honey Traceability & Smart Beekeeping Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Global Quick Batch Search Bar */}
        {!isHomePage && (
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Batch ID (e.g. HC-AP-2026-0001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-20 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />

              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />

              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 rounded-md transition-colors"
              >
                Verify
              </button>
            </div>
          </form>
        )}

        {/* Right Nav Actions */}
        <div className="flex items-center gap-3">
          {/* Public Verification Link */}
          <Link
            to="/verify"
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Public Verification</span>
          </Link>

          {/* =========================================
              SYSTEM ALERTS - ONLY AFTER LOGIN
             ========================================= */}
          {showUserActions && (
            <Link
              to="/alerts"
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="System Alerts"
            >
              <Bell className="w-5 h-5" />
              {unreadAlertsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadAlertsCount}
                </span>
              )}
            </Link>
          )}

          {/* =========================================
              USER PROFILE - ONLY AFTER LOGIN
             ========================================= */}
          {showUserActions && (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <Link to="/profile" className="flex items-center gap-2 group">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-amber-500 group-hover:ring-2 group-hover:ring-amber-300 transition-all"
                />
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700 leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium capitalize">
                    {user.roleTitle}
                  </p>
                </div>
              </Link>

              <button
                onClick={logout}
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
