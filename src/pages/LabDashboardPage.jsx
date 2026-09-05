import React from "react";
import { Link } from "react-router-dom";
import {
  FlaskConical,
  ClipboardCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const LabDashboardPage = () => {
  const stats = [
    {
      title: "Pending Tests",
      value: "08",
      icon: Clock,
    },
    {
      title: "Tests Completed",
      value: "42",
      icon: CheckCircle,
    },
    {
      title: "Reports Submitted",
      value: "38",
      icon: ClipboardCheck,
    },
    {
      title: "Failed Tests",
      value: "04",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3">
          <FlaskConical className="w-9 h-9" />

          <div>
            <h1 className="text-2xl font-bold">Laboratory Testing Dashboard</h1>

            <p className="text-orange-100">
              Monitor honey quality testing and submit verified laboratory
              reports.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                </div>

                <div className="bg-orange-100 p-3 rounded-xl">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Testing Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-5 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Honey Testing Queue
            </h2>

            <p className="text-sm text-slate-500">
              Honey batches waiting for laboratory testing.
            </p>
          </div>

          <Link
            to="/lab-testing"
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
          >
            Open Testing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-sm">Batch ID</th>
                <th className="text-left p-4 text-sm">Honey Type</th>
                <th className="text-left p-4 text-sm">Origin</th>
                <th className="text-left p-4 text-sm">Test Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-4 font-semibold">HC-AP-2026-0001</td>

                <td className="p-4">Wildflower & Mustard</td>

                <td className="p-4">Andhra Pradesh</td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-4 font-semibold">HC-UP-2026-0084</td>

                <td className="p-4">Eucalyptus Bloom</td>

                <td className="p-4">Uttar Pradesh</td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LabDashboardPage;
