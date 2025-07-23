import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import "../style/HeroSection.css" // for the custom keyframe/FloatingShape animation

const floatingShapes = [0, 1, 2, 3, 4];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Floating Shapes */}
      <ul className="floating-shapes pointer-events-none absolute inset-0 z-0">
        {floatingShapes.map((i) => (
          <li key={i} className={`shape shape-${i + 1}`}></li>
        ))}
      </ul>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-white text-4xl sm:text-6xl font-extrabold tracking-tight animate-fade-in-up">
          Urban <span className="text-gray-400">Connect</span>
        </h1>
        <p className="text-gray-200 text-lg sm:text-2xl max-w-2xl mt-4 mb-9 animate-fade-in">
          Efficient service management. Trusted professionals. Elevating every step of your experience.
        </p>
        <Button
          size="large"
          className="px-8 py-2 bg-white text-black border-none rounded-lg shadow-lg font-semibold hover:scale-105 hover:bg-gray-100 transition duration-300 flex items-center group animate-btn-fade-in"
        >
          Get Started
          <ArrowRightOutlined className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
}
