import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  ShieldCheck,
  Building2,
  FlaskConical,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Briefcase,
  LogOut,
  CheckCircle,
  ShoppingBag,
  Hexagon,
  FileCheck,
  Activity,
  Database,
  Users,
} from "lucide-react";

import profileImage from "../assets/profile.jpg";

// --------------------------------------------------
// PROFILE DATA
// --------------------------------------------------

const beekeeperDetails = {
  name: "Ramesh Kumar",
  designation: "Certified Rural Beekeeper",
  beekeeperId: "BEE-AP-2026-001",
  registrationNo: "KVIC-BEE-AP-2026-014",
  location: "Chittoor, Andhra Pradesh",
  phone: "+91 98765 43210",
  email: "ramesh@honeychain.gov.in",
  experience: "8+ Years",
  hives: "24",
  batches: "36",
  totalHarvest: "1,248 Kg",
  joinedDate: "January 2026",
  status: "Active",
};

const labOfficerDetails = {
  name: "Dr. Ananya Rao",
  designation: "Senior Honey Quality Testing Officer",
  officerId: "KVIC-LAB-OFF-001",
  laboratoryId: "LAB-AP-001",
  registrationNo: "KVIC-LAB-AP-2026-014",
  department: "Honey Quality & Food Safety Division",
  qualification: "M.Sc. Food Science & Technology",
  specialization: "Honey Quality & Adulteration Testing",
  location: "Guntur, Andhra Pradesh",
  phone: "+91 98765 43210",
  email: "lab@honeychain.gov.in",
  experience: "5+ Years",
  testsCompleted: "248",
  reportsSubmitted: "231",
  joinedDate: "January 2026",
  accreditation: "KVIC Certified Laboratory",
  status: "Active",
};

const kvicDetails = {
  name: "KVIC Officer",
  designation: "Honey Traceability & Quality Officer",
  officerId: "KVIC-AP-GOV-001",
  department: "Khadi & Village Industries Commission",
  jurisdiction: "Andhra Pradesh",
  location: "Vijayawada, Andhra Pradesh",
  phone: "+91 98765 43210",
  email: "officer@kvic.gov.in",
  experience: "10+ Years",
  beekeepers: "1,248",
  batchesVerified: "3,682",
  laboratories: "24",
  joinedDate: "January 2024",
  status: "Active",
};

const buyerDetails = {
  name: "Honey Buyer",
  buyerId: "BUYER-AP-2026-001",
  accountType: "Verified Honey Buyer",
  companyName: "Rural Honey Market",
  location: "Vijayawada, Andhra Pradesh",
  phone: "+91 98765 43210",
  email: "buyer@honeychain.in",
  batchesPurchased: "42",
  ordersCompleted: "38",
  totalQuantity: "624 Kg",
  joinedDate: "March 2026",
  status: "Active",
};

// --------------------------------------------------
// SMALL REUSABLE COMPONENTS
// --------------------------------------------------

