"use client";

import ElevatorGrid from "./elevator-grid";
import PickupForm from "./pickup-form";
import UpdateForm from "./update-form";
import { useState } from "react";
import { NUMBER_OF_ELEVATORS } from "@/constants";
import {
  HistoryItem,
  PickupEvent,
  StepEvent,
  UpdateEvent,
} from "@/types/history-item";
import HistoryTable from "./history-table";
import RunStepButton from "./run-step-button";
import { useElevator } from "@/hooks/use-elevator";
import ResetButton from "./reset-button";

export default function ElevatorController() {
  const { statusList, pickup, update, step, reset } =
    useElevator(NUMBER_OF_ELEVATORS);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  const appendHistoryItem = (item: HistoryItem) => {
    setHistoryItems([...historyItems, item]);
  };

  const handlePickup = (item: PickupEvent) => {
    appendHistoryItem(item);
    const direction = item.direction === "up" ? 1 : -1;
    pickup(item.floor, direction);
  };

  const handleUpdate = (item: UpdateEvent) => {
    appendHistoryItem(item);
    update(item.id, item.currentFloor, item.targetFloor);
  };

  const handleRunStep = (item: StepEvent) => {
    appendHistoryItem(item);
    step();
  };

  const handleReset = () => {
    setHistoryItems([]);
    reset();
  };

  return (
    <div className="grid grid-cols-4 gap-4 h-full">
      <div className="col-span-1 flex flex-col gap-y-4 overflow-y-auto h-full p-4">
        <RunStepButton onClick={handleRunStep} />
        <ResetButton onClick={handleReset} />
        <h1 className="text-lg font-medium">Pickup</h1>
        <PickupForm onSubmit={handlePickup} />
        <h1 className="text-lg font-medium">Update</h1>
        <UpdateForm onSubmit={handleUpdate} />
        <h1 className="text-lg font-medium">Event History</h1>
        <HistoryTable historyItems={historyItems} />
      </div>
      <ElevatorGrid statusList={statusList} />
    </div>
  );
}
