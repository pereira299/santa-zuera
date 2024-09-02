'use client';
import { FilterIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../ui/dialog";
import Filter from "../Filter";
import { Category, Person } from "@/types/global";
import { MouseEvent} from "react";

type FilterProps = {
    categories: Category[];
    persons: Person[];
  };

const FilterMobile = (props: FilterProps) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        //remove focus
        e.stopPropagation();
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="fixed top-[6.5rem] right-5 z-30 text-lg font-bold flex flex-row gap-2 lg:hidden"
          onClick={handleClick}
        >
          <FilterIcon size={20} strokeWidth={3} />
          <p>Filtros</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-800">
        <Filter {...props}/>
      </DialogContent>
    </Dialog>
  );
};

export default FilterMobile;
