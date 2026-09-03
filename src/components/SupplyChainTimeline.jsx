import React from 'react';
import { CheckCircle2, Clock, ShieldCheck, Factory, TestTube, Package, ShoppingBag, Radio } from 'lucide-react';

export const SupplyChainTimeline = ({ batch }) => {
  const stages = [
    {
      id: 'HIVE',
      title: 'Hive & Foraging',
      icon: Radio,
      desc: `Hives: ${batch.sourceHives ? batch.sourceHives.join(', ') : 'HC-AP-017'}`,
      detail: `${batch.floralSource || 'Floral'} bloom, ${batch.cluster || 'AP Cluster'}`,
      status: 'COMPLETED',
      timestamp: batch.harvestDate ? `${batch.harvestDate} 08:00 AM` : 'Completed'
    },
    {
      id: 'HARVEST',
      title: 'Digital Harvest Log',
      icon: CheckCircle2,
      desc: `${batch.quantityKg || 0} kg extracted by ${batch.beekeeperName || 'Beekeeper'}`,
      detail: `Batch ID: ${batch.batchId}`,
      status: 'COMPLETED',
      timestamp: batch.harvestDate || 'Completed'
    },
    {
      id: 'PROCESSING',
      title: 'Processing & Filtration',
      icon: Factory,
      desc: 'Raw honey moisture reduction & wax micro-filtration',
      detail: 'Temp maintained <45°C to preserve natural enzymes',
      status: batch.processingStatus === 'HARVESTED' ? 'IN_PROGRESS' : 'COMPLETED',
      timestamp: 'Cluster Processing Unit #3'
    },
    {
      id: 'QUALITY',
      title: 'KVIC Quality Audit',
      icon: TestTube,
      desc: batch.qualityStatus === 'PASSED_KVIC_TEST' ? 'Passed Lab Audit (Grade A Organic)' : 'Testing Purity & C4 Sugars',
      detail: `Purity: ${batch.purityScore || 'Pending'} | Moisture: ${batch.moistureContent || 'Pending'}`,
      status: batch.qualityStatus === 'PASSED_KVIC_TEST' ? 'COMPLETED' : 'IN_PROGRESS',
      timestamp: 'NABL Certified KVIC Central Lab'
    },
    {
      id: 'PACKAGING',
      title: 'Packaging & QR Tagging',
      icon: Package,
      desc: 'Tamper-evident seal with unique batch QR token',
      detail: 'Glass jar packaging with government authenticity hologram',
      status: (batch.qualityStatus === 'PASSED_KVIC_TEST' && (batch.processingStatus === 'PACKAGED' || batch.processingStatus === 'FOR_SALE')) ? 'COMPLETED' : 'PENDING',
      timestamp: 'Government Certified Facility'
    },
    {
      id: 'SALE',
      title: 'Marketplace & Retail',
      icon: ShoppingBag,
      desc: batch.isListedOnMarketplace ? `Listed on Marketplace (₹${batch.pricePerKg}/kg)` : 'Ready for distribution',
      detail: 'Full consumer end-to-end traceability verified',
      status: batch.isListedOnMarketplace ? 'COMPLETED' : 'PENDING',
      timestamp: 'Retail Ready'
    }
  ];

  return (
    <div className="py-4">
      <div className="relative border-l-2 border-amber-300 ml-4 md:ml-6 space-y-8">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCompleted = stage.status === 'COMPLETED';
          const isInProgress = stage.status === 'IN_PROGRESS';

          return (
            <div key={idx} className="relative pl-6 md:pl-8 group">
              {/* Dot Icon */}
              <div 
                className={`absolute -left-3.5 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted 
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm' 
                    : isInProgress 
                      ? 'bg-amber-500 border-amber-600 text-white animate-pulse' 
                      : 'bg-slate-100 border-slate-300 text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Stage Content */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                    {stage.title}
                  </h4>
                  <span 
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isCompleted 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : isInProgress 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted ? 'Verified' : isInProgress ? 'In Progress' : 'Pending'}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-700 mb-1">{stage.desc}</p>
                <p className="text-xs text-slate-500">{stage.detail}</p>
                
                <div className="mt-2 text-[11px] font-mono text-slate-400 border-t border-slate-100 pt-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{stage.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
