import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import { Mesh, Vector3, Group } from "three";
import { useFrame } from "@react-three/fiber";
import { Asteroid3D, AsteroidInfo } from "@/types/asteroid";
import { Planet3D, PlanetInfo } from "@/types/planet";

const planetAsteroids: Record<string, Asteroid3D[]> = {
  earth: [
    {
      id: "earth-1",
      name: "2022 AP7",
      position: new Vector3(2.7, 0.3, 0.5),
      size: 0.03,
      type: "Apollo",
      discoveryDate: "2022-01-13",
      distance: "1.1 AU",
      velocity: "25.2 km/s"
    },
    {
      id: "earth-2",
      name: "Apophis",
      position: new Vector3(2.2, -0.2, 0.8),
      size: 0.025,
      type: "Aten",
      discoveryDate: "2004-06-19",
      distance: "0.92 AU",
      velocity: "30.7 km/s"
    }
  ],
  mars: [
    {
      id: "mars-1",
      name: "Ceres",
      position: new Vector3(3.8, 0.4, -0.3),
      size: 0.04,
      type: "Dwarf Planet",
      discoveryDate: "1801-01-01",
      distance: "2.77 AU",
      velocity: "17.9 km/s"
    },
    {
      id: "mars-2",
      name: "Vesta",
      position: new Vector3(3.2, -0.3, 0.6),
      size: 0.035,
      type: "V-type",
      discoveryDate: "1807-03-29",
      distance: "2.36 AU",
      velocity: "19.3 km/s"
    },
    {
      id: "mars-3",
      name: "Pallas",
      position: new Vector3(3.7, 0.2, -0.8),
      size: 0.038,
      type: "B-type",
      discoveryDate: "1802-03-28",
      distance: "2.77 AU",
      velocity: "17.6 km/s"
    }
  ],
  jupiter: [
    {
      id: "jupiter-1",
      name: "Trojan L4",
      position: new Vector3(5.5, 0.5, 1.2),
      size: 0.02,
      type: "D-type",
      discoveryDate: "1906-02-22",
      distance: "5.2 AU",
      velocity: "13.1 km/s"
    },
    {
      id: "jupiter-2",
      name: "Trojan L5",
      position: new Vector3(4.8, -0.3, -1.0),
      size: 0.018,
      type: "D-type",
      discoveryDate: "1906-10-09",
      distance: "5.2 AU",
      velocity: "13.1 km/s"
    }
  ],
  saturn: [
    {
      id: "saturn-1",
      name: "Chiron",
      position: new Vector3(7.3, 0.8, 0.4),
      size: 0.025,
      type: "Centaur",
      discoveryDate: "1977-11-01",
      distance: "13.7 AU",
      velocity: "6.9 km/s"
    }
  ]
};

