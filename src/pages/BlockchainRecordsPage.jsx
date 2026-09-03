import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { BLOCKCHAIN_DISCLAIMER } from '../services/blockchainService';
import { StatusBadge } from '../components/StatusBadge';
import { Database, Search, ShieldCheck, Link as LinkIcon, ExternalLink, Cpu, Info } from 'lucide-react';

export const BlockchainRecordsPage = () => {
  const { blockchainLogs } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = blockchainLogs.filter(log =>
    log.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-blue-900 text-xs">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">BLOCKCHAIN INTEGRATION NOTICE: </span>
          <span>{BLOCKCHAIN_DISCLAIMER}</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Database className="w-7 h-7 text-emerald-600" />
            Immutable Blockchain Ledger Records
          </h1>
          <p className="text-xs text-slate-500 mt-1">Cryptographic audit receipts for harvests, KVIC lab certifications, and digital seals.</p>
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Filter Tx Hash, Batch ID, Event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-amber-400">NETWORK: HONEYCHAIN HYPERLEDGER TESTNET (BESU)</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded font-mono">
            Block Height: #18,495,210
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-mono text-slate-500 uppercase border-b border-slate-200">
                <th className="py-3 px-4">Transaction Hash</th>
                <th className="py-3 px-4">Batch ID</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Signer Node</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLogs.map((tx) => (
                <tr key={tx.txHash} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-700">
                    <span className="truncate inline-block max-w-[160px]" title={tx.txHash}>{tx.txHash}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{tx.batchId}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                      {tx.event}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{tx.signer}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{tx.timestamp}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={tx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
          Showing {filteredLogs.length} verified blockchain receipts. Signed with 256-bit SHA ECDSA keys.
        </div>
      </div>
    </div>
  );
};
