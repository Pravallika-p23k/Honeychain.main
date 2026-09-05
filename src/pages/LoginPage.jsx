import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Building2, ShoppingBag, FlaskConical, Lock } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("beekeeper");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [govtId, setGovtId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // ================================
    // KVIC OFFICER LOGIN VALIDATION
    // ================================
    if (role === "gov_officer") {
      const VALID_GOVT_ID = "KVIC-AP-GOV-001";

      if (govtId.trim().toUpperCase() !== VALID_GOVT_ID) {
        setError(
          "Invalid KVIC Government ID. Only registered KVIC officers can access this portal.",
        );
        return;
      }

      if (!email || !password) {
        setError("Please enter your registered email and password.");
        return;
      }

      login({
        role: "gov_officer",
        name: "KVIC Officer",
        email: email,
        govtId: VALID_GOVT_ID,
      });

      navigate("/gov-dashboard");
      return;
    }

    // ================================
    // BEEKEEPER LOGIN
    // ================================
    if (role === "beekeeper") {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }

      login({
        role: "beekeeper",
        name: "Registered Beekeeper",
        email: email,
      });

      navigate("/dashboard");
      return;
    }

    // ================================
    // BUYER LOGIN
    // ================================
    if (role === "buyer") {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }

      login({
        role: "buyer",
        name: "Honey Buyer",
        email: email,
      });

      navigate("/marketplace");
      return;
    }

    // ================================
    // LAB OFFICER LOGIN
    // ================================
    if (role === "lab_officer") {
      if (!email || !password) {
        setError("Please enter your email and password.");
        return;
      }

      login({
        role: "lab_officer",
        name: "Honey Testing Lab Officer",
        email: email,
        laboratoryId: "LAB-AP-001",
      });

      navigate("/lab-dashboard");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-slate-950 text-white text-center px-6 py-5">
          <h1 className="text-xl font-bold">
            Honey Chain Portal Authentication
          </h1>

          <p className="text-sm text-slate-300 mt-1">
            National Honey Quality Traceability Network
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-6">
          {/* ROLE */}
          <label className="text-xs font-semibold text-slate-700">
            SELECT USER ROLE:
          </label>

          <div className="grid grid-cols-4 gap-2 bg-slate-100 p-1 rounded-xl mt-2 mb-5">
            {/* BEEKEEPER */}
            <button
              type="button"
              onClick={() => {
                setRole("beekeeper");
                setGovtId("");
                setError("");
              }}
              className={`py-3 rounded-lg text-sm ${
                role === "beekeeper"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700"
              }`}
            >
              <User className="w-4 h-4 mx-auto mb-1" />
              Beekeeper
            </button>

            {/* KVIC OFFICER */}
            <button
              type="button"
              onClick={() => {
                setRole("gov_officer");
                setError("");
              }}
              className={`py-3 rounded-lg text-sm ${
                role === "gov_officer"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700"
              }`}
            >
              <Building2 className="w-4 h-4 mx-auto mb-1" />
              KVIC Officer
            </button>

            {/* BUYER */}
            <button
              type="button"
              onClick={() => {
                setRole("buyer");
                setGovtId("");
                setError("");
              }}
              className={`py-3 rounded-lg text-sm ${
                role === "buyer" ? "bg-blue-600 text-white" : "text-slate-700"
              }`}
            >
              <ShoppingBag className="w-4 h-4 mx-auto mb-1" />
              Buyer
            </button>

            {/* LAB OFFICER */}
            <button
              type="button"
              onClick={() => {
                setRole("lab_officer");
                setGovtId("");
                setError("");
              }}
              className={`py-3 rounded-lg text-sm ${
                role === "lab_officer"
                  ? "bg-blue-600 text-white"
                  : "text-slate-700"
              }`}
            >
              <FlaskConical className="w-4 h-4 mx-auto mb-1" />
              Lab Officer
            </button>
          </div>

          {/* GOVERNMENT ID - ONLY FOR KVIC OFFICER */}
          {role === "gov_officer" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Government / KVIC ID
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />

                <input
                  type="text"
                  value={govtId}
                  onChange={(e) => setGovtId(e.target.value.toUpperCase())}
                  placeholder="Enter KVIC Government ID"
                  className="w-full border border-slate-300 rounded-lg py-3 pl-10 pr-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <p className="text-xs text-slate-500 mt-1">
                Authorized KVIC personnel only
              </p>
            </div>
          )}

          {/* EMAIL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Registered Email or Mobile Number
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter registered email"
              className="w-full border border-slate-300 rounded-lg py-3 px-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-slate-300 rounded-lg py-3 px-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* KVIC SECURITY MESSAGE */}
          {role === "gov_officer" && (
            <div className="mb-5 p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-800">
              🔒 Government Authorized Portal. Access is restricted to
              registered KVIC personnel.
            </div>
          )}

          {/* LAB OFFICER MESSAGE */}
          {role === "lab_officer" && (
            <div className="mb-5 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800">
              🧪 Authorized Lab Officer Portal. Lab officers can monitor honey
              quality testing and submit verified test reports.
            </div>
          )}

          {/* LOGIN */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
          >
            {role === "gov_officer"
              ? "Sign In to KVIC Portal"
              : role === "lab_officer"
                ? "Sign In as Lab Officer"
                : "Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="border-t bg-slate-50 text-center py-4 text-xs text-slate-500">
          Need assistance? Contact KVIC Helpline:{" "}
          <span className="font-semibold">1800-11-KVIC</span>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
export default LoginPage;
