import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Satellite, Globe, Thermometer, Target, BarChart3, Rocket, Navigation, Clock, MapPin, Zap, TrendingUp, Activity, AlertTriangle } from "lucide-react";

// Mock data
const mockSatellites = [
  { id: 1, name: "Hubble Space Telescope", type: "Observatory", status: "Active", altitude: "547 km", speed: "7.59 km/s", battery: 85 },
  { id: 2, name: "GPS IIF-12", type: "Navigation", status: "Active", altitude: "20,180 km", speed: "3.87 km/s", battery: 92 },
  { id: 3, name: "Landsat 9", type: "Earth Observation", status: "Active", altitude: "705 km", speed: "7.51 km/s", battery: 78 },
  { id: 4, name: "James Webb", type: "Observatory", status: "Active", altitude: "1.5M km", speed: "30 km/s", battery: 94 },
];

const mockISSData = {
  position: { latitude: 23.4567, longitude: -45.7890 },
  altitude: "408 km",
  velocity: "7.66 km/s",
  crew: 7,
  nextPass: "14:32 UTC",
  visibility: "Visible",
  uptime: "23y 2m 15d"
};

const mockMarsWeather = {
  sol: 4023,
  earthDate: "2025-07-20",
  season: "Month 11 - Late Northern Summer",
  minTemp: -78,
  maxTemp: -12,
  pressure: 750,
  windSpeed: 15,
  windDirection: "SW",
  uv: "High",
  dustStorm: false
};

const mockAsteroids = [
  { id: 1, name: "2025 MK", distance: "0.045 AU", diameter: "150m", hazard: true, nextApproach: "2025-08-15" },
  { id: 2, name: "Apophis", distance: "0.09 AU", diameter: "370m", hazard: true, nextApproach: "2029-04-13" },
  { id: 3, name: "2025 NX1", distance: "0.12 AU", diameter: "85m", hazard: false, nextApproach: "2025-09-22" },
  { id: 4, name: "Bennu", distance: "0.31 AU", diameter: "492m", hazard: true, nextApproach: "2135-09-25" },
];

const mockMissions = [
  { name: "Artemis III", progress: 65, status: "On Track", launch: "2026-09-15" },
  { name: "Mars Sample Return", progress: 42, status: "Development", launch: "2028-07-20" },
  { name: "Europa Clipper", progress: 89, status: "Pre-Launch", launch: "2024-10-10" },
  { name: "DART Follow-up", progress: 23, status: "Planning", launch: "2027-03-12" },
];

