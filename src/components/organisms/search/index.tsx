import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "../../ui/dialog";
import { SearchIcon, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const Search = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className=" hover:bg-transparent max-lg:flex max-lg:gap-2">
          <SearchIcon size={25} strokeWidth={2} />
          <p className="text-lg lg:hidden">Pesquisar</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-6/12 bg-zinc-800">
        <Input
          placeholder="Pesquisar sobre..."
          className=" border-0 border-b-2 rounded-none mt-4 border-zinc-500 text-lg ring-0 foc focus:ring-0 focus:outline-none"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Search;
