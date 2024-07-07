import { DIRECTION } from "@/types/direction";
import { ElevatorStatus } from "@/types/elevator-status";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";

type ElevatorStatusCardProps = {
  status: ElevatorStatus;
};

export default function ElevatorStatusCard({
  status: { id, currentFloor, targetFloor, direction },
}: ElevatorStatusCardProps) {
  let directionTemplate: JSX.Element | null = null;
  switch (direction) {
    case DIRECTION.UP:
      directionTemplate = <ArrowUpIcon size={16} className="text-green-400" />;
      break;
    case DIRECTION.DOWN:
      directionTemplate = <ArrowDownIcon size={16} className="text-red-400" />;
      break;
    case DIRECTION.IDLE:
      directionTemplate = (
        <ArrowRightIcon size={16} className="text-orange-400" />
      );
      break;
    default:
      directionTemplate = <span>{direction}</span>;
      break;
  }

  return (
    <div className="p-2 rounded-md flex flex-col border gap-y-2 bg-background">
      <h1 className="text-lg font-medium mb-2">Elevator {id}</h1>
      <KeyValueRow label="Current Floor" value={currentFloor} />
      <KeyValueRow label="Target Floor" value={targetFloor} />
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground">Direction</span>
        <span className="text-sm">{directionTemplate}</span>
      </div>
    </div>
  );
}

type KeyValueRowProps = {
  label: string;
  value: number | null;
};

function KeyValueRow({ label, value }: KeyValueRowProps) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm">{value ?? "None"}</span>
    </div>
  );
}
