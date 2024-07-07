export type PickupEvent = {
  type: "pickup";
  floor: number;
  direction: "up" | "down";
};

export type UpdateEvent = {
  type: "update";
  id: number;
  currentFloor: number;
  targetFloor: number;
};

export type StepEvent = {
  type: "step";
};

export type HistoryItem = PickupEvent | UpdateEvent | StepEvent;
