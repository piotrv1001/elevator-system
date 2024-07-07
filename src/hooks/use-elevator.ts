import { DIRECTION } from "@/types/direction";
import { Elevator } from "@/types/elevator";
import { ElevatorStatus } from "@/types/elevator-status";
import { useMemo, useState } from "react";

const getInitialElevators = (numberOfElevators: number) =>
  Array.from({ length: numberOfElevators }, (_, i) => ({
    id: i,
    currentFloor: 0,
    targetFloors: [],
    direction: DIRECTION.IDLE,
  }));

export const useElevator = (numberOfElevators: number) => {
  const [elevators, setElevators] = useState<Elevator[]>(
    getInitialElevators(numberOfElevators)
  );

  const reset = () => {
    setElevators(getInitialElevators(numberOfElevators));
  };

  const moveElevator = (elevator: Elevator) => {
    if (elevator.targetFloors.length > 0) {
      const targetFloor = elevator.targetFloors[0];
      if (elevator.currentFloor < targetFloor) {
        elevator.direction = DIRECTION.UP;
        elevator.currentFloor++;
      } else if (elevator.currentFloor > targetFloor) {
        elevator.direction = DIRECTION.DOWN;
        elevator.currentFloor--;
      }
      if (elevator.currentFloor === targetFloor) {
        elevator.targetFloors.shift();
      }
    } else {
      elevator.direction = 0;
    }
  };

  const pickup = (pickupFloor: number, direction: number) => {
    let nearestElevator: Elevator | null = null;
    let minDistance = Infinity;

    for (const elevator of elevators) {
      if (
        (direction === DIRECTION.UP && elevator.currentFloor <= pickupFloor) ||
        (direction === DIRECTION.DOWN && elevator.currentFloor >= pickupFloor)
      ) {
        const distance = Math.abs(elevator.currentFloor - pickupFloor);
        if (distance < minDistance) {
          minDistance = distance;
          nearestElevator = elevator;
        }
      }
    }

    if (nearestElevator) {
      nearestElevator.targetFloors.push(pickupFloor);
      nearestElevator.targetFloors.sort((a, b) =>
        nearestElevator.direction === DIRECTION.DOWN ? b - a : a - b
      );
      setElevators([...elevators]);
    }
  };

  const update = (
    elevatorId: number,
    currentFloor: number,
    targetFloor: number
  ) => {
    if (elevatorId >= 0 && elevatorId < elevators.length) {
      const elevator = elevators[elevatorId];
      elevator.currentFloor = currentFloor;
      elevator.targetFloors = [targetFloor];
      setElevators([...elevators]);
    }
  };

  const step = () => {
    elevators.forEach((elevator) => moveElevator(elevator));
    setElevators([...elevators]);
  };

  const statusList = useMemo(() => {
    return elevators.map((elevator) => ({
      id: elevator.id,
      currentFloor: elevator.currentFloor,
      targetFloor:
        elevator.targetFloors.length > 0 ? elevator.targetFloors[0] : null,
      direction: elevator.direction,
    })) as ElevatorStatus[];
  }, [elevators]);

  return {
    statusList,
    pickup,
    update,
    step,
    reset,
  };
};
