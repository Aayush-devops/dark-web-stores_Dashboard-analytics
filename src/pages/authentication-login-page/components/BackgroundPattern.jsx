// src/pages/authentication-login-page/components/BackgroundPattern.jsx
import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700" />
      
      {/* Abstract Geometric Shapes */}
      <div className="absolute inset-0">
        {/* Large Circle - Top Right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-orange-400/30 to-transparent" />
        
        {/* Medium Circle - Bottom Left */}
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-600/40 to-transparent" />
        
        {/* Small Circles - Scattered */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-bl from-orange-300/20 to-transparent" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-gradient-to-tl from-amber-500/25 to-transparent" />
        
        {/* Floating Rectangles */}
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rotate-45 bg-gradient-to-br from-orange-400/15 to-transparent" />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 rotate-12 bg-gradient-to-tr from-amber-600/20 to-transparent" />
        
        {/* Organic Blob Shapes */}
        <div className="absolute top-1/2 right-1/5 w-40 h-32">
          <div className="w-full h-full bg-gradient-to-r from-orange-500/10 to-amber-600/15 rounded-[40px] transform rotate-12" />
        </div>
        
        <div className="absolute bottom-1/5 left-1/5 w-36 h-28">
          <div className="w-full h-full bg-gradient-to-l from-amber-700/15 to-orange-400/10 rounded-[30px] transform -rotate-6" />
        </div>
      </div>
      
      {/* Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
      
      {/* Depth Enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10" />
    </div>
  );
};

export default BackgroundPattern;