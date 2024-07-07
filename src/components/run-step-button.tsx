"use client";

import { PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { StepEvent } from "@/types/history-item";

type RunStepButtonProps = {
  onClick: (event: StepEvent) => void;
};

export default function RunStepButton({ onClick }: RunStepButtonProps) {
  const handleClick = () => {
    onClick({
      type: "step",
    });
  };

  return (
    <Button
      className="flex items-center gap-x-4 bg-green-400 hover:bg-green-500"
      onClick={handleClick}
    >
      <span>Run step</span>
      <PlayIcon size={16} />
    </Button>
  );
}
