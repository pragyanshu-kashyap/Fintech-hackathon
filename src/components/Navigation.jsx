import React from 'react'
import Link from "next/link";
import Image from "next/image";

export default function Navigation({
    logoImage=null,
}) {
  return (
    <>
    {/* Navigation */}

    
      <nav className="flex items-center justify-between px-6 lg:px-12 py-6 relative z-20 backdrop-blur-md bg-white/5 rounded-2xl shadow-lg border border-white/10">
        <div className="flex items-center space-x-2 group">
          {logoImage ? (
            <div className="w-8 h-8 relative">
              <Image
                src="/credit_logo.png"
                alt="KCredit Check Logo"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-6 h-6 bg-lime-400 rounded-sm"></div>
          )}
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 via-purple-400 to-white bg-clip-text text-transparent group-hover:scale-105 transition-transform">
            CreditSense
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-lime-400 transition-colors hover:scale-105">
            <Link href="/" >Home</Link>
          </div>

          <span className="cursor-pointer hover:text-lime-400 transition-colors hover:scale-105">
            <Link href="/getstarted">Get Started</Link>
          </span>

          <span className="cursor-pointer hover:text-lime-400 transition-colors hover:scale-105">
            <Link href="/blogs">Blogs</Link>
          </span>

          <span className="cursor-pointer hover:text-lime-400 transition-colors hover:scale-105">
            <Link href="/contact">Contact Us</Link>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="cursor-pointer hover:text-lime-400 transition-colors hover:scale-105">
            Log in
          </span>
          <button className="px-6 py-2 border-2 border-lime-400 rounded-full bg-gradient-to-r from-purple-700 via-purple-900 to-lime-400 text-white font-bold shadow-lg hover:from-lime-400 hover:to-purple-700 hover:text-black transition-all duration-300 hover:scale-105">
            Registration
          </button>
        </div>
      </nav>
    </>
  )
}
