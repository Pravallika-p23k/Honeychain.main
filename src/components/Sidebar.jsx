import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Box, 
  Cpu, 
  Sparkles, 
  Sprout, 
  Layers, 
  Database, 
  ShoppingBag, 
  Bell, 
  User, 
  Building2, 
  Users, 
  ShieldCheck, 
  ChevronRight,
  FileCheck,
  Award,
  QrCode
} from 'lucide-react';

export const Sidebar = ({ isMobileOpen, closeMobileSidebar }) => {
  const { user } = useAuth();

  const BEEKEEPER_NAV = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Hives', path: '/hives', icon: Box },
    { name: 'IoT Hive Monitoring', path: '/iot', icon: Cpu },
    { name: 'AI Insights', path: '/ai-insights', icon: Sparkles },
    { name: 'Harvest Honey', path: '/harvest', icon: Sprout },
    { name: 'Honey Batches', path: '/batches', icon: Layers },

    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Alerts', path: '/alerts', icon: Bell },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const GOV_NAV = [
    { name: "Government Dashboard", path: "/gov-dashboard", icon: Building2 },
    { name: "Beekeeper Registry", path: "/beekeepers", icon: Users },
    { name: "Batch Quality Audit", path: "/gov-verify", icon: FileCheck },
    { name: "IoT Oversight Grid", path: "/iot", icon: Cpu },
    { name: "AI Regional Risk", path: "/ai-insights", icon: Sparkles },
    { name: "All Honey Batches", path: "/batches", icon: Layers },
    { name: "Blockchain Records", path: "/blockchain", icon: Database },
    { name: "Marketplace Listings", path: "/marketplace", icon: ShoppingBag },
    { name: "Official Profile", path: "/profile", icon: User },
  ];

const BUYER_NAV = [
  {
    name: "Scan Honey QR",
    path: "/buyer-qr",
    icon: QrCode,
  },
 
  {
    name: "Batch Verification",
    path: "/verify",
    icon: ShieldCheck,
  },
  {
    name: "Company Profile",
    path: "/profile",
    icon: User,
  },
];
  const navItems = user.role === 'gov_officer' ? GOV_NAV : user.role === 'buyer' ? BUYER_NAV : BEEKEEPER_NAV;
  
  

  console.log("CURRENT USER:", user);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-slate-900 text-slate-200 border-r border-slate-800
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col justify-between shrink-0
      `}
      >
        <div className="p-4">
          {/* User Role Card */}
          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                {user.role === "gov_officer" ? (
                  <Building2 className="w-5 h-5" />
                ) : user.role === "buyer" ? (
                  <ShoppingBag className="w-5 h-5" />
                ) : (
                  <Box className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                  {user.role.replace("_", " ")}
                </p>
                <p className="text-xs font-bold text-white truncate max-w-[130px]">
                  {user.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate max-w-[130px]">
                  {user.cluster || user.department || user.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <p className="px-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
              Main Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) => `
                    flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all
                    ${
                      isActive
                        ? "bg-amber-600 text-white shadow-md shadow-amber-600/20 font-bold"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Badge */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>KVIC Certified Traceability Infrastructure v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
};
