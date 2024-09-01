import { Item } from "@/types/global";
import { CircleX } from "lucide-react";
import Multiselect from "multiselect-react-dropdown";

type PickerProps = {
  options: Item[];
  selected: Item[];
  className?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  onChange?: (value: Item[]) => void;
};

export function Picker({ options, selected, ...props }: PickerProps) {
  const onSelect = (selectedList: Item[], selectedItem: Item) => {
    console.log(selectedList, selectedItem);
    props.onChange?.(selectedList);
  };

  const onRemove = (selectedList: Item[], removedItem: Item) => {
    console.log(selectedList, removedItem);
    props.onChange?.(selectedList);
  };

  return (
    <Multiselect
      options={options} // Options to display in the dropdown
      selectedValues={selected} // Preselected value to persist in dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="label" // Property name to display in the dropdown options
      placeholder={props.placeholder || "Selecione..."}
      customCloseIcon={<CircleX size={18} className="ml-1 text-zinc-600" />}
    />
  );
}
