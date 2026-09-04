import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, ShieldCheck, UserPlus } from "lucide-react";

export const SignupPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 flex items-center justify-center p-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-950 text-white p-6 text-center border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-3">
            <UserPlus className="w-7 h-7" />
          </div>
          <p className="text-[10px] font-mono font-semibold uppercase text-amber-400 tracking-widest">
            Government of India | KVIC
          </p>
          <h2 className="text-xl font-bold text-white mt-1">
            Create Your Honey Chain Account
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Join the national honey traceability network
          </p>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center space-y-4 py-6">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <div>
                <h3 className="font-bold text-slate-900">
                  Registration submitted
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your account request is ready for KVIC verification.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                Continue to Login
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email or Mobile Number
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter email or mobile number"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Account Type
                </label>
                <select
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  defaultValue="beekeeper"
                >
                  <option value="beekeeper">Beekeeper</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Create Password
                </label>
                <input
                  required
                  type="password"
                  minLength="8"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="At least 8 characters"
                />
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Account requests are reviewed for secure platform access.
                </span>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-sm"
              >
                Create Account
              </button>
            </form>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-bold text-amber-700 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
