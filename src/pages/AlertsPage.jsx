import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { StatusBadge } from '../components/StatusBadge';
import { Link } from 'react-router-dom';
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, Trash2, ArrowRight } from 'lucide-react';

export const AlertsPage = () => {
  const { alerts, dismissAlert } = useData();
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = alerts.filter(a => filterSeverity === 'ALL' || a.severity === filterSeverity);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-7 h-7 text-rose-600" />
            System Anomaly & Risk Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-1">Automated notifications for microclimate spikes, weight drops, QA flags, and QR scans.</p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterSeverity('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterSeverity === 'ALL' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            All Alerts ({alerts.length})
          </button>
          <button
            onClick={() => setFilterSeverity('CRITICAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterSeverity === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Critical ({alerts.filter(a => a.severity === 'CRITICAL').length})
          </button>
          <button
            onClick={() => setFilterSeverity('WARNING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterSeverity === 'WARNING' ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
            }`}
          >
            Warning ({alerts.filter(a => a.severity === 'WARNING').length})
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                alert.severity === 'CRITICAL' 
                  ? 'bg-rose-50/70 border-rose-200' 
                  : alert.severity === 'WARNING' 
                    ? 'bg-amber-50/70 border-amber-200' 
                    : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0 mt-0.5">
                  {alert.severity === 'CRITICAL' ? (
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                  ) : alert.severity === 'WARNING' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Bell className="w-5 h-5 text-blue-600" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-slate-900">{alert.title}</span>
                    <StatusBadge status={alert.severity} />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{alert.message}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1">{alert.timestamp}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {alert.hiveId && (
                  <Link
                    to={`/hives/${alert.hiveId}`}
                    className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors"
                  >
                    Inspect Hive <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-white/80 transition-colors"
                  title="Dismiss Alert"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <p className="text-sm font-bold text-slate-900">No active alerts</p>
            <p className="text-xs text-slate-500 mt-1">All monitored IoT nodes and batch quality parameters are operating normally.</p>
          </div>
        )}
      </div>
    </div>
  );
};
