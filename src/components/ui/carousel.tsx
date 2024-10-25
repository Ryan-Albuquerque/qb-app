// src/components/CardCarousel.tsx
"use client";

import React, { useState } from "react";

const slides = [
  {
    id: 0,
    src: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    alt: "First slide",
  },
  {
    id: 1,
    src: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    alt: "Second slide",
  },
  {
    id: 2,
    src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    alt: "Third slide",
  },
];

export const CardCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item h-[300px] lg:h-[300px] flex-shrink-0 w-full transition-transform duration-700 ease-in-out ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-[300px] lg:h-[300px]"
            />
          </div>
        ))}
      </div>

      <ol className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <li
            key={index}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </ol>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ❯
      </button>
    </div>
  );
};
