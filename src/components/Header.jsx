import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { Bell, LogOut, Hexagon, Menu, BookOpen, Route } from "lucide-react";

export const Header = ({ toggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const { alerts } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  // Home and Login are public pages
  const isPublicPage =
    location.pathname === "/" || location.pathname === "/login";

  // Technology and Traceability should appear ONLY on Home
  const isHomePage = location.pathname === "/";

  // Alerts, Profile and Logout should appear only after login
  const showUserActions = user && !isPublicPage;

  const handleSectionNavigation = (event, sectionId) => {
    if (location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="tricolor-bar"></div>

      {/* Government Identity Top Banner */}
      <div className="bg-slate-950 text-slate-200 px-4 py-1.5 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center gap-2 font-medium">
          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-500/30 uppercase tracking-wider">
            Government of India | KVIC
          </span>

          <span className="hidden sm:inline text-slate-400">|</span>

          <span className="hidden sm:inline text-slate-300">
            Khadi & Village Industries Commission Honey Traceability Platform
          </span>
        </div>
      </div>

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

        {/* Right Nav Actions */}
        <div className="flex items-center gap-3">
          {/* =========================================
              TECHNOLOGY + TRACEABILITY
              ONLY ON HOME PAGE
             ========================================= */}
          {isHomePage && (
            <>
              <Link
                to="/#technology"
                onClick={(event) =>
                  handleSectionNavigation(event, "technology")
                }
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 border border-slate-200 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 px-2 sm:px-3 py-2 rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Technology</span>
              </Link>

              <Link
                to="/#traceability"
                onClick={(event) =>
                  handleSectionNavigation(event, "traceability")
                }
                className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 px-2 sm:px-3 py-2 rounded-lg transition-colors"
              >
                <Route className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Traceability</span>
              </Link>
            </>
          )}

          {/* =========================================
    SYSTEM ALERTS - BEEKEEPER ONLY
   ========================================= */}
          {showUserActions && user?.role === "beekeeper" && (
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
              USER PROFILE + LOGOUT - ONLY AFTER LOGIN
             ========================================= */}
          {showUserActions && (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              {/* Profile */}
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

              {/* Logout */}
              <button
                onClick={handleLogout}
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
