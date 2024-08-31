type ChipProps = {
  label: string;
  onChange?: () => void;
  variant?: "container" | "outlined";
};

const Chip = ({ label, onChange, variant }: ChipProps) => {
  const variants = {
    container: "bg-zinc-800",
    outlined: "border border-white-800",
  };

  return (
    <div
      onChange={onChange}
      className={`text-white px-3 py-1 rounded-full w-fit h-fit font-bold ${
        variants[variant || "container"]
      }`}
    >
      {label}
    </div>
  );
};

export default Chip;