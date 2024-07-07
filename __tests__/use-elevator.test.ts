import { useElevator } from "@/hooks/use-elevator";
import { DIRECTION } from "@/types/direction";
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("useElevator hook", () => {
  it("should initialize with the correct number of elevators", () => {
    const { result } = renderHook(() => useElevator(3));
    expect(result.current.elevators.length).toBe(3);
  });

  it("should handle pickup requests correctly", () => {
    const { result } = renderHook(() => useElevator(2));

    act(() => {
      result.current.pickup(5, 1);
    });

    expect(result.current.elevators[0].targetFloors).toContain(5);
  });

  it("should update elevator state correctly", () => {
    const { result } = renderHook(() => useElevator(2));

    act(() => {
      result.current.update(0, 2, 8);
    });

    expect(result.current.elevators[0].currentFloor).toBe(2);
    expect(result.current.elevators[0].targetFloors).toContain(8);
  });

  it("should run the step the simulation correctly", () => {
    const { result } = renderHook(() => useElevator(2));

    act(() => {
      result.current.update(0, 2, 4);
      result.current.step();
    });

    expect(result.current.elevators[0].currentFloor).toBe(3);

    act(() => {
      result.current.step();
    });

    expect(result.current.elevators[0].currentFloor).toBe(4);
    expect(result.current.elevators[0].targetFloors.length).toBe(0);
  });

  it("should return the correct status list", () => {
    const { result } = renderHook(() => useElevator(2));

    act(() => {
      result.current.update(0, 2, 4);
    });

    const status = result.current.statusList;

    expect(status).toEqual([
      { id: 0, currentFloor: 2, targetFloor: 4, direction: DIRECTION.IDLE },
      { id: 1, currentFloor: 0, targetFloor: null, direction: DIRECTION.IDLE },
    ]);
  });
});
