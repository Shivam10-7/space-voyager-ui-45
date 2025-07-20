import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Activity, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  crewCount: number;
  nextPass: string;
  currentLocation: string;
  missionDay: number;
}

export function ISSTracker() {
  const [issData, setIssData] = useState<ISSData>({
    latitude: 25.7617,
    longitude: -80.1918,
    altitude: 408,
    velocity: 27600,
    crewCount: 7,
    nextPass: "2024-01-15 14:23:15",
    currentLocation: "Over Atlantic Ocean",
    missionDay: 156
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate ISS movement
      setIssData(prev => ({
        ...prev,
        latitude: prev.latitude + (Math.random() - 0.5) * 0.1,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.1,
        altitude: 408 + (Math.random() - 0.5) * 5,
        velocity: 27600 + (Math.random() - 0.5) * 100
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-6 bg-gradient-panel border-border shadow-panel">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-space-cyan" />
          <h3 className="text-lg font-semibold text-foreground">ISS Location</h3>
        </div>
        <Badge className={`${isLive ? 'bg-space-green' : 'bg-destructive'} text-white`}>
          {isLive ? 'LIVE' : 'OFFLINE'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-space-orange" />
            <span className="text-sm text-muted-foreground">Current Position</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Latitude:</span>
              <span className="text-foreground font-mono ml-2">{issData.latitude.toFixed(4)}°</span>
            </div>
            <div>
              <span className="text-muted-foreground">Longitude:</span>
              <span className="text-foreground font-mono ml-2">{issData.longitude.toFixed(4)}°</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-muted-foreground">Over:</span>
            <span className="text-foreground font-medium ml-2">{issData.currentLocation}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-2xl font-bold text-space-cyan">{issData.altitude.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">Altitude (km)</div>
          </div>
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-2xl font-bold text-space-orange">{issData.velocity.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Velocity (km/h)</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-space-green" />
            <span className="text-sm text-muted-foreground">Crew:</span>
            <span className="text-foreground font-medium">{issData.crewCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-space-purple" />
            <span className="text-sm text-muted-foreground">Mission Day:</span>
            <span className="text-foreground font-medium">{issData.missionDay}</span>
          </div>
        </div>

        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Next Pass Over Location</div>
          <div className="text-foreground font-mono">{issData.nextPass}</div>
        </div>
      </div>
    </Card>
  );
}