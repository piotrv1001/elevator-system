import { HistoryItem, PickupEvent, UpdateEvent } from "@/types/history-item";
import { Fragment } from "react";

type HistoryTableProps = {
  historyItems: HistoryItem[];
};

export default function HistoryTable({ historyItems }: HistoryTableProps) {
  const getItemTemplate = (item: HistoryItem) => {
    switch (item.type) {
      case "pickup":
        return <PickupEventItem item={item} />;
      case "update":
        return <UpdateEventItem item={item} />;
      case "step":
        return <StepEventItem />;
      default:
        return <div>Unknown</div>;
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {historyItems.length > 0 ? (
        historyItems.map((item, index) => (
          <Fragment key={index}>{getItemTemplate(item)}</Fragment>
        ))
      ) : (
        <div className="text-sm text-muted-foreground rounded-md border border-dashed p-2 flex items-center justify-center">
          No events
        </div>
      )}
    </div>
  );
}

type PickupEventItemProps = {
  item: PickupEvent;
};

function PickupEventItem({ item }: PickupEventItemProps) {
  return (
    <div className="rounded-md border p-2 flex items-center gap-x-2">
      <div className="rounded-full size-4 bg-orange-400"></div>
      <span className="font-medium">Pickup</span>
      <span>Floor: {item.floor}</span>
      <span>Direction: {item.direction}</span>
    </div>
  );
}

type UpdateEventItemProps = {
  item: UpdateEvent;
};

function UpdateEventItem({ item }: UpdateEventItemProps) {
  return (
    <div className="rounded-md border p-2 flex items-center gap-x-2">
      <div className="rounded-full size-4 bg-blue-400"></div>
      <span className="font-medium">Update</span>
      <span>ID: {item.id}</span>
      <span>Target Floor: {item.targetFloor}</span>
    </div>
  );
}

function StepEventItem() {
  return (
    <div className="rounded-md border p-2 flex items-center gap-x-2">
      <div className="rounded-full size-4 bg-green-400"></div>
      <span className="font-medium">Simulation Step</span>
    </div>
  );
}
