import React from 'react';
import { X, QrCode, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QRModal = ({ isOpen, onClose, batchId, title = "Honey Batch QR Certificate" }) => {
  const navigate = useNavigate();
  if (!isOpen || !batchId) return null;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(batchId)}`;
  const verifyUrl = `/verify?batchId=${batchId}`;

  const handleVerifyClick = () => {
    onClose();
    navigate(verifyUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-base">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Government Batch Registry</p>
          <p className="text-xl font-bold text-slate-900 mb-4">{batchId}</p>

          <div className="inline-block p-4 bg-amber-50 rounded-xl border-2 border-amber-200 shadow-inner mb-4">
            <img 
              src={qrUrl} 
              alt={`QR Code for ${batchId}`}
              className="w-48 h-48 mx-auto object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-emerald-700 bg-emerald-50 py-2 px-3 rounded-lg text-xs font-medium mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital Cryptographic Identity Secured</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button 
              onClick={handleVerifyClick}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Public Verification
            </button>
            <a 
              href={qrUrl}
              download={`${batchId}-QR.png`}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>

        <div className="bg-slate-50 px-5 py-3 text-center border-t border-slate-200">
          <p className="text-xs text-slate-500">Scan using camera or Honey Chain Consumer Portal</p>
        </div>
      </div>
    </div>
  );
};
