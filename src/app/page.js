"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Shield, Users } from "lucide-react";
import Image from "next/image";

export default function ScardLandingPage({
  // Logo and Brand Images
  // ,

  // Mobile App Screenshots
  mobileAppScreenshot = "/hand_phone.jpg",

  // Credit Card Images
  primaryCardImage = "/background_image.jpg",
  secondaryCardImage = "/caption_image.jpg",

  // Background Images
  backgroundImage = null,

  // Icon Images (optional - will fallback to Lucide icons)
  securityIcon = null,
  networkIcon = null,

  // Decorative Images
  sparkleIcon = null,
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white relative overflow-x-hidden overflow-hidden">
      {/* Background Image or Gradients */}
      {backgroundImage ? (
        <div className="absolute inset-0 opacity-40">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover blur-sm scale-105"
            priority
          />
        </div>
      ) : (
        <>
          <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-radial from-purple-800/40 via-purple-900/10 to-transparent opacity-60 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-lime-400/30 via-lime-400/10 to-transparent opacity-40 animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-white/5 via-purple-400/10 to-transparent opacity-20 blur-2xl"></div>
        </>
      )}

      {/* HERO SECTION: Main Content Container + CTA Buttons */}
      <div className="relative px-6 lg:px-12 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
                  Credit Risk Scoring System:{" "}
                  <span className="bg-gradient-to-r from-lime-400 via-purple-400 to-white bg-clip-text text-transparent">
                    An End-to-End ML Project
                  </span>
                </h1>
                <p className="text-gray-200 text-xl lg:text-2xl leading-relaxed max-w-xl font-medium bg-white/5 rounded-xl px-4 py-3 shadow-lg backdrop-blur-md animate-fade-in">
                  A machine learning–powered solution using{" "}
                  <span className="text-lime-400 font-bold">
                    Logistic Regression
                  </span>{" "}
                  to classify &quot;good&quot; vs. &quot;bad&quot; credit,
                  deployed with{" "}
                  <span className="text-purple-400 font-bold">FastAPI</span> and{" "}
                  <span className="text-lime-400 font-bold">Next.js</span>.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="group bg-gradient-to-r from-lime-400 via-purple-500 to-purple-900 px-8 py-3 rounded-full text-black font-extrabold flex items-center space-x-3 shadow-2xl hover:from-purple-700 hover:to-lime-400 hover:text-white transition-all duration-300 transform hover:scale-110 animate-glow"
                  onClick={() => router.push("/getstarted")}
                >
                  <span className="text-lg">Try the Live Demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                  className="group bg-gradient-to-r from-purple-700 via-purple-900 to-lime-400 px-8 py-3 rounded-full text-white font-extrabold flex items-center space-x-3 shadow-2xl hover:from-lime-400 hover:to-purple-700 hover:text-black transition-all duration-300 transform hover:scale-110 animate-glow"
                  onClick={() => router.push("/getcredit")}
                >
                  <span className="text-lg">Get Your Credit Score</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                <button
                  className="group bg-gradient-to-r from-lime-400 via-purple-400 to-purple-900 px-8 py-3 rounded-full text-black font-extrabold flex items-center space-x-3 shadow-2xl hover:from-purple-700 hover:to-lime-400 hover:text-white transition-all duration-300 transform hover:scale-110 animate-glow"
                  onClick={() => router.push("/explore-api")}
                >
                  <span className="text-lg">Explore the API</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Content - Mobile Mockups and Cards (unchanged) */}
            <div className="relative lg:block">
              {/* Sparkle Decoration */}
              <div className="absolute -top-10 -right-6 z-20 animate-spin-slow">
                {sparkleIcon ? (
                  <div className="w-10 h-10 relative">
                    <Image
                      src={sparkleIcon}
                      alt="Decoration"
                      fill
                      className="object-contain animate-pulse"
                    />
                  </div>
                ) : (
                  <div className="text-lime-400 text-5xl transform rotate-12 animate-pulse drop-shadow-lg">
                    ✦
                  </div>
                )}
              </div>

              {/* 🔥 INSERT YOUR CUSTOM MOBILE IMAGE HERE 🔥 */}
              <div
                className="relative mx-auto backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-300"
                style={{ width: "320px", height: "640px" }}
              >
                {/* ========================================= */}
                {/* 📱 REPLACE THIS WITH YOUR MOBILE IMAGE 📱 */}
                {/* ========================================= */}
                {mobileAppScreenshot ? (
                  /* YOUR CUSTOM MOBILE APP/PHONE IMAGE GOES HERE */
                  <div className="absolute inset-0 shadow-2xl rounded-3xl animate-fade-in">
                    <Image
                      src={mobileAppScreenshot}
                      alt="Your Mobile App Screenshot"
                      fill
                      className="object-contain drop-shadow-2xl rounded-3xl"
                      priority
                    />
                  </div>
                ) : (
                  /* DEFAULT PLACEHOLDER  */
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-gray-600 animate-pulse">
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-4">📱</div>
                      <p className="text-sm">Your Mobile Image</p>
                      <p className="text-xs">Will Appear Here</p>
                    </div>
                  </div>
                )}

                {/* Primary Credit Card */}
                {primaryCardImage ? (
                  <div
                    className="absolute w-72 h-44 rounded-2xl shadow-2xl transform rotate-12 z-30 overflow-hidden animate-float"
                    style={{
                      bottom: "-80px",
                      left: "-60px",
                    }}
                  >
                    <Image
                      src={primaryCardImage}
                      alt="Primary Credit Card"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  /* Default primary card design */
                  <div
                    className="absolute w-72 h-44 rounded-2xl shadow-2xl transform rotate-12 z-30 animate-float"
                    style={{
                      background:
                        "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #84CC16 100%)",
                      bottom: "-80px",
                      left: "-60px",
                    }}
                  >
                    <div className="p-6 h-full flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <div className="text-2xl font-mono tracking-wider">
                          1234 5
                        </div>
                        <div className="w-8 h-6 bg-white/20 rounded flex items-center justify-center">
                          <div className="text-xs">📶</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/90 text-sm font-medium">
                            NICK OHMY
                          </p>
                          <p className="text-white/80 text-sm">05/</p>
                        </div>
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                          <div className="w-8 h-8 bg-white/30 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Secondary/Background Card */}
                {secondaryCardImage ? (
                  <div
                    className="absolute w-64 h-40 rounded-2xl transform -rotate-12 z-10 overflow-hidden animate-float-reverse"
                    style={{
                      top: "-60px",
                      right: "-80px",
                    }}
                  >
                    <Image
                      src={secondaryCardImage}
                      alt="Secondary Credit Card"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  /* Default secondary card design */
                  <div
                    className="absolute w-64 h-40 rounded-2xl transform -rotate-12 z-10 animate-float-reverse"
                    style={{
                      background:
                        "linear-gradient(135deg, #84CC16 0%, #EAB308 100%)",
                      top: "-60px",
                      right: "-80px",
                    }}
                  >
                    <div className="p-6 flex justify-end">
                      <div className="text-black text-2xl font-mono">0000</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTIONS BELOW HERO */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-12">
        {/* Architecture Section */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6">
              <Image
                src="/globe.svg"
                alt="Architecture"
                width={24}
                height={24}
              />
            </span>
            Project Architecture
          </h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 shadow-md">
              <span className="inline-block w-6 h-6">
                <Image src="/file.svg" alt="Backend" width={24} height={24} />
              </span>
              <div>
                <span className="font-semibold text-lime-400">Backend:</span>{" "}
                FastAPI REST API serving <code>/predict</code> endpoint and
                model artifacts.
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 shadow-md">
              <span className="inline-block w-6 h-6">
                <Image
                  src="/window.svg"
                  alt="Frontend"
                  width={24}
                  height={24}
                />
              </span>
              <div>
                <span className="font-semibold text-purple-400">Frontend:</span>{" "}
                Next.js form interface for API interaction.
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 shadow-md">
              <span className="inline-block w-6 h-6">
                <Image
                  src="/caption_image.jpg"
                  alt="Model"
                  width={24}
                  height={24}
                />
              </span>
              <div>
                <span className="font-semibold text-lime-400">Model:</span>{" "}
                Logistic Regression for good vs. bad credit classification.
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6">
              <Shield className="w-6 h-6 text-lime-400" />
            </span>
            Key Features
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Automated data cleaning and missing value imputation</li>
            <li>Scalable, production-ready artifact loading and serving</li>
            {/* <li>
              Demo setup via <code>create_synthetic_artifacts.py</code>{" "}
              for easy testing
            </li> */}
          </ul>
        </div>

        {/* Tech Stack Section */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-6">
              <Image src="/next.svg" alt="Tech Stack" width={24} height={24} />
            </span>
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/file.svg" alt="FastAPI" width={20} height={20} />{" "}
              FastAPI
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/file.svg" alt="Python" width={20} height={20} />{" "}
              Python
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image
                src="/file.svg"
                alt="scikit-learn"
                width={20}
                height={20}
              />{" "}
              scikit-learn
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/next.svg" alt="Next.js" width={20} height={20} />{" "}
              Next.js
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/vercel.svg" alt="React" width={20} height={20} />{" "}
              React
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image
                src="/globe.svg"
                alt="Tailwind CSS"
                width={20}
                height={20}
              />{" "}
              Tailwind CSS
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/window.svg" alt="Uvicorn" width={20} height={20} />{" "}
              Uvicorn
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 rounded px-3 py-1 text-base font-semibold">
              <Image src="/window.svg" alt="npm" width={20} height={20} /> npm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Animations (add to your global CSS or Tailwind config)
/*
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px 5px #a3e63544, 0 0 40px 10px #a78bfa33; }
  50% { box-shadow: 0 0 40px 10px #a3e63599, 0 0 80px 20px #a78bfa66; }
}
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-16px) rotate(12deg); }
}
@keyframes float-reverse {
  0%, 100% { transform: translateY(0) rotate(-12deg); }
  50% { transform: translateY(16px) rotate(-12deg); }
}
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
*/
