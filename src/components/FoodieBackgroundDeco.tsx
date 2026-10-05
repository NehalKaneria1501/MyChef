'use client';

import React from 'react';

// Colorful leaves and foodie icons with distinct positions, sizes, animations, and rotations
const FOODIE_ELEMENTS = [
  // Left Gutter (Top to Bottom across viewport)
  {
    type: 'emoji',
    char: '🌿',
    title: 'Fresh Coriander Herb',
    className: 'top-[3%] left-2 sm:left-5 text-2xl sm:text-3xl animate-leaf-float opacity-75 rotate-[-12deg]',
    style: { animationDelay: '0s', animationDuration: '6s' },
  },
  {
    type: 'emoji',
    char: '🍲',
    title: 'Hot Homestyle Curry',
    className: 'top-[13%] left-3 sm:left-12 text-xl sm:text-2xl animate-emoji-pulse opacity-70 rotate-[8deg]',
    style: { animationDelay: '1.2s', animationDuration: '5.5s' },
  },
  {
    type: 'leaf-svg',
    color: 'emerald',
    className: 'top-[24%] left-1 sm:left-6 w-8 h-8 sm:w-10 sm:h-10 animate-leaf-reverse opacity-70 rotate-[25deg]',
    style: { animationDelay: '0.8s', animationDuration: '7s' },
  },
  {
    type: 'emoji',
    char: '🥑',
    title: 'Fresh Avocado',
    className: 'top-[36%] left-3 sm:left-10 text-lg sm:text-xl animate-leaf-float opacity-65 rotate-[-15deg]',
    style: { animationDelay: '2.5s', animationDuration: '6.5s' },
  },
  {
    type: 'emoji',
    char: '🍃',
    title: 'Mint Leaf',
    className: 'top-[48%] left-2 sm:left-5 text-2xl sm:text-3xl animate-leaf-reverse opacity-80 rotate-[-20deg]',
    style: { animationDelay: '1.8s', animationDuration: '8s' },
  },
  {
    type: 'emoji',
    char: '🍱',
    title: 'Traditional Tiffin Box',
    className: 'top-[59%] left-4 sm:left-12 text-xl sm:text-2xl animate-emoji-pulse opacity-70 rotate-[10deg]',
    style: { animationDelay: '0.5s', animationDuration: '6s' },
  },
  {
    type: 'leaf-svg',
    color: 'amber',
    className: 'top-[70%] left-1 sm:left-6 w-7 h-7 sm:w-9 sm:h-9 animate-leaf-float opacity-70 rotate-[45deg]',
    style: { animationDelay: '3s', animationDuration: '7.5s' },
  },
  {
    type: 'emoji',
    char: '🍅',
    title: 'Ripe Tomato',
    className: 'top-[81%] left-3 sm:left-11 text-lg sm:text-xl animate-leaf-reverse opacity-65 rotate-[-10deg]',
    style: { animationDelay: '2.1s', animationDuration: '5.8s' },
  },
  {
    type: 'emoji',
    char: '🌱',
    title: 'Spring Sprout',
    className: 'top-[92%] left-2 sm:left-5 text-xl sm:text-2xl animate-leaf-float opacity-75 rotate-[15deg]',
    style: { animationDelay: '1s', animationDuration: '6.2s' },
  },

  // Right Gutter (Top to Bottom across viewport)
  {
    type: 'emoji',
    char: '🍃',
    title: 'Fresh Basil Leaf',
    className: 'top-[4%] right-2 sm:right-6 text-2xl sm:text-3xl animate-leaf-reverse opacity-80 rotate-[18deg]',
    style: { animationDelay: '0.4s', animationDuration: '6.8s' },
  },
  {
    type: 'emoji',
    char: '🥗',
    title: 'Wholesome Green Salad',
    className: 'top-[14%] right-4 sm:right-13 text-xl sm:text-2xl animate-emoji-pulse opacity-70 rotate-[-12deg]',
    style: { animationDelay: '2s', animationDuration: '5.2s' },
  },
  {
    type: 'leaf-svg',
    color: 'orange',
    className: 'top-[26%] right-1 sm:right-7 w-8 h-8 sm:w-10 sm:h-10 animate-leaf-float opacity-70 rotate-[-30deg]',
    style: { animationDelay: '1.5s', animationDuration: '7.2s' },
  },
  {
    type: 'emoji',
    char: '🌶️',
    title: 'Desi Spice Chili',
    className: 'top-[37%] right-3 sm:right-11 text-lg sm:text-xl animate-leaf-reverse opacity-70 rotate-[22deg]',
    style: { animationDelay: '3.2s', animationDuration: '6s' },
  },
  {
    type: 'emoji',
    char: '🌿',
    title: 'Curry Leaf Sprig',
    className: 'top-[49%] right-2 sm:right-5 text-2xl sm:text-3xl animate-leaf-float opacity-75 rotate-[-15deg]',
    style: { animationDelay: '0.9s', animationDuration: '7.8s' },
  },
  {
    type: 'emoji',
    char: '🥘',
    title: 'Clay Pot Kadai',
    className: 'top-[60%] right-4 sm:right-12 text-xl sm:text-2xl animate-emoji-pulse opacity-70 rotate-[8deg]',
    style: { animationDelay: '2.4s', animationDuration: '6.4s' },
  },
  {
    type: 'leaf-svg',
    color: 'emerald',
    className: 'top-[71%] right-1 sm:right-7 w-7 h-7 sm:w-9 sm:h-9 animate-leaf-reverse opacity-70 rotate-[35deg]',
    style: { animationDelay: '1.2s', animationDuration: '7s' },
  },
  {
    type: 'emoji',
    char: '🍋',
    title: 'Juicy Yellow Lemon',
    className: 'top-[82%] right-3 sm:right-10 text-lg sm:text-xl animate-leaf-float opacity-65 rotate-[-8deg]',
    style: { animationDelay: '2.8s', animationDuration: '5.5s' },
  },
  {
    type: 'emoji',
    char: '🫓',
    title: 'Phulka Roti',
    className: 'top-[91%] right-2 sm:right-6 text-xl sm:text-2xl animate-emoji-pulse opacity-70 rotate-[14deg]',
    style: { animationDelay: '0.7s', animationDuration: '6.7s' },
  },
  {
    type: 'leaf-svg',
    color: 'teal',
    className: 'top-[96%] left-6 sm:left-16 w-7 h-7 sm:w-9 sm:h-9 animate-leaf-float opacity-60 rotate-[-25deg]',
    style: { animationDelay: '1.6s', animationDuration: '8s' },
  },
  {
    type: 'emoji',
    char: '🍛',
    title: 'Steaming Dal & Rice Thali',
    className: 'top-[96%] right-6 sm:right-16 text-xl sm:text-2xl animate-leaf-reverse opacity-70 rotate-[12deg]',
    style: { animationDelay: '2.2s', animationDuration: '7s' },
  }
];

