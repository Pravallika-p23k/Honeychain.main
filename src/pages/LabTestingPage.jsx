import React, { useState } from "react";
import { FlaskConical, CheckCircle, Save } from "lucide-react";

const LabTestingPage = () => {
  const [selectedBatch, setSelectedBatch] = useState("HC-AP-2026-0001");

  const [report, setReport] = useState({
    moisture: "",
    sugar: "",
    acidity: "",
    hmf: "",
    pollen: "",
    c4Sugar: "Not Tested",
    result: "Pending",
    remarks: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setReport({
      ...report,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
  };

  const submitReport = () => {
    setSubmitted(true);
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-3">
          <FlaskConical className="w-9 h-9" />

          <div>
            <h1 className="text-2xl font-bold">Honey Quality Testing</h1>

            <p className="text-orange-100">
              Conduct tests and submit laboratory verification reports.
            </p>
          </div>
        </div>
      </div>

      {/* Batch Selection */}
      <div className="bg-white rounded-xl border p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Select Honey Batch</h2>

        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className="w-full md:w-96 border rounded-lg px-4 py-3"
        >
          <option value="HC-AP-2026-0001">
            HC-AP-2026-0001 - Wildflower & Mustard
          </option>

          <option value="HC-UP-2026-0084">
            HC-UP-2026-0084 - Eucalyptus Bloom
          </option>
        </select>
      </div>

      {/* Testing Form */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-bold mb-6">Laboratory Test Report</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              Moisture Content (%)
            </label>

            <input
              name="moisture"
              value={report.moisture}
              onChange={handleChange}
              placeholder="Example: 17.2"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Sugar Content (%)
            </label>

            <input
              name="sugar"
              value={report.sugar}
              onChange={handleChange}
              placeholder="Example: 78.5"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Acidity</label>

            <input
              name="acidity"
              value={report.acidity}
              onChange={handleChange}
              placeholder="Enter acidity value"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">HMF Level</label>

            <input
              name="hmf"
              value={report.hmf}
              onChange={handleChange}
              placeholder="Enter HMF value"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Pollen Analysis
            </label>

            <input
              name="pollen"
              value={report.pollen}
              onChange={handleChange}
              placeholder="Enter pollen result"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              C4 Sugar Test
            </label>

            <select
              name="c4Sugar"
              value={report.c4Sugar}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option>Not Tested</option>
              <option>Passed</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Overall Result
          </label>

          <select
            name="result"
            value={report.result}
            onChange={handleChange}
            className="w-full md:w-96 border rounded-lg px-4 py-3"
          >
            <option value="Pending">Pending</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* Remarks */}
        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Laboratory Remarks
          </label>

          <textarea
            name="remarks"
            value={report.remarks}
            onChange={handleChange}
            rows="4"
            placeholder="Enter observations and remarks..."
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Submit */}
        <button
          onClick={submitReport}
          className="mt-6 flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
        >
          <Save className="w-5 h-5" />
          Submit Test Report
        </button>

        {submitted && (
          <div className="mt-5 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
            <CheckCircle className="w-6 h-6" />

            <div>
              <p className="font-semibold">
                Laboratory report submitted successfully
              </p>

              <p className="text-sm">
                Batch {selectedBatch} is now ready for verification.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabTestingPage;