export default function SpaceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSatellite, setSelectedSatellite] = useState(null);

  // Satellite Network Component
  const SatelliteNetwork = () => (
    <Card className="p-6 bg-gradient-to-br from-red-900/80 to-orange-900/60 backdrop-blur-md border-red-600/40 shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Satellite className="h-5 w-5 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">Active Satellites</h3>
        <Badge className="bg-orange-500/90 text-white ml-auto backdrop-blur-sm">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          {mockSatellites.length} ACTIVE
        </Badge>
      </div>
      <div className="space-y-4">
        {mockSatellites.map((sat) => (
          <div key={sat.id} className="p-4 bg-red-800/40 backdrop-blur-sm rounded-lg border border-red-600/30 hover:border-orange-400/60 transition-colors cursor-pointer"
               onClick={() => setSelectedSatellite(sat)}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{sat.name}</h4>
              <Badge className={sat.status === 'Active' ? 'bg-orange-500/90 backdrop-blur-sm' : 'bg-yellow-500/90 backdrop-blur-sm'}>
                {sat.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-orange-200">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>{sat.altitude}</span>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                <span>{sat.speed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Battery: {sat.battery}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>{sat.type}</span>
              </div>
            </div>
            <div className="mt-2 bg-red-700/60 rounded-full h-2">
              <div className="bg-orange-400 h-2 rounded-full" style={{width: `${sat.battery}%`}}></div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  // ISS Tracker Component
  const ISSTrackerComponent = () => (
    <Card className="p-6 bg-gradient-to-br from-orange-900/80 to-red-900/60 backdrop-blur-md border-orange-600/40 shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-orange-400" />
        <h3 className="text-lg font-semibold text-white">ISS Live Tracker</h3>
        <Badge className="bg-orange-500/90 text-white ml-auto backdrop-blur-sm">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          LIVE
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-orange-800/30 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span className="text-orange-200 text-sm">Position</span>
          </div>
          <p className="text-white font-mono">{mockISSData.position.latitude.toFixed(4)}°N</p>
          <p className="text-white font-mono">{Math.abs(mockISSData.position.longitude).toFixed(4)}°W</p>
        </div>
        <div className="p-4 bg-orange-800/30 backdrop-blur-sm rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-orange-400" />
            <span className="text-orange-200 text-sm">Velocity</span>
          </div>
          <p className="text-white font-mono text-lg">{mockISSData.velocity}</p>
          <p className="text-orange-200 text-sm">Alt: {mockISSData.altitude}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-white">{mockISSData.crew}</p>
          <p className="text-orange-200 text-sm">Crew Members</p>
        </div>
        <div>
          <p className="text-lg font-bold text-white">{mockISSData.nextPass}</p>
          <p className="text-orange-200 text-sm">Next Pass</p>
        </div>
        <div>
          <p className="text-lg font-bold text-orange-400">{mockISSData.visibility}</p>
          <p className="text-orange-200 text-sm">Status</p>
        </div>
      </div>
    </Card>
  );

  // Mars Weather Component
  const MarsWeatherComponent = () => (
    <Card className="p-6 bg-gradient-to-br from-red-900/90 to-amber-900/70 backdrop-blur-md border-red-600/50 shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Thermometer className="h-5 w-5 text-amber-400" />
        <h3 className="text-lg font-semibold text-white">Mars Weather Station</h3>
        <Badge className="bg-red-600/90 text-white ml-auto backdrop-blur-sm">
          SOL {mockMarsWeather.sol}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-red-800/40 backdrop-blur-sm rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-200 text-sm">Temperature Range</span>
            <Thermometer className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-300 font-mono">{mockMarsWeather.minTemp}°C</span>
            <div className="flex-1 h-2 bg-gradient-to-r from-cyan-400 to-red-500 rounded"></div>
            <span className="text-red-400 font-mono">{mockMarsWeather.maxTemp}°C</span>
          </div>
        </div>
        <div className="p-4 bg-red-800/40 backdrop-blur-sm rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-200 text-sm">Atmospheric Pressure</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-white font-mono text-xl">{mockMarsWeather.pressure} Pa</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-white">{mockMarsWeather.windSpeed} m/s</p>
          <p className="text-amber-200 text-sm">Wind ({mockMarsWeather.windDirection})</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-yellow-400">{mockMarsWeather.uv}</p>
          <p className="text-amber-200 text-sm">UV Index</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-orange-400">Clear</p>
          <p className="text-amber-200 text-sm">Dust Status</p>
        </div>
      </div>
      <div className="mt-4 p-3 bg-amber-800/30 backdrop-blur-sm rounded-lg border border-amber-600/40">
        <p className="text-amber-200 text-sm">{mockMarsWeather.season}</p>
        <p className="text-amber-100 text-xs mt-1">Earth Date: {mockMarsWeather.earthDate}</p>
      </div>
    </Card>
  );

  // Asteroid Tracking Component
  const AsteroidTracker = () => (
    <Card className="p-6 bg-gradient-to-br from-purple-900/90 to-pink-900/30 border-purple-700 shadow-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Near-Earth Objects</h3>
        <Badge className="bg-purple-500 text-white ml-auto">
          {mockAsteroids.filter(a => a.hazard).length} HAZARDOUS
        </Badge>
      </div>
      <div className="space-y-4">
        {mockAsteroids.map((asteroid) => (
          <div key={asteroid.id} className="p-4 bg-purple-800/30 rounded-lg border border-purple-600">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-white">{asteroid.name}</h4>
              <div className="flex items-center gap-2">
                {asteroid.hazard && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                <Badge className={asteroid.hazard ? 'bg-red-500' : 'bg-green-500'}>
                  {asteroid.hazard ? 'HAZARDOUS' : 'SAFE'}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-purple-300">
              <div>
                <span className="text-purple-400">Distance: </span>
                <span className="font-mono">{asteroid.distance}</span>
              </div>
              <div>
                <span className="text-purple-400">Diameter: </span>
                <span className="font-mono">{asteroid.diameter}</span>
              </div>
              <div className="col-span-2">
                <span className="text-purple-400">Next Approach: </span>
                <span className="font-mono">{asteroid.nextApproach}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  // Mission Analytics Component
  const MissionAnalytics = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-green-900/90 to-teal-900/30 border-green-700 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Mission Progress</h3>
          <Badge className="bg-green-500 text-white ml-auto">
            {mockMissions.length} ACTIVE
          </Badge>
        </div>
        <div className="space-y-4">
          {mockMissions.map((mission, idx) => (
            <div key={idx} className="p-4 bg-green-800/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{mission.name}</h4>
                <Badge className={
                  mission.status === 'On Track' ? 'bg-green-500' : 
                  mission.status === 'Development' ? 'bg-blue-500' :
                  mission.status === 'Pre-Launch' ? 'bg-purple-500' : 'bg-yellow-500'
                }>
                  {mission.status}
                </Badge>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-green-300 mb-1">
                  <span>Progress</span>
                  <span>{mission.progress}%</span>
                </div>
                <div className="bg-green-700 rounded-full h-3">
                  <div 
                    className="bg-green-400 h-3 rounded-full transition-all duration-500"
                    style={{width: `${mission.progress}%`}}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-green-300">
                <span>Target Launch: {mission.launch}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-900/90 to-cyan-900/30 border-blue-700 text-center">
          <div className="text-3xl font-bold text-cyan-400 mb-2">247</div>
          <div className="text-blue-300">Active Satellites</div>
          <div className="flex items-center justify-center mt-2 text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+12 this month</span>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-900/90 to-pink-900/30 border-purple-700 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">1,247</div>
          <div className="text-purple-300">Tracked Objects</div>
          <div className="flex items-center justify-center mt-2 text-yellow-400">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span className="text-sm">23 potentially hazardous</span>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-orange-900/90 to-red-900/30 border-orange-700 text-center">
          <div className="text-3xl font-bold text-orange-400 mb-2">99.7%</div>
          <div className="text-orange-300">System Uptime</div>
          <div className="flex items-center justify-center mt-2 text-green-400">
            <Activity className="w-4 h-4 mr-1" />
            <span className="text-sm">All systems nominal</span>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen text-white p-6 relative"
      style={{
        backgroundImage: 'url(https://github.com/rutviktayde/IMG-s-for-Web-App/blob/main/Satelite%20Background.png?raw=true)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-orange-900/50 to-amber-800/40"></div>
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-red-900/10 rounded-2xl border border-red-700/30 shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-300 via-red-400 to-amber-400 bg-clip-text text-transparent">
              Space Mission Control
            </h1>
            <p className="text-orange-200/80 mt-2">
              Live monitoring of space missions, satellites, and celestial objects
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-orange-600/90 backdrop-blur-sm text-white px-4 py-2 border border-orange-500/50">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              SYSTEMS NOMINAL
            </Badge>
            <Badge className="bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 border border-red-500/50">
              <Rocket className="w-4 h-4 mr-2" />
              12 ACTIVE MISSIONS
            </Badge>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-red-900/30 backdrop-blur-sm p-1 rounded-lg border border-red-700/40">
            <TabsTrigger value="overview" className="flex items-center gap-2 text-orange-200 data-[state=active]:text-white data-[state=active]:bg-red-800/60 data-[state=active]:backdrop-blur-sm">
              <Globe className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="satellites" className="flex items-center gap-2 text-orange-200 data-[state=active]:text-white data-[state=active]:bg-red-800/60 data-[state=active]:backdrop-blur-sm">
              <Satellite className="w-4 h-4" />
              Satellites
            </TabsTrigger>
            <TabsTrigger value="iss" className="flex items-center gap-2 text-orange-200 data-[state=active]:text-white data-[state=active]:bg-red-800/60 data-[state=active]:backdrop-blur-sm">
              <Target className="w-4 h-4" />
              ISS Tracker
            </TabsTrigger>
            <TabsTrigger value="mars" className="flex items-center gap-2 text-orange-200 data-[state=active]:text-white data-[state=active]:bg-red-800/60 data-[state=active]:backdrop-blur-sm">
              <Thermometer className="w-4 h-4" />
              Mars Weather
            </TabsTrigger>
            <TabsTrigger value="asteroids" className="flex items-center gap-2 text-orange-200 data-[state=active]:text-white data-[state=active]:bg-red-800/60 data-[state=active]:backdrop-blur-sm">
              <Target className="w-4 h-4" />
              Asteroids
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-orange-200 data-[state=active]:text-white data-[state=active]:bg-red-800/60 data-[state=active]:backdrop-blur-sm">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <SatelliteNetwork />
              <ISSTrackerComponent />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarsWeatherComponent />
              <AsteroidTracker />
            </div>
          </TabsContent>

          {/* Satellites Tab */}
          <TabsContent value="satellites" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SatelliteNetwork />
              </div>
              <Card className="p-6 bg-gradient-to-br from-indigo-900/90 to-blue-900/30 border-indigo-700 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-white">Orbital Coverage</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-800/30 rounded-lg">
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-indigo-400">98.7%</div>
                      <div className="text-indigo-300 text-sm">Global Coverage</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-indigo-300">LEO Satellites</div>
                        <div className="text-white font-semibold">2,847</div>
                      </div>
                      <div>
                        <div className="text-indigo-300">GEO Satellites</div>
                        <div className="text-white font-semibold">564</div>
                      </div>
                      <div>
                        <div className="text-indigo-300">MEO Satellites</div>
                        <div className="text-white font-semibold">128</div>
                      </div>
                      <div>
                        <div className="text-indigo-300">Deep Space</div>
                        <div className="text-white font-semibold">12</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-indigo-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Network Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-300 text-sm">Communication</span>
                        <Badge className="bg-green-500">Online</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-300 text-sm">Navigation</span>
                        <Badge className="bg-green-500">Operational</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-300 text-sm">Earth Observation</span>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-indigo-300 text-sm">Scientific</span>
                        <Badge className="bg-green-500">Collecting</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* ISS Tracker Tab */}
          <TabsContent value="iss" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ISSTrackerComponent />
              <Card className="p-6 bg-gradient-to-br from-cyan-900/90 to-blue-900/30 border-cyan-700 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className="h-5 w-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-white">ISS Mission Details</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-cyan-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Current Crew</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-cyan-300">Commander</span>
                        <span className="text-white">A. Petrov (Russia)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-300">Flight Engineer 1</span>
                        <span className="text-white">K. Thompson (USA)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-300">Flight Engineer 2</span>
                        <span className="text-white">H. Tanaka (Japan)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cyan-300">Mission Specialist</span>
                        <span className="text-white">L. Mueller (Germany)</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-cyan-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Station Systems</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-cyan-300 text-sm">Life Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-cyan-300 text-sm">Power Systems</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-cyan-300 text-sm">Communications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-cyan-300 text-sm">Lab Module A</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-cyan-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Upcoming Events</h4>
                    <div className="space-y-2 text-sm">
                      <div className="text-cyan-300">• Spacewalk EVA-89: July 25, 2025</div>
                      <div className="text-cyan-300">• Dragon CRS-31 Arrival: Aug 2, 2025</div>
                      <div className="text-cyan-300">• Crew Rotation: Aug 15, 2025</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Mars Weather Tab */}
          <TabsContent value="mars" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MarsWeatherComponent />
              <Card className="p-6 bg-gradient-to-br from-red-900/90 to-orange-900/30 border-red-700 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Mars Rover Status</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-red-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Perseverance Rover</h4>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-red-300 text-sm">Power Level</div>
                        <div className="text-white font-semibold">847 Wh</div>
                      </div>
                      <div>
                        <div className="text-red-300 text-sm">Distance Traveled</div>
                        <div className="text-white font-semibold">24.67 km</div>
                      </div>
                    </div>
                    <div className="bg-red-700 rounded-full h-2 mb-2">
                      <div className="bg-red-400 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                    <div className="text-red-300 text-xs">Mission Progress: 78% Complete</div>
                  </div>
                  
                  <div className="p-4 bg-red-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Ingenuity Helicopter</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-red-300 text-sm">Flight Count</div>
                        <div className="text-white font-semibold">72 flights</div>
                      </div>
                      <div>
                        <div className="text-red-300 text-sm">Status</div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Sample Collection</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-red-300 text-sm">Rock Samples</span>
                        <span className="text-white">24/43 tubes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-red-300 text-sm">Atmospheric Samples</span>
                        <span className="text-white">8/10 tubes</span>
                      </div>
                      <div className="bg-red-700 rounded-full h-2">
                        <div className="bg-orange-400 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <div className="text-red-300 text-xs">Collection Progress: 60%</div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Recent Discoveries</h4>
                    <div className="space-y-1 text-sm text-red-300">
                      <div>• Organic compounds detected in crater floor</div>
                      <div>• Ancient river delta formations mapped</div>
                      <div>• Subsurface water ice confirmed</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Asteroids Tab */}
          <TabsContent value="asteroids" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AsteroidTracker />
              </div>
              <Card className="p-6 bg-gradient-to-br from-purple-900/90 to-pink-900/30 border-purple-700 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Planetary Defense</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">DART Mission Results</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-purple-300 text-sm">Target</span>
                        <span className="text-white">Dimorphos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300 text-sm">Orbital Period Change</span>
                        <span className="text-green-400">-32 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300 text-sm">Mission Status</span>
                        <Badge className="bg-green-500">Success</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Detection Network</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-purple-300 text-sm">Ground Telescopes</div>
                        <div className="text-white font-semibold">247</div>
                      </div>
                      <div>
                        <div className="text-purple-300 text-sm">Space Assets</div>
                        <div className="text-white font-semibold">12</div>
                      </div>
                      <div>
                        <div className="text-purple-300 text-sm">Daily Detections</div>
                        <div className="text-white font-semibold">~150</div>
                      </div>
                      <div>
                        <div className="text-purple-300 text-sm">Catalogued Objects</div>
                        <div className="text-white font-semibold">34,127</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Risk Assessment</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300 text-sm">Current Threat Level</span>
                        <Badge className="bg-green-500">Low</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-300 text-sm">Next Review</span>
                        <span className="text-white text-sm">2025-08-01</span>
                      </div>
                      <div className="text-xs text-purple-300 mt-3">
                        No objects 140m detected on collision course within next 100 years
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-800/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Upcoming Missions</h4>
                    <div className="space-y-1 text-sm text-purple-300">
                      <div>• Hera (ESA): Launch 2024-10</div>
                      <div>• NEO Surveyor: Launch 2026-06</div>
                      <div>• Asteroid Impact Mission: 2028</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <MissionAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}