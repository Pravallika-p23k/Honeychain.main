import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Thermometer,
  Droplets,
  ShieldCheck,
  Package,
  Truck,
  Factory,
} from "lucide-react";

const HoneyTrackingPage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const decodedBatchId = decodeURIComponent(batchId || "HC-BATCH-001");

  const trackingData = {
    batchId: decodedBatchId,
    honeyType: "Raw Forest Honey",
    beekeeper: "Registered Rural Beekeeper",
    location: "Andhra Pradesh",
    harvestDate: "28 August 2026",
    quality: "Verified",
    moisture: "17.8%",
    temperature: "28.4°C",
    status: "Authentic",
  };

  const journey = [
    {
      title: "Honey Harvested",
      description: "Honey collected from registered hive",
      date: "28 Aug 2026",
      icon: Package,
    },
    {
      title: "Quality Verified",
      description: "Honey quality checked by authorized personnel",
      date: "29 Aug 2026",
      icon: ShieldCheck,
    },
    {
      title: "Batch Registered",
      description: "Batch information recorded in HoneyChain",
      date: "29 Aug 2026",
      icon: Factory,
    },
    {
      title: "Processing & Packaging",
      description: "Honey processed and securely packaged",
      date: "30 Aug 2026",
      icon: Package,
    },
    {
      title: "Dispatched",
      description: "Honey dispatched to buyer",
      date: "31 Aug 2026",
      icon: Truck,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/buyer-qr")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600"
      >
        <ArrowLeft className="w-4 h-4" />
        Scan Another QR
      </button>

      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Honey Traceability
            </p>

            <h1 className="text-3xl font-extrabold mt-2">
              {trackingData.honeyType}
            </h1>

            <p className="text-slate-400 mt-2 font-mono">
              Batch ID: {trackingData.batchId}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 px-4 py-3 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-bold">
              {trackingData.status}
            </span>
          </div>
        </div>
      </div>

      {/* Batch Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <MapPin className="w-6 h-6 text-amber-600 mb-3" />
          <p className="text-xs text-slate-500">Origin</p>
          <p className="font-bold text-slate-900 mt-1">
            {trackingData.location}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <Thermometer className="w-6 h-6 text-amber-600 mb-3" />
          <p className="text-xs text-slate-500">Temperature</p>
          <p className="font-bold text-slate-900 mt-1">
            {trackingData.temperature}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <Droplets className="w-6 h-6 text-amber-600 mb-3" />
          <p className="text-xs text-slate-500">Moisture Content</p>
          <p className="font-bold text-slate-900 mt-1">
            {trackingData.moisture}
          </p>
        </div>
      </div>

      {/* Traceability Journey */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-900 mb-7">
          Honey Traceability Journey
        </h2>

        <div className="space-y-6">
          {journey.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>

                  {index !== journey.length - 1 && (
                    <div className="w-0.5 h-12 bg-amber-200 mt-2" />
                  )}
                </div>

                <div className="pb-3">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {item.description}
                  </p>

                  <p className="text-xs text-amber-600 font-semibold mt-1">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verification */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex gap-4">
        <ShieldCheck className="w-7 h-7 text-emerald-600 flex-shrink-0" />

        <div>
          <h3 className="font-bold text-emerald-900">
            HoneyChain Verification
          </h3>

          <p className="text-sm text-emerald-700 mt-1">
            This batch can be traced from harvest through processing and
            distribution using its unique HoneyChain batch identifier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoneyTrackingPage;
