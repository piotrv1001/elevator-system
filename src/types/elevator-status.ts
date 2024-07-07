export type ElevatorStatus = {
  id: number;
  currentFloor: number;
  targetFloor: number | null;
  direction: number;
};