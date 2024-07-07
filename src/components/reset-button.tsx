import { RefreshCwIcon } from "lucide-react";
import { Button } from "./ui/button";

type ResetButtonProps = {
  onClick: () => void;
};

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <Button
      className="flex items-center gap-x-4 bg-red-400 hover:bg-red-500"
      onClick={onClick}
    >
      <span>Reset</span>
      <RefreshCwIcon size={16} />
    </Button>
  );
}
