import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SolarSystemVisualization } from "./EarthVisualization";
import { ThreeJSErrorBoundary } from "./ThreeJSErrorBoundary";
import { SatellitePanel } from "./SatellitePanel";
import { ISSTracker } from "./ISSTracker";
import { MarsWeather } from "./MarsWeather";
import { CelestialDetails } from "./CelestialDetails";
import { MissionCharts } from "./MissionCharts";
import { Satellite, Globe, Thermometer, Target, BarChart3, Rocket } from "lucide-react";
import { AsteroidInfo } from "@/types/asteroid";
import { PlanetInfo } from "@/types/planet";

export function SpaceDashboard() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo | null>(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState<AsteroidInfo | null>(null);
  const [focusedPlanet, setFocusedPlanet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Handle planet selection and focus
  const handlePlanetSelect = (planet: PlanetInfo | null) => {
    setSelectedPlanet(planet);
    setFocusedPlanet(planet?.id || null);
    // Clear asteroid selection when switching planets
    if (!planet) {
      setSelectedAsteroid(null);
    }
  };

  return (
    <div className="min-h-screen text-foreground p-6">
      <div className="max-w-7xl mx-auto backdrop-blur-sm bg-background/5 rounded-2xl border border-white/10 shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Space Mission Control
            </h1>
            <p className="text-muted-foreground mt-2">
              Live monitoring of space missions, satellites, and celestial objects
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-space-green text-white px-4 py-2">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              SYSTEMS NOMINAL
            </Badge>
            <Badge className="bg-space-cyan text-white px-4 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              12 ACTIVE MISSIONS
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-secondary/50 p-1 rounded-lg">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="satellites" className="flex items-center gap-2">
              <Satellite className="w-4 h-4" />
              Satellites
            </TabsTrigger>
            <TabsTrigger value="iss" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              ISS Tracker
            </TabsTrigger>
            <TabsTrigger value="mars" className="flex items-center gap-2">
              <Thermometer className="w-4 h-4" />
              Mars Weather
            </TabsTrigger>
            <TabsTrigger value="asteroids" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Asteroids
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 bg-gradient-panel border-border shadow-panel">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-space-cyan" />
                    <h3 className="text-lg font-semibold">Solar System Explorer</h3>
                    <Badge className="bg-space-green text-white ml-auto">3D VIEW</Badge>
                  </div>
                  <div className="h-96">
                    <ThreeJSErrorBoundary>
                      <SolarSystemVisualization 
                        onPlanetSelect={handlePlanetSelect}
                        onAsteroidSelect={setSelectedAsteroid}
                        selectedPlanet={selectedPlanet}
                        selectedAsteroid={selectedAsteroid}
                        focusedPlanet={focusedPlanet}
                      />
                    </ThreeJSErrorBoundary>
                  </div>
                </Card>
              </div>
              <div className="space-y-6">
                <CelestialDetails planet={selectedPlanet} asteroid={selectedAsteroid} />
                <ISSTracker />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <SatellitePanel />
              <MarsWeather />
            </div>
          </TabsContent>

          {/* Satellites Tab */}
          <TabsContent value="satellites" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SatellitePanel />
              <div className="lg:col-span-1">
                <Card className="p-6 bg-gradient-panel border-border shadow-panel h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Satellite className="h-5 w-5 text-space-cyan" />
                    <h3 className="text-lg font-semibold">Satellite Network Map</h3>
                  </div>
                  <div className="h-96 bg-secondary/30 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Global satellite network visualization</p>
                      <p className="text-sm">Real-time orbital tracking</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ISS Tracker Tab */}
          <TabsContent value="iss" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ISSTracker />
              <Card className="p-6 bg-gradient-panel border-border shadow-panel">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-space-orange" />
                  <h3 className="text-lg font-semibold">ISS Orbital Path</h3>
                </div>
                <div className="h-80 bg-secondary/30 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Live ISS orbital trajectory</p>
                    <p className="text-sm">Next pass predictions</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Mars Weather Tab */}
          <TabsContent value="mars" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarsWeather />
              <Card className="p-6 bg-gradient-panel border-border shadow-panel">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="h-5 w-5 text-space-orange" />
                  <h3 className="text-lg font-semibold">Mars Climate History</h3>
                </div>
                <div className="h-80 bg-secondary/30 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Thermometer className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Historical weather patterns</p>
                    <p className="text-sm">Seasonal variations and trends</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Asteroids Tab */}
          <TabsContent value="asteroids" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6 bg-gradient-panel border-border shadow-panel">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-space-cyan" />
                    <h3 className="text-lg font-semibold">Solar System & Asteroid Tracking</h3>
                  </div>
                  <div className="h-96">
                    <ThreeJSErrorBoundary>
                      <SolarSystemVisualization 
                        onPlanetSelect={handlePlanetSelect}
                        onAsteroidSelect={setSelectedAsteroid}
                        selectedPlanet={selectedPlanet}
                        selectedAsteroid={selectedAsteroid}
                        focusedPlanet={focusedPlanet}
                      />
                    </ThreeJSErrorBoundary>
                  </div>
                </Card>
              </div>
              <CelestialDetails planet={selectedPlanet} asteroid={selectedAsteroid} />
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <MissionCharts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}