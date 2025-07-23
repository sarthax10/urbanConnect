// src/pages/AboutUs.jsx

import React from 'react';

const AboutUs = () => (
  <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-20 px-4">
    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-center">
      About UrbanConnect
    </h1>
    
    <p className="max-w-2xl text-center text-lg md:text-xl text-white mb-12 opacity-80">
      UrbanConnect redefines home and lifestyle services with simplicity, reliability, and trust. We connect you to verified professionals for all your daily needs—seamlessly and safely.
    </p>

    <section className="w-full max-w-3xl flex flex-col md:flex-row gap-8 mb-12">
      {/* What We Do */}
      <div className="group flex-1 bg-black border border-white rounded-2xl p-8 flex flex-col shadow-none transition-colors duration-200 hover:bg-white hover:text-black">
        <h2 className="text-white text-2xl font-semibold mb-4 text-left group-hover:text-black transition-colors duration-200">
          What We Do
        </h2>
        <ul className="space-y-3 list-none pl-0">
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>Home repair and maintenance</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>Deep cleaning &amp; sanitization</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>Wellness &amp; grooming at home</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>Instant booking &amp; clear pricing</span>
          </li>
        </ul>
      </div>

      {/* Our Values */}
      <div className="group flex-1 bg-black border border-white rounded-2xl p-8 flex flex-col shadow-none transition-colors duration-200 hover:bg-white hover:text-black">
        <h2 className="text-white text-2xl font-semibold mb-4 text-left group-hover:text-black transition-colors duration-200">
          Our Values
        </h2>
        <ul className="space-y-3 list-none pl-0">
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>Honesty and transparency</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>User-first simplicity</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>Top-rated, verified experts only</span>
          </li>
          <li className="flex gap-2 items-start">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/75 group-hover:bg-black/70 transition-colors duration-200" />
            <span>Empowering local professionals</span>
          </li>
        </ul>
      </div>
    </section>

    <section className="group w-full max-w-2xl bg-black border border-white rounded-2xl p-8 mb-10 transition-colors duration-200 hover:bg-white hover:text-black">
      <h2 className="text-xl font-semibold mb-3 group-hover:text-black transition-colors duration-200">Our Story</h2>
      <p className="text-white opacity-80 mb-2 group-hover:text-black group-hover:opacity-90 transition-colors duration-200">
        Founded by technologists and service specialists, UrbanConnect bridges the gap between busy lives and reliable solutions. We're building a safer, easier, more transparent experience for every home and every professional.
      </p>
    </section>

    

    <p className="text-xs text-white/50 mt-8">
      &copy; {new Date().getFullYear()} UrbanConnect. All rights reserved.
    </p>
  </div>
);

export default AboutUs;
