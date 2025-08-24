"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
  FaUser,
  FaMoneyBill,
  FaChartLine,
  FaClipboardCheck,
} from "react-icons/fa";

// Field metadata for the credit risk model
const fieldMeta = [
  {
    key: "age",
    label: "Age (years)",
    help: "Applicant age in whole years.",
    type: "number",
    step: 1,
  },
  {
    key: "annual_income",
    label: "Annual Income",
    help: "Gross yearly income (numbers only, same currency as model).",
    type: "number",
    step: 2,
  },
  {
    key: "employment_years",
    label: "Years in Current Job",
    help: "Full years employed in current position.",
    type: "number",
    step: 2,
  },
  {
    key: "derogatory_marks",
    label: "Derogatory Marks",
    help: "Count of negative / derogatory credit report items (collections, liens, etc.).",
    type: "number",
    step: 2,
  },
  {
    key: "inquiries_last6m",
    label: "Credit Checks (6 mo)",
    help: "Number of hard credit inquiries in the last 6 months.",
    type: "number",
    step: 2,
  },
  {
    key: "inquiries_finance_24m",
    label: "Finance Inquiries (24 mo)",
    help: "Hard inquiries specifically for finance / loan products (24 months).",
    type: "number",
    step: 2,
  },
  {
    key: "total_accounts",
    label: "Total Credit Accounts",
    help: "Total number of credit accounts ever opened (closed + open).",
    type: "number",
    step: 2,
  },
  {
    key: "active_accounts",
    label: "Open Credit Accounts",
    help: "Number of currently open credit accounts (revolving + installment).",
    type: "number",
    step: 2,
  },
  {
    key: "high_credit_util_75",
    label: "Any Account Utilization ≥ 75%?",
    help: "Select Yes if ANY single revolving line is using 75% or more of its limit.",
    type: "boolean",
    step: 3,
  },
  {
    key: "util_50_plus",
    label: "Overall Utilization ≥ 50%?",
    help: "Yes if overall revolving balance / total revolving limit is ≥ 50%.",
    type: "boolean",
    step: 3,
  },
  {
    key: "balance_high_credit_pct",
    label: "Balance / Credit Limit %",
    help: "Average balance as a percent of high credit / limits (0–100).",
    type: "number",
    step: 3,
  },
  {
    key: "satisfied_pct",
    label: "% Accounts Satisfied",
    help: "Percent of accounts fully paid / satisfied (0–100).",
    type: "number",
    step: 3,
  },
  {
    key: "delinquency_30_60_24m",
    label: "30–60 Day Lates (24 mo)",
    help: "Count of 30–60 day delinquencies in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "delinquency_90d_24m",
    label: "90+ Day Lates (24 mo)",
    help: "Count of 90+ day delinquencies in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "delinquencies_60d",
    label: "All 60+ Day Lates (lifetime)",
    help: "Total historical 60+ day delinquencies (if model expects 24m, use that horizon).",
    type: "number",
    step: 3,
  },
  {
    key: "chargeoffs_last24m",
    label: "Charge-offs (24 mo)",
    help: "Number of accounts charged off in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "derog_or_bad_cnt",
    label: "Derog/Bad Accounts Count",
    help: "Total count of derogatory or bad status accounts (collections, charge-offs, etc.).",
    type: "number",
    step: 3,
  },
  {
    key: "accounts_open_last24m",
    label: "New Accounts Opened (24 mo)",
    help: "How many new credit accounts were opened in last 24 months.",
    type: "number",
    step: 3,
  },
  {
    key: "max_account_balance",
    label: "Largest Single Account Balance",
    help: "Highest current balance on any single account.",
    type: "number",
    step: 3,
  },
  {
    key: "total_balance",
    label: "Total Current Balance",
    help: "Sum of balances across all open accounts.",
    type: "number",
    step: 3,
  },
];

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(
    fieldMeta.reduce((acc, field) => {
      acc[field.key] = "";
      return acc;
    }, {})
  );
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const steps = [
    "Basic Info",
    "Financial Info",
    "Credit History",
    "Review & Submit",
  ];

  useEffect(() => {
    if (window.location.hash !== "#wizard") {
      window.location.hash = "wizard";
    }
  }, []);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function nextStep() {
    setCurrentStep((s) => Math.min(s + 1, 4));
  }

  function prevStep() {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    const payload = {};
    Object.keys(formData).forEach((k) => {
      const raw = formData[k];
      if (raw !== "") {
        if (raw === "yes") {
          payload[k] = 1;
        } else if (raw === "no") {
          payload[k] = 0;
        } else {
          const v = parseFloat(raw);
          if (!isNaN(v)) payload[k] = v;
          else payload[k] = raw;
        }
      }
    });

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";
      const res = await axios.post(`${base}/predict`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      setResult(res.data);
      setCurrentStep(4);
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  // Get fields for current step
  function getFieldsForStep(step) {
    return fieldMeta.filter(field => field.step === step);
  }

  // Decorative background blobs
  const Blobs = () => (
    <>
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-40 z-0" />
      <div className="pointer-events-none absolute top-1/2 right-0 w-80 h-80 bg-violet-200 rounded-full blur-2xl opacity-30 z-0" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-indigo-100 via-violet-100 to-white rounded-full blur-2xl opacity-30 z-0" />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-violet-100 text-slate-800 relative overflow-x-hidden">
      <Blobs />

      {/* Hero */}
      <section
        id="home"
        className="w-full border-b bg-gradient-to-b from-white via-violet-50 to-white relative z-10"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600 drop-shadow">
              Check your credit score instantly.
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-md">
              Our advanced AI analyzes your financial data to provide accurate
              credit risk assessment in minutes.
            </p>
            <div>
              <Link
                href="#wizard"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
              >
                Get Started <FaArrowRight />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] drop-shadow-xl">
              <Image
                src="/window.svg"
                alt="Hero"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wizard Section */}
      <section
        id="wizard"
        className="relative z-10 mx-auto max-w-6xl w-full px-4 py-12 space-y-6"
      >
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600 drop-shadow mb-2">
          Predict Your Credit Risk
        </h2>
        {/* Stepper */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-500 mb-4">
          {steps.map((label, idx) => (
            <div
              key={label}
              className="flex items-center gap-2 transition-all duration-300"
            >
              <div
                className={`size-8 grid place-items-center rounded-full border-2 shadow-md transition-all duration-300
                  ${
                    currentStep === idx + 1
                      ? "bg-gradient-to-br from-indigo-600 to-violet-500 text-white border-indigo-600 scale-110"
                      : "bg-white text-slate-600 border-slate-200"
                  }`}
              >
                {idx === 0 && <FaUser />}
                {idx === 1 && <FaMoneyBill />}
                {idx === 2 && <FaChartLine />}
                {idx === 3 && <FaClipboardCheck />}
              </div>
              <span
                className={`hidden sm:block font-semibold transition-colors duration-300 ${
                  currentStep === idx + 1 ? "text-indigo-700" : ""
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl border shadow-xl p-6 md:p-10 bg-white/70 backdrop-blur-lg transition-all duration-500 ring-1 ring-indigo-100">
          {currentStep === 1 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaUser className="text-indigo-500" /> Step 1: Basic Information
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                {getFieldsForStep(1).map((field) => (
                  <div key={field.key} className={field.key === 'age' ? "md:col-span-2" : ""}>
                    <label className="block text-xs mb-1 font-medium text-slate-700">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={formData[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      placeholder={field.label}
                    />
                    <span className="text-xs text-slate-500 mt-1 block">
                      {field.help}
                    </span>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
                  >
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaMoneyBill className="text-green-500" /> Step 2: Financial
                Information
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                {getFieldsForStep(2).map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs mb-1 font-medium text-slate-700">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={formData[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      placeholder={field.label}
                    />
                    <span className="text-xs text-slate-500 mt-1 block">
                      {field.help}
                    </span>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200"
                  >
                    <FaArrowLeft /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
                  >
                    Next Step <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaChartLine className="text-violet-500" /> Step 3: Credit History
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                onSubmit={handleSubmit}
              >
                {getFieldsForStep(3).map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs mb-1 font-medium text-slate-700">
                      {field.label}
                    </label>
                    {field.type === "boolean" ? (
                      <select
                        value={formData[field.key]}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={formData[field.key]}
                        onChange={(e) => updateField(field.key, e.target.value)}
                        className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        placeholder={field.label}
                      />
                    )}
                    <span className="text-xs text-slate-500 mt-1 block">
                      {field.help}
                    </span>
                  </div>
                ))}
                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200"
                  >
                    <FaArrowLeft /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-indigo-700 hover:to-violet-600 transition-all duration-200"
                  >
                    Review <FaArrowRight />
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 4 && (
            <>
              <h3 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center gap-2">
                <FaClipboardCheck className="text-violet-500" /> Step 4: Review &
                Submit
              </h3>
              
              {/* Show error if any */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 font-medium">Error: {error}</p>
                </div>
              )}
              
              {/* Show results if available */}
              {result && (
                <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">Prediction Result</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-600">Status:</span>
                      <span className="font-semibold">{result.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Prediction:</span>
                      <span className="font-semibold">{result.prediction}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Bad Risk Probability:</span>
                      <span className="font-semibold">{(result.probability_bad * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Good Risk Probability:</span>
                      <span className="font-semibold">{(result.probability_good * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Threshold:</span>
                      <span className="font-semibold">{result.threshold_used}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Model Version:</span>
                      <span className="font-semibold">{result.model_version}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {!result && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                  {fieldMeta.map((field) => (
                    <div
                      key={field.key}
                      className="flex items-center justify-between rounded border px-3 py-2 bg-white/80"
                    >
                      <span className="text-zinc-500">{field.label}</span>
                      <span className="font-medium text-zinc-900">
                        {formData[field.key] || "—"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
                >
                  <FaArrowLeft /> Back
                </button>
                {!result && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50"
                  >
                    <FaCheckCircle /> {loading ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Assessment Section - Original content preserved */}
      <section className="mx-auto max-w-6xl w-full px-4 pb-12 space-y-6 relative z-10">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600 drop-shadow mb-2">
          Your Credit Risk Assessment
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Score */}
          <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
            <h4 className="text-base font-semibold mb-4 text-indigo-700">
              Credit Score
            </h4>
            <div className="flex items-center gap-6">
              <div className="relative size-32">
                <svg viewBox="0 0 36 36" className="size-32">
                  <path
                    d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                    fill="#F3F4F6"
                  />
                  <path
                    d="M18 2 a 16 16 0 1 1 0 32"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeDasharray="75 100"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">780</div>
                    <div className="text-xs text-zinc-500">out of 900</div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-600">
                <div className="flex items-center gap-2 mb-2">
                  {["#ef4444", "#f59e0b", "#22c55e", "#16a34a"].map((c, i) => (
                    <div
                      key={i}
                      className="h-2 w-8 rounded"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="rounded bg-emerald-50 text-emerald-700 px-2 py-1 inline-block font-semibold">
                  Low Risk
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  Probability of default: 3%
                </div>
              </div>
            </div>
          </div>

          {/* Key Factors */}
          <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
            <h4 className="text-base font-semibold mb-4 text-indigo-700">
              Key Factors
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                {
                  label: "Consistent Income Pattern",
                  value: 92,
                },
                {
                  label: "Good Payment History",
                  value: 88,
                },
                {
                  label: "Healthy Bank Balance",
                  value: 75,
                },
                {
                  label: "Digital Payment Activity",
                  value: 82,
                },
                {
                  label: "Loan Amount to Income Ratio",
                  value: 35,
                  negative: true,
                },
              ].map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span
                    className={`size-6 grid place-items-center rounded-full ${
                      f.negative
                        ? "bg-rose-50 text-rose-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    ✓
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-700">{f.label}</span>
                      <span
                        className={`font-semibold ${
                          f.negative ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {f.value}%
                      </span>
                    </div>
                    <div className="h-2 rounded bg-zinc-100 mt-1">
                      <div
                        className={`h-2 rounded ${
                          f.negative ? "bg-rose-400" : "bg-emerald-500"
                        }`}
                        style={{ width: `${f.value}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Charts (simple mock) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
            <h4 className="text-base font-semibold mb-4 text-indigo-700">
              Factor Analysis
            </h4>
            <div className="space-y-3">
              {[
                {
                  k: "Income",
                  v: 34,
                },
                {
                  k: "Payment History",
                  v: 28,
                },
                {
                  k: "Bank Balance",
                  v: 22,
                },
                {
                  k: "Digital Activity",
                  v: 16,
                },
                {
                  k: "Credit Score",
                  v: 12,
                },
              ].map((b) => (
                <div key={b.k} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span>{b.k}</span>
                    <span className="text-zinc-500">{b.v}</span>
                  </div>
                  <div className="h-2 rounded bg-zinc-100">
                    <div
                      className="h-2 rounded bg-indigo-500"
                      style={{ width: `${(b.v / 34) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border shadow-xl p-8 bg-white/80 backdrop-blur-lg">
            <h4 className="text-base font-semibold mb-4 text-indigo-700">
              Risk Category Distribution
            </h4>
            <div className="flex items-center gap-6">
              <div className="relative size-32">
                <svg
                  viewBox="0 0 36 36"
                  className="size-32 rotate-90 -scale-x-100"
                >
                  <circle cx="18" cy="18" r="16" fill="#F3F4F6" />
                  <path
                    d="M18 2 a 16 16 0 0 1 0 32"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="4"
                    strokeDasharray="60 100"
                  />
                  <path
                    d="M18 2 a 16 16 0 0 1 0 32"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeDasharray="25 100"
                    strokeDashoffset="60"
                  />
                  <path
                    d="M18 2 a 16 16 0 0 1 0 32"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeDasharray="15 100"
                    strokeDashoffset="85"
                  />
                </svg>
              </div>
              <ul className="text-xs space-y-1">
                <li>
                  <span className="inline-block size-2 rounded-full bg-emerald-500 mr-2" />
                  Low Risk: 75%
                </li>
                <li>
                  <span className="inline-block size-2 rounded-full bg-amber-500 mr-2" />
                  Medium Risk: 20%
                </li>
                <li>
                  <span className="inline-block size-2 rounded-full bg-rose-500 mr-2" />
                  High Risk: 5%
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-zinc-950 text-zinc-300 relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-5 gap-8 text-sm">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 text-white">
              <div className="h-6 w-6 rounded-md bg-indigo-600 grid place-items-center text-xs font-bold">
                A
              </div>
              <span className="font-semibold">CreditSense</span>
            </div>
            <p className="text-zinc-400">
              Advanced credit risk assessment platform powered by AI and machine
              learning.
            </p>
          </div>
          <div>
            <div className="font-medium text-white mb-2">Resources</div>
            <ul className="space-y-1 text-zinc-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-white mb-2">Legal</div>
            <ul className="space-y-1 text-zinc-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-white mb-2">Connect</div>
            <div className="flex items-center gap-3 text-zinc-400">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-white transition-colors"
              >
                T
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                G
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-white transition-colors"
              >
                L
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 text-xs text-zinc-500">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <div>© 2025 CreditSense. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}