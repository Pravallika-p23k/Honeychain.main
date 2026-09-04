import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, ArrowLeft, ShieldCheck } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";

const BuyerQRPage = () => {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const [scannedData, setScannedData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            setScannedData(decodedText);
            setError("");

            scanner
              .stop()
              .then(() => {
                navigate(`/track/${encodeURIComponent(decodedText)}`);
              })
              .catch(() => {});
          },
          () => {},
        );
      } catch (err) {
        console.error(err);
        setError(
          "Unable to access camera. Please allow camera permission and try again.",
        );
      }
    };

    startScanner();

    return () => {
      if (scanner.isScanning) {
        scanner.stop().catch(() => {});
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 mb-4">
            <QrCode className="w-9 h-9 text-amber-600" />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900">
            Scan Honey QR Code
          </h1>

          <p className="text-slate-500 mt-2">
            Scan the QR code on the honey package to view its complete
            traceability journey.
          </p>
        </div>

        {/* Scanner Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5">
          <div
            id="qr-reader"
            ref={scannerRef}
            className="overflow-hidden rounded-2xl"
          ></div>

          {error && (
            <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          {scannedData && (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-5 h-5" />
                QR Code Successfully Scanned
              </div>

              <p className="text-sm text-slate-600 mt-2">
                Batch ID: {scannedData}
              </p>
            </div>
          )}

          <div className="mt-5 text-center">
            <p className="text-sm text-slate-500">
              📱 Point your camera at the QR code printed on the honey package.
            </p>
          </div>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate("/marketplace")}
          className="mt-5 mx-auto flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-amber-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </button>
      </div>
    </div>
  );
};

export default BuyerQRPage;
