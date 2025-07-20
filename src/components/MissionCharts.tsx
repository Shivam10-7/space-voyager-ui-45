import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Activity, Satellite } from "lucide-react";

const telemetryData = [
  { time: "00:00", temperature: -45, pressure: 735, signal: 92 },
  { time: "04:00", temperature: -52, pressure: 738, signal: 89 },
  { time: "08:00", temperature: -38, pressure: 742, signal: 94 },
  { time: "12:00", temperature: -25, pressure: 745, signal: 91 },
  { time: "16:00", temperature: -31, pressure: 741, signal: 88 },
  { time: "20:00", temperature: -44, pressure: 737, signal: 93 },
];

const missionData = [
  { mission: "Mars 2020", progress: 85, status: "active" },
  { mission: "Artemis I", progress: 100, status: "complete" },
  { mission: "JWST", progress: 92, status: "active" },
  { mission: "Parker Solar", progress: 78, status: "active" },
  { mission: "Europa Clipper", progress: 23, status: "prep" },
];

const satelliteData = [
  { name: "Communications", value: 35, fill: "#00BFFF" },
  { name: "Weather", value: 28, fill: "#FFA500" },
  { name: "Navigation", value: 22, fill: "#32CD32" },
  { name: "Scientific", value: 15, fill: "#9370DB" },
];

export function MissionCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-gradient-panel border-border shadow-panel">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-space-cyan" />
          <h3 className="text-lg font-semibold text-foreground">24h Telemetry</h3>
          <Badge className="bg-space-green text-white ml-auto">LIVE</Badge>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#FFA500" 
                strokeWidth={2}
                dot={{ fill: "#FFA500", strokeWidth: 2, r: 4 }}
                name="Temperature"
              />
              <Line 
                type="monotone" 
                dataKey="signal" 
                stroke="#00BFFF" 
                strokeWidth={2}
                dot={{ fill: "#00BFFF", strokeWidth: 2, r: 4 }}
                name="Signal"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-space-orange rounded-full"></div>
            <span className="text-muted-foreground">Temperature (°C)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-space-cyan rounded-full"></div>
            <span className="text-muted-foreground">Signal Strength (%)</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-panel border-border shadow-panel">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-space-green" />
          <h3 className="text-lg font-semibold text-foreground">Mission Progress</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={missionData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                type="category" 
                dataKey="mission"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={80}
              />
              <Bar 
                dataKey="progress" 
                fill="#32CD32"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-panel border-border shadow-panel">
        <div className="flex items-center gap-2 mb-4">
          <Satellite className="h-5 w-5 text-space-purple" />
          <h3 className="text-lg font-semibold text-foreground">Satellite Distribution</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={satelliteData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {satelliteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {satelliteData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.fill }}
              ></div>
              <span className="text-muted-foreground">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-panel border-border shadow-panel">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-space-orange" />
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Deep Space Network</span>
            <Badge className="bg-space-green text-white">ONLINE</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Mission Control</span>
            <Badge className="bg-space-green text-white">OPERATIONAL</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Spacecraft Health</span>
            <Badge className="bg-space-cyan text-white">NOMINAL</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
            <span className="text-sm text-muted-foreground">Data Processing</span>
            <Badge className="bg-space-orange text-white">PROCESSING</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}