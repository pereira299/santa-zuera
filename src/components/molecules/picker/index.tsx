import { Item } from "@/types/global";
import { CircleX } from "lucide-react";
import Multiselect from "multiselect-react-dropdown";

type PickerProps = {
  options: Item[];
  selected: Item[];
  className?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  onload: boolean;
  minQueryLength?: number;
  max?: number;
  onChange?: (value: Item[]) => void;
  onSearch?: (search: string) => void;
};

export function Picker({ options, selected, ...props }: PickerProps) {
  const onSelect = (selectedList: Item[], selectedItem: Item) => {
    props.onChange?.(selectedList);
  };

  const onRemove = (selectedList: Item[], removedItem: Item) => {
    props.onChange?.(selectedList);
  };

  const handleEvent = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return;
    }
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
      selectionLimit={props.max}
      emptyRecordMsg={props.noOptionsMessage || "Nenhum resultado encontrado"}
      onSearch={props.onSearch}
      onKeyPressFn={handleEvent}
      className="2xl:text-lg"
      closeOnSelect={true}
    />
  );
}