export default function FoodieBackgroundDeco() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {FOODIE_ELEMENTS.map((item, index) => {
        if (item.type === 'emoji') {
          return (
            <span
              key={index}
              title={item.title}
              style={item.style}
              className={`absolute transition-transform duration-700 drop-shadow-xs filter ${item.className}`}
            >
              {item.char}
            </span>
          );
        }

        // Stylized vector colorful culinary leaves
        const isEmerald = item.color === 'emerald';
        const isAmber = item.color === 'amber';
        const isOrange = item.color === 'orange';

        const strokeColor = isEmerald
          ? '#059669'
          : isAmber
          ? '#d97706'
          : isOrange
          ? '#ea580c'
          : '#0d9488';

        const fillGradientId = `leafGrad-${index}`;

        return (
          <div
            key={index}
            style={item.style}
            className={`absolute transition-transform duration-700 filter drop-shadow-xs ${item.className}`}
          >
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <linearGradient id={fillGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  {isEmerald && (
                    <>
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
                    </>
                  )}
                  {isAmber && (
                    <>
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0.85" />
                    </>
                  )}
                  {isOrange && (
                    <>
                      <stop offset="0%" stopColor="#fb923c" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#ea580c" stopOpacity="0.85" />
                    </>
                  )}
                  {!isEmerald && !isAmber && !isOrange && (
                    <>
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.85" />
                    </>
                  )}
                </linearGradient>
              </defs>
              {/* Organic curved leaf shape */}
              <path
                d="M6 34 C6 34, 10 14, 34 6 C34 6, 28 28, 6 34 Z"
                fill={`url(#${fillGradientId})`}
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Leaf central vein & rib veins */}
              <path
                d="M6 34 Q 18 22 34 6"
                stroke={strokeColor}
                strokeWidth="1"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
              <path
                d="M16 23 Q 22 20 25 14"
                stroke={strokeColor}
                strokeWidth="0.8"
                strokeOpacity="0.6"
                strokeLinecap="round"
              />
              <path
                d="M12 28 Q 17 27 20 22"
                stroke={strokeColor}
                strokeWidth="0.8"
                strokeOpacity="0.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
