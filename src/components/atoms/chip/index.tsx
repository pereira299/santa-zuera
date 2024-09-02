import { CircleX } from "lucide-react";

type ChipProps = {
  label: string;
  remove?: boolean;
  onRemove?: () => void;
  variant?: "container" | "outlined";
};

const Chip = ({ label, onRemove, variant, remove }: ChipProps) => {
  const variants = {
    container: "bg-zinc-800 font-bold",
    outlined: "border border-white text-sm 2xl:text-lg",
  };

  return (
    <div
      className={`text-white py-1 rounded-full w-fit h-fit  ${
        variants[variant || "container"]
      } flex flex-row items-center justify-between ${remove ? "pl-2 pr-1": "px-3"}`}
    >
      {label}
      {remove && (
        <button
          onClick={onRemove}
          className="ml-2 text-white font-bold"
        >
          <CircleX size={20} />
        </button>
      )}
    </div>
  );
};

export default Chip;