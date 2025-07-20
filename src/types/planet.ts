import { Vector3 } from "three";

export interface PlanetInfo {
  id: string;
  name: string;
  type: "planet" | "dwarf-planet" | "star";
  radius: number;
  distanceFromSun: string;
  orbitalPeriod: string;
  dayLength: string;
  temperature: string;
  moons: number;
  mass: string;
  composition: string;
  discoveryDate?: string;
  description: string;
}

export interface Planet3D extends PlanetInfo {
  position: Vector3;
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
}

export interface CelestialBody {
  planet?: PlanetInfo;
  asteroid?: import("./asteroid").AsteroidInfo;
}