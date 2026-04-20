import React from 'react';
import logoImg from 'C:/Users/sdeep/.gemini/antigravity/brain/c6321d27-dcaa-4c13-a1a5-51553099d550/media__1776669499405.jpg';

const Logo = ({ className = "h-24", showText = true }) => {
  return (
    <div className={`flex items-center ${className} group`}>
      <img 
        src={logoImg} 
        alt="Shnoor International Logo" 
        className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
      />
      {/* 
          The provided logo image already includes the full company name 
          "SHNOOR INTERNATIONAL LLC" in high quality. 
          No additional text is needed to prevent clutter.
      */}
    </div>
  );
};

export default Logo;
