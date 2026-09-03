import React from 'react';
import { ShieldCheck, ExternalLink, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-3">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>Honey Chain Portal</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">
              National Blockchain & IoT Enabled Honey Quality Traceability Network for Rural Beekeepers and Government Inspection.
            </p>
            <p className="text-[11px] font-mono text-amber-400">Khadi & Village Industries Commission (KVIC)</p>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">Government Portals</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="https://kvic.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1">KVIC Official Portal <ExternalLink className="w-3 h-3"/></a></li>
              <li><a href="https://msme.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1">Ministry of MSME <ExternalLink className="w-3 h-3"/></a></li>
              <li><a href="https://fssai.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1">FSSAI Food Safety Standard <ExternalLink className="w-3 h-3"/></a></li>
              <li><a href="https://digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1">Digital India Initiative <ExternalLink className="w-3 h-3"/></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">System Architecture</h4>
            <ul className="space-y-2 text-slate-400">
              <li>IoT Sensors: 4G Cellular Telemetry</li>
              <li>AI Engine: Predictive Health & Yield</li>
              <li>Blockchain: Hyperledger Besu Bespoke Ledger</li>
              <li>Lab Audit: NABL Certified KVIC Labs</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">Platform Disclaimer</h4>
            <p className="text-slate-400 text-xs leading-relaxed bg-slate-900 p-3 rounded border border-slate-800">
              This prototype represents a digital public infrastructure design. Blockchain, AI, and IoT endpoints are operating in simulation mode for demonstration.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Honey Chain Project | Khadi and Village Industries Commission, Government of India.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Help Desk: 1800-11-KVIC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
