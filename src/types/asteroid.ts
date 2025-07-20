import { Vector3 } from "three";

export interface AsteroidInfo {
  id: string;
  name: string;
  type: string;
  discoveryDate: string;
  distance: string;
  velocity: string;
}

export interface Asteroid3D extends AsteroidInfo {
  position: Vector3;
  size: number;
}