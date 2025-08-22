"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    age: "",
    gender: "",
    location: "",
    // Step 2
    income: "",
    bankBalance: "",
    monthlyDebt: "",
    creditCards: "",
    // Step 3
    digitalActivityScore: "",
    utilityPayments: "",
    employmentYears: "",
  });

  const steps = [
    "Basic Info",
    "Financial Info",
    "Alternative Data",
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

  function handleSubmit(e) {
    e.preventDefault();
    setCurrentStep(4);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-[var(--brand-700)] text-white grid place-items-center text-xs font-bold shadow-sm">
              A
            </div>
            <span className="font-semibold">CreditSense</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:text-[var(--brand-700)]">
              Home
            </a>
            <a href="#about" className="hover:text-[var(--brand-700)]">
              About
            </a>
            <a href="#faq" className="hover:text-[var(--brand-700)]">
              FAQ
            </a>
            <a href="#contact" className="hover:text-[var(--brand-700)]">
              Contact
            </a>
          </nav>
          <Link
            href="#wizard"
            className="inline-flex items-center rounded-md bg-[var(--brand-700)] px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-[var(--brand-800)]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="w-full border-b bg-gradient-to-b from-white via-violet-50 to-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Check your credit score instantly.
            </h1>
            <p className="text-sm md:text-base text-slate-600 max-w-md">
              Our advanced AI analyzes your financial data to provide accurate
              credit risk assessment in minutes.
            </p>
            <div>
              <Link
                href="#wizard"
                className="inline-flex items-center rounded-md bg-[var(--brand-700)] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[var(--brand-800)]"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/3]">
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
        className="mx-auto max-w-6xl w-full px-4 py-12 space-y-6"
      >
        <h2 className="text-center text-lg md:text-xl font-semibold">
          Predict Your Credit Risk
        </h2>
        {/* Stepper */}
        <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
          {steps.map((label, idx) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`size-6 grid place-items-center rounded-full border shadow-sm ${
                  currentStep === idx + 1
                    ? "bg-[var(--brand-700)] text-white border-[var(--brand-700)]"
                    : "bg-white text-slate-600"
                }`}
              >
                {idx + 1}
              </div>
              <span className="hidden sm:block">{label}</span>
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-xl border shadow-md p-4 md:p-6 bg-white/80">
          {currentStep === 1 && (
            <>
              <h3 className="text-sm font-medium mb-4">
                Step 1: Basic Information
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div className="md:col-span-2">
                  <label className="block text-xs mb-1">Full Name</label>
                  <input
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Age</label>
                  <input
                    value={formData.age}
                    onChange={(e) => updateField("age", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    Gender (optional)
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => updateField("gender", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                  >
                    <option value="">Select gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs mb-1">Location</label>
                  <input
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="Select your location"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center rounded-md bg-[var(--brand-700)] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[var(--brand-800)]"
                  >
                    Next Step
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h3 className="text-sm font-medium mb-4">
                Step 2: Financial Information
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-xs mb-1">
                    Monthly Income ($)
                  </label>
                  <input
                    value={formData.income}
                    onChange={(e) => updateField("income", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="e.g., 3000"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    Current Bank Balance ($)
                  </label>
                  <input
                    value={formData.bankBalance}
                    onChange={(e) => updateField("bankBalance", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="e.g., 5200"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    Monthly Debt Payments ($)
                  </label>
                  <input
                    value={formData.monthlyDebt}
                    onChange={(e) => updateField("monthlyDebt", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="e.g., 400"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    Open Credit Cards
                  </label>
                  <input
                    value={formData.creditCards}
                    onChange={(e) => updateField("creditCards", e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="e.g., 2"
                    inputMode="numeric"
                  />
                </div>
                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center rounded-md bg-[var(--brand-700)] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[var(--brand-800)]"
                  >
                    Next Step
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h3 className="text-sm font-medium mb-4">
                Step 3: Alternative Data
              </h3>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-xs mb-1">
                    Digital Activity Score (0-100)
                  </label>
                  <input
                    value={formData.digitalActivityScore}
                    onChange={(e) =>
                      updateField("digitalActivityScore", e.target.value)
                    }
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="e.g., 80"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    On-time Utility Payments (months)
                  </label>
                  <input
                    value={formData.utilityPayments}
                    onChange={(e) =>
                      updateField("utilityPayments", e.target.value)
                    }
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-600)]"
                    placeholder="e.g., 12"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    Employment Duration (years)
                  </label>
                  <input
                    value={formData.employmentYears}
                    onChange={(e) =>
                      updateField("employmentYears", e.target.value)
                    }
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 3"
                    inputMode="numeric"
                  />
                </div>
                <div className="md:col-span-2 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center rounded-md bg-[var(--brand-700)] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[var(--brand-800)]"
                  >
                    Review
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 4 && (
            <>
              <h3 className="text-sm font-medium mb-4">
                Step 4: Review & Submit
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {Object.entries({
                  "Full Name": formData.fullName,
                  Age: formData.age,
                  Gender: formData.gender,
                  Location: formData.location,
                  "Monthly Income": formData.income,
                  "Bank Balance": formData.bankBalance,
                  "Monthly Debt": formData.monthlyDebt,
                  "Open Credit Cards": formData.creditCards,
                  "Digital Activity Score": formData.digitalActivityScore,
                  "Utility Payments": formData.utilityPayments,
                  "Employment Years": formData.employmentYears,
                }).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between rounded border px-3 py-2"
                  >
                    <span className="text-zinc-500">{k}</span>
                    <span className="font-medium text-zinc-900">
                      {v || "—"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => alert("Submitted! (demo)")}
                  className="inline-flex items-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white shadow hover:brightness-95"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Assessment Section */}
      <section className="mx-auto max-w-6xl w-full px-4 pb-12 space-y-6">
        <h2 className="text-center text-lg md:text-xl font-semibold">
          Your Credit Risk Assessment
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Score */}
          <div className="rounded-lg border shadow-sm p-6">
            <h4 className="text-sm font-medium mb-4">Credit Score</h4>
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
                    <div className="text-3xl font-bold">780</div>
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
                <div className="rounded bg-emerald-50 text-emerald-700 px-2 py-1 inline-block">
                  Low Risk
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  Probability of default: 3%
                </div>
              </div>
            </div>
          </div>

          {/* Key Factors */}
          <div className="rounded-lg border shadow-sm p-6">
            <h4 className="text-sm font-medium mb-4">Key Factors</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Consistent Income Pattern", value: 92 },
                { label: "Good Payment History", value: 88 },
                { label: "Healthy Bank Balance", value: 75 },
                { label: "Digital Payment Activity", value: 82 },
                {
                  label: "Loan Amount to Income Ratio",
                  value: 35,
                  negative: true,
                },
              ].map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <span className="size-6 grid place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-700">{f.label}</span>
                      <span
                        className={`${
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
          <div className="rounded-lg border shadow-sm p-6">
            <h4 className="text-sm font-medium mb-4">Factor Analysis</h4>
            <div className="space-y-3">
              {[
                { k: "Income", v: 34 },
                { k: "Payment History", v: 28 },
                { k: "Bank Balance", v: 22 },
                { k: "Digital Activity", v: 16 },
                { k: "Credit Score", v: 12 },
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
          <div className="rounded-lg border shadow-sm p-6">
            <h4 className="text-sm font-medium mb-4">
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
      <footer className="mt-auto border-t bg-zinc-950 text-zinc-300">
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
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-white mb-2">Legal</div>
            <ul className="space-y-1 text-zinc-400">
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-white mb-2">Connect</div>
            <div className="flex items-center gap-3 text-zinc-400">
              <a href="#" aria-label="Twitter" className="hover:text-white">
                T
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-white">
                G
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white">
                L
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 text-xs text-zinc-500">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <div>© 2025 CreditSense. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
              <a href="#" className="hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