const planets: Planet3D[] = [
  {
    id: "sun",
    name: "Sun",
    type: "star",
    position: new Vector3(0, 0, 0),
    size: 0.5,
    color: "#FDB813",
    orbitRadius: 0,
    orbitSpeed: 0,
    radius: 695700,
    distanceFromSun: "0 km",
    orbitalPeriod: "N/A",
    dayLength: "25-35 days",
    temperature: "5,778 K",
    moons: 0,
    mass: "1.989 × 10³⁰ kg",
    composition: "Hydrogen (73%), Helium (25%)",
    description: "The central star of our solar system, providing light and heat to all planets."
  },
  {
    id: "mercury",
    name: "Mercury",
    type: "planet",
    position: new Vector3(1.2, 0, 0),
    size: 0.08,
    color: "#8C7853",
    orbitRadius: 1.2,
    orbitSpeed: 0.04,
    radius: 2439.7,
    distanceFromSun: "57.9 million km",
    orbitalPeriod: "88 days",
    dayLength: "59 days",
    temperature: "167°C (avg)",
    moons: 0,
    mass: "3.301 × 10²³ kg",
    composition: "Iron core, silicate mantle",
    description: "The smallest and innermost planet, with extreme temperature variations."
  },
  {
    id: "venus",
    name: "Venus",
    type: "planet",
    position: new Vector3(1.8, 0, 0),
    size: 0.12,
    color: "#FFC649",
    orbitRadius: 1.8,
    orbitSpeed: 0.03,
    radius: 6051.8,
    distanceFromSun: "108.2 million km",
    orbitalPeriod: "225 days",
    dayLength: "243 days",
    temperature: "464°C",
    moons: 0,
    mass: "4.867 × 10²⁴ kg",
    composition: "Carbon dioxide atmosphere, sulfuric acid clouds",
    description: "The hottest planet with a thick, toxic atmosphere and runaway greenhouse effect."
  },
  {
    id: "earth",
    name: "Earth",
    type: "planet",
    position: new Vector3(2.5, 0, 0),
    size: 0.13,
    color: "#6B93D6",
    orbitRadius: 2.5,
    orbitSpeed: 0.025,
    radius: 6371,
    distanceFromSun: "149.6 million km",
    orbitalPeriod: "365.25 days",
    dayLength: "24 hours",
    temperature: "15°C (avg)",
    moons: 1,
    mass: "5.972 × 10²⁴ kg",
    composition: "Nitrogen/oxygen atmosphere, water oceans",
    description: "The only known planet with life, featuring liquid water and a protective atmosphere."
  },
  {
    id: "mars",
    name: "Mars",
    type: "planet",
    position: new Vector3(3.5, 0, 0),
    size: 0.1,
    color: "#CD5C5C",
    orbitRadius: 3.5,
    orbitSpeed: 0.02,
    radius: 3389.5,
    distanceFromSun: "227.9 million km",
    orbitalPeriod: "687 days",
    dayLength: "24.6 hours",
    temperature: "-65°C (avg)",
    moons: 2,
    mass: "6.417 × 10²³ kg",
    composition: "Iron oxide surface, thin CO₂ atmosphere",
    description: "The red planet with polar ice caps and the largest volcano in the solar system."
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "planet",
    position: new Vector3(5.2, 0, 0),
    size: 0.35,
    color: "#D8CA9D",
    orbitRadius: 5.2,
    orbitSpeed: 0.01,
    radius: 69911,
    distanceFromSun: "778.5 million km",
    orbitalPeriod: "12 years",
    dayLength: "9.9 hours",
    temperature: "-110°C",
    moons: 95,
    mass: "1.898 × 10²⁷ kg",
    composition: "Hydrogen and helium gas giant",
    description: "The largest planet, protecting inner planets from asteroids and comets."
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "planet",
    position: new Vector3(7, 0, 0),
    size: 0.3,
    color: "#FAD5A5",
    orbitRadius: 7,
    orbitSpeed: 0.008,
    radius: 58232,
    distanceFromSun: "1.43 billion km",
    orbitalPeriod: "29 years",
    dayLength: "10.7 hours",
    temperature: "-140°C",
    moons: 146,
    mass: "5.683 × 10²⁶ kg",
    composition: "Hydrogen and helium with prominent rings",
    description: "Famous for its spectacular ring system made of ice and rock particles."
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "planet",
    position: new Vector3(9, 0, 0),
    size: 0.2,
    color: "#4FD0E7",
    orbitRadius: 9,
    orbitSpeed: 0.005,
    radius: 25362,
    distanceFromSun: "2.87 billion km",
    orbitalPeriod: "84 years",
    dayLength: "17.2 hours",
    temperature: "-195°C",
    moons: 27,
    mass: "8.681 × 10²⁵ kg",
    composition: "Water, methane, and ammonia ices",
    description: "An ice giant tilted on its side, rotating like a rolling ball around the Sun."
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "planet",
    position: new Vector3(11, 0, 0),
    size: 0.19,
    color: "#4B70DD",
    orbitRadius: 11,
    orbitSpeed: 0.003,
    radius: 24622,
    distanceFromSun: "4.5 billion km",
    orbitalPeriod: "165 years",
    dayLength: "16.1 hours",
    temperature: "-200°C",
    moons: 14,
    mass: "1.024 × 10²⁶ kg",
    composition: "Water, methane, and ammonia ices",
    description: "The windiest planet with storms reaching 2,100 km/h, located at the solar system's edge."
  }
];

