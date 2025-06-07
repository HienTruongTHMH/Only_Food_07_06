"use client";

import { MoveRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/CheeseCake.png",
    "/images/chocolate banana cake.png",
    "/images/donut 1.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex flex-col lg:flex-row items-center min-h-[350px] lg:h-[450px] overflow-hidden mt-8 shadow-lg">
      <div className="w-full lg:w-3/5 relative h-[250px] lg:h-full order-2 lg:order-1">
        <div className="relative w-full h-full">
          {images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Showcase Image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0} 
            />
          ))}
        </div>
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                index === currentImageIndex
                  ? "bg-white scale-125 shadow-md"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 order-1 lg:order-2 flex flex-col justify-center">
        <div className="flex flex-row items-center space-x-2 mb-4 lg:mb-6">
          <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-[#FF642F]" />
          <p className="text-sm sm:text-base font-medium text-gray-700">
            85% would make this again
          </p>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Mighty Super Cheesecake
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-600">
          Look no further for a creamy and ultra smooth classic cheesecake
          recipe! No one can deny its simple decadence.
        </p>
      </div>
    </div>
  );
}