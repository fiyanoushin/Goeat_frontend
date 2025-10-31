import React, { useState, useEffect } from "react";
import slide1 from "../assets/372.jpg";
import slide2 from "../assets/172.jpg";
import slide3 from "../assets/864.jpg";
import { useNavigate } from "react-router-dom";

const images = [slide1, slide2, slide3];

const Slide = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[70vh] overflow-hidden group">
      {/* Images with enhanced transitions */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 ${
            index === current 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={img}
            alt={`slide-${index}`}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
      ))}

      {/* Overlay Content - Enhanced */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <div className="space-y-6">
            {/* Animated heading */}
            <h2 
              className="text-5xl md:text-7xl font-black mb-6 animate-fade-in"
              style={{
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                animation: "fadeInUp 0.8s ease-out"
              }}
            >
              <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-orange-300 bg-clip-text text-transparent">
                Delicious Desserts
              </span>
              <br />
              <span className="text-white">
                Await!
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/90 font-light mb-8 drop-shadow-lg">
              Indulge in sweetness, one bite at a time
            </p>

            {/* Enhanced button */}
            <button
              onClick={() => navigate("/menu")}
              className="group/btn relative bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-pink-500/50 overflow-hidden transform transition-all duration-300 hover:scale-110 hover:shadow-pink-500/70"
            >
              <span className="relative z-10 flex items-center gap-3">
                Shop Now
                <svg 
                  className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current
                ? "w-12 h-3 bg-white shadow-lg"
                : "w-3 h-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows - visible on hover */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Slide;