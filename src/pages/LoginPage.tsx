import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const [code, setCode] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    if (code.trim()) {
      navigate('/dashboard');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
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
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        {/* Back to Home Link */}
        <div className="absolute top-8 left-8">
          <button 
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white transition-colors duration-300 flex items-center space-x-2 text-sm"
          >
            <span>←</span>
            <span>Back to Mission</span>
          </button>
        </div>

        {/* Login Card */}
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <Card className="w-[400px] bg-black/20 backdrop-blur-lg border border-orange-500/30 shadow-2xl shadow-orange-500/10">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent mb-2">
                Mission Access
              </CardTitle>
              <CardDescription className="text-white/80 text-base">
                Enter your authorization code to access the Mars Mission Dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input 
                    id="code" 
                    type="password"
                    placeholder="Enter authorization code" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/50 h-12 text-lg focus:border-orange-500/50 focus:ring-orange-500/50 transition-all duration-300"
                  />
                </div>
                
                <Button 
                  onClick={handleLogin} 
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-semibold text-lg rounded-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!code.trim()}
                >
                  {code.trim() ? 'Access Mission Control' : 'Enter Code'}
                </Button>
              </div>

              {/* Additional info */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm text-center">
                  Authorized personnel only
                </p>
                <div className="flex justify-center mt-3 space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}} />
        <div className="absolute top-1/3 right-16 w-1 h-1 bg-red-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '2s'}} />
      </div>
    </div>
  );
};

export default LoginPage;