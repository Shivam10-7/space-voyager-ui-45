import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, 
  Ruler, 
  Calendar, 
  Navigation, 
  Globe, 
  Thermometer, 
  Clock,
  Weight,
  Atom
} from "lucide-react";
import { AsteroidInfo } from "@/types/asteroid";
import { PlanetInfo } from "@/types/planet";

interface CelestialDetailsProps {
  planet?: PlanetInfo | null;
  asteroid?: AsteroidInfo | null;
}

export function CelestialDetails({ planet, asteroid }: CelestialDetailsProps) {
  if (!planet && !asteroid) {
    return (
      <Card className="p-6 bg-gradient-panel border-border shadow-panel">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
            <Navigation className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Solar System Explorer</h3>
          <p className="text-sm">Click on any planet or asteroid to see detailed information</p>
        </div>
      </Card>
    );
  }

  if (planet) {
    const getTypeColor = (type: string) => {
      switch (type) {
        case "star": return "bg-space-orange";
        case "planet": return "bg-space-blue";
        case "dwarf-planet": return "bg-space-purple";
        default: return "bg-muted";
      }
    };

    return (
      <Card className="p-6 bg-gradient-panel border-border shadow-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Planet Details</h3>
          <Badge className={`${getTypeColor(planet.type)} text-white`}>
            {planet.type.replace("-", " ").toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-bold text-space-cyan mb-1">{planet.name}</h4>
            <p className="text-sm text-muted-foreground">{planet.description}</p>
          </div>

          <Separator className="bg-border/50" />

          <div className="grid grid-cols-1 gap-4">
            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="h-4 w-4 text-space-cyan" />
                <span className="text-sm text-muted-foreground">Distance from Sun</span>
              </div>
              <div className="text-2xl font-bold text-space-cyan">{planet.distanceFromSun}</div>
            </div>

            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-space-green" />
                <span className="text-sm text-muted-foreground">Orbital Period</span>
              </div>
              <div className="text-2xl font-bold text-space-green">{planet.orbitalPeriod}</div>
            </div>

            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4 text-space-orange" />
                <span className="text-sm text-muted-foreground">Temperature</span>
              </div>
              <div className="text-2xl font-bold text-space-orange">{planet.temperature}</div>
            </div>

            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-4 w-4 text-space-purple" />
                <span className="text-sm text-muted-foreground">Moons</span>
              </div>
              <div className="text-2xl font-bold text-space-purple">{planet.moons}</div>
            </div>
          </div>

          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm font-medium text-foreground mb-2">Physical Properties</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Weight className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Mass: {planet.mass}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Day Length: {planet.dayLength}</span>
              </div>
              <div className="flex items-center gap-2">
                <Atom className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Composition: {planet.composition}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (asteroid) {
    const getTypeColor = (type: string) => {
      switch (type.toLowerCase()) {
        case "dwarf planet": return "bg-space-purple";
        case "v-type": return "bg-space-orange";
        case "b-type": return "bg-space-blue";
        case "s-type": return "bg-space-green";
        default: return "bg-muted";
      }
    };

    const getHazardLevel = () => {
      const velocityNum = parseFloat(asteroid.velocity);
      if (velocityNum > 25) return { level: "High", color: "bg-destructive" };
      if (velocityNum > 20) return { level: "Medium", color: "bg-space-orange" };
      return { level: "Low", color: "bg-space-green" };
    };

    const hazard = getHazardLevel();

    return (
      <Card className="p-6 bg-gradient-panel border-border shadow-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Asteroid Details</h3>
          <Badge className={`${getTypeColor(asteroid.type)} text-white`}>
            {asteroid.type}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-bold text-space-cyan mb-1">{asteroid.name}</h4>
            <p className="text-sm text-muted-foreground">ID: {asteroid.id}</p>
          </div>

          <Separator className="bg-border/50" />

          <div className="grid grid-cols-1 gap-4">
            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-space-green" />
                <span className="text-sm text-muted-foreground">Discovery Date</span>
              </div>
              <div className="text-foreground font-medium">
                {new Date(asteroid.discoveryDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="h-4 w-4 text-space-cyan" />
                <span className="text-sm text-muted-foreground">Distance from Sun</span>
              </div>
              <div className="text-2xl font-bold text-space-cyan">{asteroid.distance}</div>
            </div>

            <div className="p-3 bg-secondary/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-space-orange" />
                <span className="text-sm text-muted-foreground">Orbital Velocity</span>
              </div>
              <div className="text-2xl font-bold text-space-orange">{asteroid.velocity}</div>
            </div>
          </div>

          <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Potential Hazard Level</span>
              <Badge className={`${hazard.color} text-white`}>
                {hazard.level}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Based on orbital velocity and proximity calculations
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return null;
}