const InfoCard = ({ icon: Icon, title, value }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
        <Icon className="w-5 h-5 text-amber-600" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{title}</p>
        <p className="text-sm font-semibold text-slate-900 break-words">
          {value}
        </p>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
      <Icon className="w-5 h-5 text-amber-600" />
    </div>

    <div>
      <h2 className="font-bold text-slate-900">{title}</h2>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  </div>
);

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || "beekeeper";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // --------------------------------------------------
  // BEEKEEPER PROFILE
  // --------------------------------------------------

  const renderBeekeeperProfile = () => {
    const data = {
      ...beekeeperDetails,
      name: user?.name || beekeeperDetails.name,
      email: user?.email || beekeeperDetails.email,
    };

    return (
      <>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-950/95 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
              <img
                src={profileImage}
                alt="Beekeeper"
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
              />

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                    BEEKEEPER
                  </span>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded-full text-xs font-bold">
                    ✓ Certified
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-white">{data.name}</h1>

                <p className="text-slate-300">{data.designation}</p>
              </div>

              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                <span className="text-emerald-400 text-sm font-semibold">
                  ● Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={ShieldCheck}
              title="Beekeeper Credentials"
              subtitle="Official beekeeper registration information"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={Award}
                title="Beekeeper ID"
                value={data.beekeeperId}
              />

              <InfoCard
                icon={FileCheck}
                title="Registration Number"
                value={data.registrationNo}
              />

              <InfoCard
                icon={Briefcase}
                title="Experience"
                value={data.experience}
              />

              <InfoCard
                icon={Calendar}
                title="Registered Since"
                value={data.joinedDate}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={Activity}
              title="Beekeeping Performance"
              subtitle="Current beekeeping activity"
            />

            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                icon={Hexagon}
                title="Active Hives"
                value={data.hives}
              />
              <InfoCard
                icon={Database}
                title="Honey Batches"
                value={data.batches}
              />
              <InfoCard
                icon={ShoppingBag}
                title="Total Harvest"
                value={data.totalHarvest}
              />
              <InfoCard icon={CheckCircle} title="Status" value={data.status} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
            <SectionHeader
              icon={User}
              title="Contact Information"
              subtitle="Registered beekeeper contact details"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard icon={Mail} title="Email" value={data.email} />
              <InfoCard icon={Phone} title="Phone" value={data.phone} />
              <InfoCard icon={MapPin} title="Location" value={data.location} />
            </div>
          </div>
        </div>
      </>
    );
  };

  // --------------------------------------------------
  // LAB OFFICER PROFILE
  // --------------------------------------------------

  const renderLabOfficerProfile = () => {
    const data = {
      ...labOfficerDetails,
      name: user?.name || labOfficerDetails.name,
      email: user?.email || labOfficerDetails.email,
    };

    return (
      <>
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-950/95 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
              <img
                src={profileImage}
                alt="Lab Officer"
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
              />

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold">
                    LAB OFFICER
                  </span>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded-full text-xs font-bold">
                    ✓ KVIC Certified
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-white">{data.name}</h1>

                <p className="text-slate-300">
                  {data.laboratoryName || "Honey Quality Testing Laboratory"}
                </p>
              </div>

              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                <span className="text-emerald-400 text-sm font-semibold">
                  ● Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={ShieldCheck}
              title="Official Laboratory Credentials"
              subtitle="Authorized laboratory officer information"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={ShieldCheck}
                title="Laboratory ID"
                value={data.laboratoryId}
              />

              <InfoCard
                icon={FileCheck}
                title="Registration Number"
                value={data.registrationNo}
              />

              <InfoCard
                icon={Award}
                title="Accreditation"
                value={data.accreditation}
              />

              <InfoCard
                icon={Calendar}
                title="Registered Since"
                value={data.joinedDate}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={FlaskConical}
              title="Testing Performance"
              subtitle="Laboratory activity"
            />

            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                icon={Activity}
                title="Tests Completed"
                value={data.testsCompleted}
              />

              <InfoCard
                icon={FileCheck}
                title="Reports Submitted"
                value={data.reportsSubmitted}
              />

              <InfoCard
                icon={Briefcase}
                title="Experience"
                value={data.experience}
              />

              <InfoCard icon={CheckCircle} title="Status" value={data.status} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={User}
              title="Lab Officer Details"
              subtitle="Professional information"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={User} title="Officer Name" value={data.name} />
              <InfoCard
                icon={Award}
                title="Officer ID"
                value={data.officerId}
              />
              <InfoCard
                icon={Briefcase}
                title="Designation"
                value={data.designation}
              />
              <InfoCard
                icon={Building2}
                title="Department"
                value={data.department}
              />
              <InfoCard
                icon={FileCheck}
                title="Qualification"
                value={data.qualification}
              />
              <InfoCard
                icon={Activity}
                title="Specialization"
                value={data.specialization}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={MapPin}
              title="Laboratory Information"
              subtitle="Registered laboratory location"
            />

            <div className="space-y-4">
              <InfoCard
                icon={Building2}
                title="Laboratory"
                value="Honey Quality Testing Laboratory"
              />

              <InfoCard icon={MapPin} title="Location" value={data.location} />

              <InfoCard icon={Phone} title="Phone" value={data.phone} />

              <InfoCard icon={Mail} title="Email" value={data.email} />
            </div>
          </div>
        </div>
      </>
    );
  };

  // --------------------------------------------------
  // KVIC OFFICER PROFILE
  // --------------------------------------------------

  const renderKVICProfile = () => {
    const data = {
      ...kvicDetails,
      name: user?.name || kvicDetails.name,
      email: user?.email || kvicDetails.email,
    };

    return (
      <>
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-950/95 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
              <div className="w-32 h-32 rounded-2xl bg-amber-500/20 border-4 border-white flex items-center justify-center">
                <Building2 className="w-16 h-16 text-amber-400" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                    KVIC OFFICER
                  </span>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded-full text-xs font-bold">
                    ✓ Government Verified
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-white">{data.name}</h1>

                <p className="text-slate-300">{data.designation}</p>
              </div>

              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                <span className="text-emerald-400 text-sm font-semibold">
                  ● Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={ShieldCheck}
              title="Government Credentials"
              subtitle="Official KVIC officer information"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={ShieldCheck}
                title="Government ID"
                value={data.officerId}
              />

              <InfoCard
                icon={Building2}
                title="Department"
                value={data.department}
              />

              <InfoCard
                icon={MapPin}
                title="Jurisdiction"
                value={data.jurisdiction}
              />

              <InfoCard
                icon={Calendar}
                title="Joined Since"
                value={data.joinedDate}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={Activity}
              title="Government Activity"
              subtitle="Current platform oversight"
            />

            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                icon={Users}
                title="Beekeepers"
                value={data.beekeepers}
              />

              <InfoCard
                icon={FileCheck}
                title="Batches Verified"
                value={data.batchesVerified}
              />

              <InfoCard
                icon={FlaskConical}
                title="Laboratories"
                value={data.laboratories}
              />

              <InfoCard
                icon={Briefcase}
                title="Experience"
                value={data.experience}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
            <SectionHeader
              icon={User}
              title="Contact Information"
              subtitle="Government officer contact details"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard icon={Mail} title="Email" value={data.email} />
              <InfoCard icon={Phone} title="Phone" value={data.phone} />
              <InfoCard icon={MapPin} title="Location" value={data.location} />
            </div>
          </div>
        </div>
      </>
    );
  };

  // --------------------------------------------------
  // BUYER PROFILE
  // --------------------------------------------------

  const renderBuyerProfile = () => {
    const data = {
      ...buyerDetails,
      name: user?.name || buyerDetails.name,
      email: user?.email || buyerDetails.email,
    };

    return (
      <>
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-950/95 p-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-5">
              <div className="w-32 h-32 rounded-2xl bg-amber-500/20 border-4 border-white flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-amber-400" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                  <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold">
                    BUYER
                  </span>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded-full text-xs font-bold">
                    ✓ Verified Buyer
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-white">{data.name}</h1>

                <p className="text-slate-300">{data.accountType}</p>
              </div>

              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-400/30 rounded-xl">
                <span className="text-emerald-400 text-sm font-semibold">
                  ● Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={ShieldCheck}
              title="Buyer Credentials"
              subtitle="Verified buyer information"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard
                icon={ShieldCheck}
                title="Buyer ID"
                value={data.buyerId}
              />

              <InfoCard
                icon={ShoppingBag}
                title="Account Type"
                value={data.accountType}
              />

              <InfoCard
                icon={Building2}
                title="Company"
                value={data.companyName}
              />

              <InfoCard
                icon={Calendar}
                title="Registered Since"
                value={data.joinedDate}
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <SectionHeader
              icon={Activity}
              title="Purchase Activity"
              subtitle="Honey purchasing history"
            />

            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                icon={ShoppingBag}
                title="Batches Purchased"
                value={data.batchesPurchased}
              />

              <InfoCard
                icon={CheckCircle}
                title="Orders Completed"
                value={data.ordersCompleted}
              />

              <InfoCard
                icon={Database}
                title="Total Quantity"
                value={data.totalQuantity}
              />

              <InfoCard icon={CheckCircle} title="Status" value={data.status} />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
            <SectionHeader
              icon={User}
              title="Buyer Contact Information"
              subtitle="Registered buyer details"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoCard icon={Mail} title="Email" value={data.email} />
              <InfoCard icon={Phone} title="Phone" value={data.phone} />
              <InfoCard icon={MapPin} title="Location" value={data.location} />
            </div>
          </div>
        </div>
      </>
    );
  };

  // --------------------------------------------------
  // SELECT PROFILE BASED ON LOGIN ROLE
  // --------------------------------------------------

  const renderProfile = () => {
    switch (role) {
      case "beekeeper":
        return renderBeekeeperProfile();

      case "lab_officer":
        return renderLabOfficerProfile();

      case "gov_officer":
        return renderKVICProfile();

      case "buyer":
        return renderBuyerProfile();

      default:
        return renderBeekeeperProfile();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page title */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-600">
            HoneyChain GOV.IN
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            My Profile
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Manage your HoneyChain account and official information.
          </p>
        </div>

        {/* ROLE BASED PROFILE */}
        {renderProfile()}

        {/* Logout */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900">Account Session</h3>

            <p className="text-sm text-slate-500">
              Sign out from your HoneyChain account.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
