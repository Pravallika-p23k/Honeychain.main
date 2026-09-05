import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Building2,
  FlaskConical,
  Clock,
  Award,
  FileCheck,
  LogOut,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";

import labOfficerImage from "../assets/profile.jpg";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isLabOfficer = user?.role === "lab_officer";

  // Demo details for Lab Officer
  const labDetails = {
    name: user?.name || "Honey Testing Lab Officer",
    email: user?.email || "lab@honeychain.gov.in",
    labId: user?.laboratoryId || "LAB-AP-001",
    registrationNo: "KVIC-LAB-AP-2026-014",
    phone: "+91 98765 43210",
    location: "Guntur, Andhra Pradesh",
    laboratoryName: "Honey Quality Testing Laboratory",
    specialization: "Honey Quality & Adulteration Testing",
    accreditation: "KVIC Certified Laboratory",
    experience: "5+ Years",
    workingHours: "9:00 AM – 5:30 PM",
    testsCompleted: "248",
    reportsSubmitted: "231",
    joinedDate: "January 2026",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl mb-6">
          <div className="h-28 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500"></div>

          <div className="px-6 md:px-10 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-16">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={labOfficerImage}
                  alt="Lab Officer"
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl bg-white"
                />

                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2 border-4 border-slate-900">
                  <BadgeCheck className="w-5 h-5" />
                </div>
              </div>

              {/* Name */}
              <div className="flex-1 text-white pb-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold uppercase tracking-wider">
                    Lab Officer
                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                    ✓ KVIC Certified
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold">
                  {labDetails.name}
                </h1>

                <p className="text-slate-300 mt-1">
                  {labDetails.laboratoryName}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 rounded-xl px-4 py-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 text-sm font-semibold">
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Official Details */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-orange-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Official Laboratory Credentials
                  </h2>
                  <p className="text-sm text-slate-500">
                    Authorized laboratory officer information
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Lab ID */}
                <InfoCard
                  icon={<BadgeCheck />}
                  label="Laboratory ID"
                  value={labDetails.labId}
                />

                {/* Registration */}
                <InfoCard
                  icon={<FileCheck />}
                  label="Registration Number"
                  value={labDetails.registrationNo}
                />

                {/* Accreditation */}
                <InfoCard
                  icon={<Award />}
                  label="Accreditation"
                  value={labDetails.accreditation}
                />

                {/* Joined Date */}
                <InfoCard
                  icon={<CalendarDays />}
                  label="Registered Since"
                  value={labDetails.joinedDate}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <User className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Contact Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    Registered communication details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={<Mail />}
                  label="Official Email"
                  value={labDetails.email}
                />

                <InfoCard
                  icon={<Phone />}
                  label="Registered Phone"
                  value={labDetails.phone}
                />

                <InfoCard
                  icon={<MapPin />}
                  label="Location / Jurisdiction"
                  value={labDetails.location}
                />

                <InfoCard
                  icon={<Clock />}
                  label="Working Hours"
                  value={labDetails.workingHours}
                />
              </div>
            </div>

            {/* Laboratory Information */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <FlaskConical className="w-6 h-6 text-purple-600" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Laboratory Information
                  </h2>
                  <p className="text-sm text-slate-500">
                    Testing laboratory profile
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Laboratory Name</p>
                  <p className="font-semibold text-slate-900">
                    {labDetails.laboratoryName}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Specialization</p>
                  <p className="font-semibold text-slate-900">
                    {labDetails.specialization}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Testing Scope</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                      Moisture
                    </span>

                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      Sugar Analysis
                    </span>

                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      HMF
                    </span>

                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                      Pollen Analysis
                    </span>

                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      C4 Sugar
                    </span>

                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      Adulteration
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Performance */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <FileCheck className="w-6 h-6 text-emerald-600" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Testing Performance
                  </h2>
                  <p className="text-xs text-slate-500">Laboratory activity</p>
                </div>
              </div>

              <div className="space-y-4">
                <StatBox
                  title="Tests Completed"
                  value={labDetails.testsCompleted}
                />

                <StatBox
                  title="Reports Submitted"
                  value={labDetails.reportsSubmitted}
                />

                <StatBox title="Experience" value={labDetails.experience} />
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-900 mb-5">
                Verification Status
              </h2>

              <div className="space-y-4">
                <StatusRow title="Government Registration" status="Verified" />

                <StatusRow title="KVIC Certification" status="Verified" />

                <StatusRow title="Laboratory Account" status="Active" />

                <StatusRow title="Report Submission" status="Enabled" />
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-orange-400" />

                <h2 className="font-bold">Officer Responsibilities</h2>
              </div>

              <ul className="space-y-3 text-sm text-slate-300">
                <li>✓ Conduct honey quality testing</li>
                <li>✓ Submit verified laboratory reports</li>
                <li>✓ Maintain batch testing records</li>
                <li>✓ Support KVIC quality verification</li>
                <li>✓ Ensure testing data accuracy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-6 bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-red-600">Account Logout</h2>

              <p className="text-sm text-slate-500 mt-1">
                Sign out from the HoneyChain Lab Officer portal.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------- */
/* Reusable Components               */
/* -------------------------------- */

const InfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
      <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white shadow-sm text-orange-600">
        {React.cloneElement(icon, {
          className: "w-5 h-5",
        })}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500 mb-1">{label}</p>

        <p className="font-semibold text-slate-900 break-words">{value}</p>
      </div>
    </div>
  );
};

const StatBox = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
      <span className="text-sm text-slate-600">{title}</span>

      <span className="text-xl font-bold text-orange-600">{value}</span>
    </div>
  );
};

const StatusRow = ({ title, status }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-600">{title}</span>

      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
        {status}
      </span>
    </div>
  );
};

export default ProfilePage;
