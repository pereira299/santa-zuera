'use client';
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
} from "../../ui/dialog";
import { SearchIcon, X } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { FormEvent, useState } from "react";

const Search = () => {

    const handleSearch = (e:FormEvent) => {
        e.preventDefault();
        const search = (e.target as HTMLFormElement).search.value;
        console.log(e);
        const base = "/episodios";
        const url = search ? `${base}?title=${search.split(' ').join('+')}` : base;
        
        sessionStorage.setItem("filters", JSON.stringify({ title: search }));
        window.location.href = url;

    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} aria-label="pesquisar" className=" hover:bg-transparent max-lg:flex max-lg:gap-2">
          <SearchIcon size={25} strokeWidth={2} />
          <p className="text-lg lg:hidden">Pesquisar</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-6/12 bg-zinc-800">
      <form onSubmit={handleSearch} className="flex flex-col gap-4 w-full">
        <Input
          placeholder="Pesquisar sobre..."
          name="search"
          className=" border-0 border-b-2 rounded-none mt-4 border-zinc-500 text-lg ring-0 foc focus:ring-0 focus:outline-none"
        />
        <Button className="w-full" type="submit">Pesquisar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
