import { ElevatorStatus } from "@/types/elevator-status";
import ElevatorStatusCard from "./elevator-status-card";

type ElevatorGridProps = {
  statusList: ElevatorStatus[];
};

export default function ElevatorGrid({ statusList }: ElevatorGridProps) {
  return (
    <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto h-full p-4 bg-secondary">
      {statusList.map((status) => (
        <ElevatorStatusCard key={status.id} status={status} />
      ))}
    </div>
  );
}
