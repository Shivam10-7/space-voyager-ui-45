import React, { useState, useEffect } from 'react';

const MarsLandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://github.com/rutviktayde/IMG-s-for-Web-App/blob/main/Satelite%20Background.png?raw=true')"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-orange-900/30 to-red-900/50" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        
        {/* Logo/Title */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-6 animate-pulse">
            MARS
          </h1>
          <div className="text-2xl md:text-3xl text-white/90 font-light tracking-wider mb-2">
            MISSION
          </div>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-xl md:text-2xl text-white/80 mb-8 font-light">
            Explore the Red Planet
          </p>
        </div>

        {/* Description */}
        <div className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-12 font-light">
            Embark on humanity's greatest adventure. Join our mission to explore Mars, 
            discover new frontiers, and unlock the mysteries of the Red Planet. 
            The future of space exploration starts here.
          </p>
        </div>

        {/* CTA Button */}
        <div className={`transition-all duration-1000 delay-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <button
            onClick={handleLoginClick}
            className="group relative px-12 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xl font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 active:scale-95"
          >
            <span className="relative z-10">Begin Mission</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          </button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}} />
        <div className="absolute top-1/3 right-16 w-1 h-1 bg-red-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '2s'}} />
        
        {/* Subtitle at bottom */}
        <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Next Generation Space Technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarsLandingPage;