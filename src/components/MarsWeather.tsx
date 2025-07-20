import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wind, Eye, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

interface MarsWeatherData {
  sol: number;
  earthDate: string;
  temperature: {
    high: number;
    low: number;
    current: number;
  };
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: string;
  season: string;
  weatherCondition: string;
}

export function MarsWeather() {
  const [weatherData, setWeatherData] = useState<MarsWeatherData>({
    sol: 4156,
    earthDate: "2024-01-15",
    temperature: {
      high: -15,
      low: -78,
      current: -45
    },
    windSpeed: 8.2,
    windDirection: "SW",
    pressure: 735,
    visibility: "Clear",
    season: "Northern Winter",
    weatherCondition: "Dust Storm"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: {
          ...prev.temperature,
          current: prev.temperature.current + (Math.random() - 0.5) * 2
        },
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 1),
        pressure: prev.pressure + (Math.random() - 0.5) * 5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTemperatureColor = (temp: number) => {
    if (temp > -20) return "text-space-orange";
    if (temp > -50) return "text-space-cyan";
    return "text-space-blue";
  };

  return (
    <Card className="p-6 bg-gradient-panel border-border shadow-panel">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-space-orange shadow-glow-orange" />
          <h3 className="text-lg font-semibold text-foreground">Mars Weather</h3>
        </div>
        <Badge className="bg-space-orange text-white">
          Sol {weatherData.sol}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-space-cyan" />
            <span className="text-sm text-muted-foreground">Earth Date: {weatherData.earthDate}</span>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getTemperatureColor(weatherData.temperature.current)}`}>
              {weatherData.temperature.current.toFixed(1)}°C
            </div>
            <div className="text-sm text-muted-foreground mb-3">{weatherData.weatherCondition}</div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                High: <span className="text-foreground font-medium">{weatherData.temperature.high}°C</span>
              </span>
              <span className="text-muted-foreground">
                Low: <span className="text-foreground font-medium">{weatherData.temperature.low}°C</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="h-4 w-4 text-space-cyan" />
              <span className="text-sm text-muted-foreground">Wind</span>
            </div>
            <div className="text-xl font-bold text-foreground">{weatherData.windSpeed.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">m/s {weatherData.windDirection}</div>
          </div>

          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-4 w-4 text-space-orange" />
              <span className="text-sm text-muted-foreground">Pressure</span>
            </div>
            <div className="text-xl font-bold text-foreground">{weatherData.pressure.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground">Pa</div>
          </div>
        </div>

        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-space-green" />
            <span className="text-sm text-muted-foreground">Visibility & Season</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground font-medium">{weatherData.visibility}</span>
            <span className="text-foreground font-medium">{weatherData.season}</span>
          </div>
        </div>

        <div className="p-3 bg-secondary/30 rounded-lg border border-space-orange/30">
          <div className="text-sm font-medium text-space-orange mb-1">Weather Alert</div>
          <div className="text-xs text-muted-foreground">
            Regional dust storm detected in Chryse Planitia. Visibility may be reduced.
          </div>
        </div>
      </div>
    </Card>
  );
}