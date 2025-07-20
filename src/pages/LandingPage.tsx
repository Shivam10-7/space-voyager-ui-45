import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import spaceBackground from "@/assets/satellite-background.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/login'); // Assuming /login is your login route
  };

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed bg-no-repeat flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${spaceBackground})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for better text visibility */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">Space Voyager</h1>
        <p className="text-xl md:text-2xl mb-8">Embark on an interstellar journey</p>
        <Button 
          size="lg" 
          className="bg-space-cyan text-white hover:bg-space-cyan/80 transition-colors duration-300"
          onClick={handleExploreClick}
        >
          Explore Now
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
