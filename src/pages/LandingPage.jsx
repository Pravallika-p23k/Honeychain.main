import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";
import {
  ShieldCheck,
  Cpu,
  Sparkles,
  Database,
  QrCode,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Activity,
  Award,
  Users,
  Search,
  Hexagon,
  UserPlus,
} from "lucide-react";

export const LandingPage = () => {
  const [quickVerifyId, setQuickVerifyId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (sectionId) {
      requestAnimationFrame(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);

  const handleQuickVerify = (e) => {
    e.preventDefault();
    if (quickVerifyId.trim()) {
      navigate(`/verify?batchId=${encodeURIComponent(quickVerifyId.trim())}`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero Section */}
      <section
        className="relative min-h-[600px] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `
      linear-gradient(
        90deg,
        rgba(2, 6, 23, 0.95) 0%,
        rgba(2, 6, 23, 0.82) 35%,
        rgba(2, 6, 23, 0.45) 70%,
        rgba(2, 6, 23, 0.20) 100%
      ),
      url(${heroImage})
    `,
        }}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Khadi & Village Industries Commission (KVIC) Digital Public
              Infrastructure
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Digital Trust for <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                Every Drop of Honey
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Honey Chain connects rural Indian beekeepers with government
              quality labs and global buyers using cellular IoT sensors, AI
              colony diagnostics, and cryptographic blockchain traceability.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                to="/login"
                className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-600/30 transition-all flex items-center gap-2 text-base"
              >
                Access Portal Login
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/signup"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-all flex items-center gap-2 text-base"
              >
                <UserPlus className="w-5 h-5 text-amber-400" />
                Sign Up
              </Link>
            </div>

            {/* Quick Verification Widget */}
            <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-2xl">
              <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                <Search className="w-4 h-4 text-amber-400" />
                Instant Consumer Honey Batch Lookup
              </p>
              <form
                onSubmit={handleQuickVerify}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="text"
                  placeholder="Enter Batch ID (Try: HC-AP-2026-0001 or HC-UP-2026-0084)"
                  value={quickVerifyId}
                  onChange={(e) => setQuickVerifyId(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  Verify Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Counter Section */}
      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
                12,480+
              </p>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Monitored Smart Hives
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
                1,840+
              </p>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Certified Beekeepers
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
                340 MT
              </p>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Traceable Harvested Honey
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1">
                99.4%
              </p>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                KVIC Lab Purity Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section
        id="technology"
        className="scroll-mt-28 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Core Technology Pillars
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-4">
            End-to-End Honey Ecosystem Architecture
          </h2>
          <p className="text-slate-600 text-base">
            Integrated IoT telemetry, artificial intelligence risk modeling, and
            government cryptographic verification empower smallholder beekeepers
            while eliminating honey adulteration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Hexagon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Hive Digital Identity
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every smart hive is registered with a tamper-proof RFID/QR ID,
              mapping geographical coordinates, bee species, and queen genetics
              to KVIC national registers.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              IoT Hive Monitoring
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Solar-powered internal temperature, brood humidity, acoustic
              frequency, and load cell weight sensors transmit live telemetry
              every hour via cellular IoT nodes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              AI Health Prediction
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Machine learning models analyze acoustic distress and microclimate
              shifts to deliver early warning alerts for swarming risk, moisture
              spikes, and pest stress.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Blockchain Traceability
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Immutable ledger receipts log extraction timestamps, KVIC NABL lab
              test results, processing milestones, and digital seals that cannot
              be altered.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              QR Consumer Verification
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Consumers scan the packaging QR code to instantly inspect floral
              source, harvesting beekeeper, purity certificate, and complete
              supply chain journey.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Beekeeper Market Access
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Direct B2B marketplace allows certified rural beekeepers to list
              lab-verified pure honey batches directly to commercial buyers and
              exporters without middlemen.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="traceability"
        className="scroll-mt-28 bg-slate-900 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              Traceability Process
            </span>
            <h2 className="text-3xl font-bold text-white mt-2">
              How Honey Chain Guarantee Purity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 relative">
              <span className="text-3xl font-black text-amber-500/40 mb-2 block">
                01
              </span>
              <h4 className="font-bold text-white mb-2">Smart Hive Foraging</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                IoT sensors stream live hive microclimate and acoustic data
                directly to government cluster servers.
              </p>
            </div>
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 relative">
              <span className="text-3xl font-black text-amber-500/40 mb-2 block">
                02
              </span>
              <h4 className="font-bold text-white mb-2">
                Harvest Registration
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Beekeeper logs extraction details to generate a unique
                government Batch ID (`HC-AP-2026-XXXX`).
              </p>
            </div>
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 relative">
              <span className="text-3xl font-black text-amber-500/40 mb-2 block">
                03
              </span>
              <h4 className="font-bold text-white mb-2">KVIC Lab Testing</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Certified NABL laboratories test moisture, pollen purity, HMF,
                and C4 sugar adulteration.
              </p>
            </div>
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700 relative">
              <span className="text-3xl font-black text-amber-500/40 mb-2 block">
                04
              </span>
              <h4 className="font-bold text-white mb-2">
                Blockchain Seal & QR
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                Cryptographic seal is minted on-chain and consumer QR code is
                printed on final packaged honey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              Are you a Rural Beekeeper or KVIC Officer?
            </h3>
            <p className="text-amber-100 text-sm max-w-xl">
              Access your digital dashboard to register new hives, submit
              harvest batches, perform lab audits, or inspect cluster analytics.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/login"
              className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-colors shadow-md"
            >
              Government Portal Login
            </Link>
            <Link
              to="/verify?batchId=HC-AP-2026-0001"
              className="bg-white hover:bg-amber-50 text-slate-900 font-bold px-6 py-3.5 rounded-xl text-sm transition-colors shadow-md"
            >
              Demo Public Verification
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
