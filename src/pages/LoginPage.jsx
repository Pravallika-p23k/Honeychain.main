import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, Building2, ShoppingBag, KeyRound, Lock, AlertCircle, CheckCircle } from 'lucide-react';

export const LoginPage = () => {
  const [role, setRole] = useState('beekeeper');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    if (role === 'gov_officer') {
      navigate('/gov-dashboard');
    } else if (role === 'buyer') {
      navigate('/marketplace');
    } else {
      navigate('/dashboard');
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetSent(true);
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Government Top Emblem Banner */}
        <div className="bg-slate-950 text-white p-6 text-center border-b border-slate-800 relative">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <p className="text-[10px] font-mono font-semibold uppercase text-amber-400 tracking-widest">Government of India | KVIC</p>
          <h2 className="text-xl font-bold text-white mt-1">Honey Chain Portal Authentication</h2>
          <p className="text-xs text-slate-400 mt-1">National Honey Quality Traceability Network</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Select User Role:</label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => { setRole('beekeeper'); setEmail('ramesh.beekeeping@gov.in'); }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  role === 'beekeeper' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Beekeeper</span>
              </button>

              <button
                type="button"
                onClick={() => { setRole('gov_officer'); setEmail('anand.sharma@kvic.gov.in'); }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  role === 'gov_officer' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>KVIC Officer</span>
              </button>

              <button
                type="button"
                onClick={() => { setRole('buyer'); setEmail('procurement@apexorganics.in'); }}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                  role === 'buyer' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buyer</span>
              </button>
            </div>
          </div>

          {!showForgotPassword ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'beekeeper' ? '' : role === 'gov_officer' ? '' : ''}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs font-semibold text-amber-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password || ''}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Security Captcha Notice */}
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Government Authorized Portal. All login sessions are cryptographically logged for audit compliance.</span>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-xl font-bold text-white text-sm shadow-md transition-all ${
                  role === 'gov_officer' ? 'bg-blue-600 hover:bg-blue-700' : role === 'buyer' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-600 hover:bg-amber-700'
                }`}
              >
                Sign In to {role === 'gov_officer' ? 'KVIC Portal' : role === 'buyer' ? 'Procurement Desk' : 'Beekeeper Dashboard'}
              </button>
            </form>
          ) : (
            /* Forgot Password Box */
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-amber-600" />
                Reset Portal Credentials
              </h3>
              {!resetSent ? (
                <form onSubmit={handleForgotSubmit} className="space-y-3">
                  <p className="text-xs text-slate-600">Enter your registered email address or mobile number to receive a secure OTP code.</p>
                  <input
                    type="text"
                    required
                    placeholder="Enter email or mobile..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg text-xs"
                    >
                      Send Reset OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs text-center space-y-2">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                  <p className="font-bold">Password Reset Instructions Sent!</p>
                  <p className="text-[11px] text-emerald-700">Please check your registered email / SMS for further instructions.</p>
                  <button
                    onClick={() => { setShowForgotPassword(false); setResetSent(false); }}
                    className="mt-2 text-xs font-bold text-emerald-800 hover:underline"
                  >
                    Return to Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-xs text-slate-500">
          Need assistance? Contact KVIC Helpline: <strong>1800-11-KVIC</strong>
        </div>
      </div>
    </div>
  );
};