function OrbitPath({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const curve = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      curve.push(new Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return curve;
  }, [radius]);

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#444444" transparent opacity={0.3} />
    </mesh>
  );
}

function PlanetMesh({ 
  planet, 
  onClick, 
  isSelected,
  showAsteroids 
}: { 
  planet: Planet3D; 
  onClick: (planet: Planet3D) => void;
  isSelected: boolean;
  showAsteroids: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current && planet.orbitSpeed > 0) {
      groupRef.current.rotation.y += delta * planet.orbitSpeed;
    }
    
    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += delta * 0.5;
      if (planet.name === "Earth") {
        meshRef.current.rotation.x += delta * 0.1;
      }
    }
  });

  const planetContent = () => {
    if (planet.name === "Earth") {
      return (
        <group>
          {/* Ocean layer */}
          <mesh>
            <sphereGeometry args={[planet.size, 64, 64]} />
            <meshStandardMaterial
              color="#4A90E2"
              roughness={0.1}
              metalness={0.3}
            />
          </mesh>
          
          {/* Continent layer */}
          <mesh scale={[1.001, 1.001, 1.001]}>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshStandardMaterial
              color="#228B22"
              roughness={0.8}
              metalness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Cloud layer */}
          <mesh scale={[1.01, 1.01, 1.01]}>
            <sphereGeometry args={[planet.size, 24, 24]} />
            <meshStandardMaterial
              color="#FFFFFF"
              roughness={0.1}
              metalness={0.0}
              transparent
              opacity={0.4}
            />
          </mesh>
        </group>
      );
    } else if (planet.name === "Saturn") {
      return (
        <group>
          {/* Planet body */}
          <mesh>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshStandardMaterial
              color={planet.color}
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
          {/* Rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.size * 1.2, planet.size * 2, 32]} />
            <meshStandardMaterial
              color="#D4AF37"
              transparent
              opacity={0.6}
              side={2}
            />
          </mesh>
        </group>
      );
    } else if (planet.name === "Sun") {
      return (
        <group>
          <mesh>
            <sphereGeometry args={[planet.size, 32, 32]} />
            <meshBasicMaterial
              color={planet.color}
            />
          </mesh>
          {/* Sun glow */}
          <mesh scale={[1.3, 1.3, 1.3]}>
            <sphereGeometry args={[planet.size, 16, 16]} />
            <meshBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>
      );
    } else {
      return (
        <mesh>
          <sphereGeometry args={[planet.size, 32, 32]} />
          <meshStandardMaterial
            color={planet.color}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      );
    }
  };

  return (
    <group ref={groupRef}>
      {planet.orbitRadius > 0 && <OrbitPath radius={planet.orbitRadius} />}
      <mesh 
        ref={meshRef}
        position={[planet.orbitRadius, 0, 0]}
        onClick={() => onClick(planet)}
      >
        {planetContent()}
      </mesh>
      
      {/* Selection glow */}
      {isSelected && (
        <mesh position={[planet.orbitRadius, 0, 0]} scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[planet.size, 8, 8]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
}

function AsteroidMesh({ asteroid, onClick, isSelected }: { 
  asteroid: Asteroid3D; 
  onClick: (asteroid: Asteroid3D) => void;
  isSelected: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  // Get asteroid color based on type
  const getAsteroidColor = () => {
    switch (asteroid.type.toLowerCase()) {
      case "dwarf planet": return isSelected ? "#FF69B4" : "#9370DB"; // Purple
      case "v-type": return isSelected ? "#FF1493" : "#FF6347"; // Red-orange
      case "b-type": return isSelected ? "#00FFFF" : "#4169E1"; // Blue
      case "s-type": return isSelected ? "#FFFF00" : "#32CD32"; // Green
      default: return isSelected ? "#00FFFF" : "#FFA500";
    }
  };

  return (
    <group position={[asteroid.position.x, asteroid.position.y, asteroid.position.z]}>
      {/* Main asteroid body - irregular shape */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(asteroid)}
        scale={[1 + Math.sin(Date.now() * 0.001) * 0.1, 1, 0.8 + Math.cos(Date.now() * 0.001) * 0.1]}
      >
        <dodecahedronGeometry args={[asteroid.size, 1]} />
        <meshStandardMaterial
          color={getAsteroidColor()}
          roughness={0.95}
          metalness={0.1}
          bumpScale={0.1}
        />
      </mesh>
      
      {/* Surface details - craters */}
      {Array.from({ length: 3 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.sin(i * 2.1) * asteroid.size * 0.8),
            (Math.cos(i * 1.7) * asteroid.size * 0.8),
            (Math.sin(i * 1.3) * asteroid.size * 0.8)
          ]}
          scale={[0.3, 0.3, 0.1]}
        >
          <sphereGeometry args={[asteroid.size * 0.2, 8, 8]} />
          <meshStandardMaterial
            color="#2C2C2C"
            roughness={1.0}
            metalness={0.0}
          />
        </mesh>
      ))}
      
      {/* Glow effect for selected asteroids */}
      {isSelected && (
        <mesh scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[asteroid.size, 8, 8]} />
          <meshBasicMaterial
            color={getAsteroidColor()}
            transparent
            opacity={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

interface SolarSystemVisualizationProps {
  onPlanetSelect: (planet: PlanetInfo | null) => void;
  onAsteroidSelect: (asteroid: AsteroidInfo | null) => void;
  selectedPlanet: PlanetInfo | null;
  selectedAsteroid: AsteroidInfo | null;
  focusedPlanet: string | null;
}

export function SolarSystemVisualization({ 
  onPlanetSelect, 
  onAsteroidSelect, 
  selectedPlanet, 
  selectedAsteroid,
  focusedPlanet 
}: SolarSystemVisualizationProps) {
  const controlsRef = useRef<any>(null);
  
  const handlePlanetClick = (planet: Planet3D) => {
    const planetInfo: PlanetInfo = {
      id: planet.id,
      name: planet.name,
      type: planet.type,
      radius: planet.radius,
      distanceFromSun: planet.distanceFromSun,
      orbitalPeriod: planet.orbitalPeriod,
      dayLength: planet.dayLength,
      temperature: planet.temperature,
      moons: planet.moons,
      mass: planet.mass,
      composition: planet.composition,
      description: planet.description
    };
    onPlanetSelect(selectedPlanet?.id === planet.id ? null : planetInfo);
    
    // Focus camera on planet
    if (controlsRef.current && selectedPlanet?.id !== planet.id) {
      const targetPosition = new Vector3(planet.orbitRadius, 0, 0);
      controlsRef.current.target.copy(targetPosition);
      controlsRef.current.update();
    }
  };

  const handleAsteroidClick = (asteroid: Asteroid3D) => {
    const asteroidInfo: AsteroidInfo = {
      id: asteroid.id,
      name: asteroid.name,
      type: asteroid.type,
      discoveryDate: asteroid.discoveryDate,
      distance: asteroid.distance,
      velocity: asteroid.velocity
    };
    onAsteroidSelect(selectedAsteroid?.id === asteroid.id ? null : asteroidInfo);
  };

  const getVisibleAsteroids = () => {
    if (!focusedPlanet) return [];
    return planetAsteroids[focusedPlanet] || [];
  };

  return (
    <div className="w-full h-full bg-gradient-space rounded-lg overflow-hidden">
      <Canvas 
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={(state) => {
          state.gl.setClearColor('#0B0B1E');
        }}
      >
        {/* Enhanced lighting for solar system */}
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FFD700" />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
        
        <Stars radius={200} depth={100} count={8000} factor={6} saturation={0} fade />
        
        {/* Render all planets */}
        {planets.map((planet) => (
          <PlanetMesh
            key={planet.id}
            planet={planet}
            onClick={handlePlanetClick}
            isSelected={selectedPlanet?.id === planet.id}
            showAsteroids={focusedPlanet === planet.id}
          />
        ))}
        
        {/* Render visible asteroids only */}
        {getVisibleAsteroids().map((asteroid) => (
          <AsteroidMesh
            key={asteroid.id}
            asteroid={asteroid}
            onClick={handleAsteroidClick}
            isSelected={selectedAsteroid?.id === asteroid.id}
          />
        ))}
        
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={50}
        />
      </Canvas>
    </div>
  );
}