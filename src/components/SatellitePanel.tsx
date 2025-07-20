import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Satellite, Signal, Battery, Thermometer } from "lucide-react";

interface SatelliteData {
  id: string;
  name: string;
  status: "active" | "maintenance" | "offline";
  battery: number;
  temperature: number;
  signalStrength: number;
  altitude: string;
  velocity: string;
}

const satellites: SatelliteData[] = [
  {
    id: "SAT-001",
    name: "Communications Alpha",
    status: "active",
    battery: 87,
    temperature: -15,
    signalStrength: 92,
    altitude: "35,786 km",
    velocity: "3.07 km/s"
  },
  {
    id: "SAT-002", 
    name: "Weather Monitor Beta",
    status: "active",
    battery: 73,
    temperature: -18,
    signalStrength: 89,
    altitude: "705 km",
    velocity: "7.5 km/s"
  },
  {
    id: "SAT-003",
    name: "Navigation Gamma",
    status: "maintenance",
    battery: 45,
    temperature: -22,
    signalStrength: 67,
    altitude: "20,180 km",
    velocity: "3.9 km/s"
  }
];

export function SatellitePanel() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-space-green";
      case "maintenance": return "bg-space-orange";
      case "offline": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "maintenance": return "Maintenance";
      case "offline": return "Offline";
      default: return "Unknown";
    }
  };

  return (
    <Card className="p-6 bg-gradient-panel border-border shadow-panel">
      <div className="flex items-center gap-2 mb-4">
        <Satellite className="h-5 w-5 text-space-cyan" />
        <h3 className="text-lg font-semibold text-foreground">Satellite Telemetry</h3>
      </div>
      
      <div className="space-y-4">
        {satellites.map((satellite) => (
          <div key={satellite.id} className="p-4 bg-secondary/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">{satellite.name}</h4>
                <p className="text-sm text-muted-foreground">{satellite.id}</p>
              </div>
              <Badge className={`${getStatusColor(satellite.status)} text-white`}>
                {getStatusText(satellite.status)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-space-green" />
                  <span className="text-muted-foreground">Battery:</span>
                  <span className="text-foreground font-medium">{satellite.battery}%</span>
                </div>
                <Progress value={satellite.battery} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4 text-space-cyan" />
                  <span className="text-muted-foreground">Signal:</span>
                  <span className="text-foreground font-medium">{satellite.signalStrength}%</span>
                </div>
                <Progress value={satellite.signalStrength} className="h-2" />
              </div>
              
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-space-orange" />
                <span className="text-muted-foreground">Temp:</span>
                <span className="text-foreground font-medium">{satellite.temperature}°C</span>
              </div>
              
              <div>
                <span className="text-muted-foreground">Altitude:</span>
                <span className="text-foreground font-medium ml-2">{satellite.altitude}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}