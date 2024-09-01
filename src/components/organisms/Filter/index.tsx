'use client'

import { useMemo, useState } from "react";
import { Picker } from "../../molecules/picker";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Category, Item, Person } from "@/types/global";

type FilterProps = {
  categories: Category[];
  persons: Person[];
};

const Filter = ({ categories, persons }: FilterProps) => {
  const [person, setPerson] = useState<Item[]>([]);
  const [category, setCategory] = useState<Item[]>([]);

  const personList = useMemo(() => {
    return persons.map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }, [persons]);

  const categoryList = useMemo(() => {
    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [categories]);
  return (
    <aside className="flex flex-col gap-5 bg-zinc-800 p-4 rounded-2xl w-[28%]">
      <h4 className="text-xl font-bold w-fit">Filtros</h4>
      <div></div>
      <form className="flex flex-col gap-5 w-fit">
        <span className="w-full">
          <Label htmlFor="title" className="">
            Titulo
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Informe ao menos 3 caracteres..."
            className="bg-zinc-700 rounded-lg p-2 w-full"
          />
        </span>
        <span className="flex flex-row flex-wrap gap-2 items-center justify-between">
          <Label htmlFor="startDate" className="w-full">
            Data
          </Label>
          <Input
            id="startDate"
            type="date"
            className="bg-zinc-700 rounded-lg p-2 w-fit"
            placeholder="Data inicial"
          />
          <p>até</p>
          <Input
            id="endDate"
            type="date"
            className="bg-zinc-700 rounded-lg p-2 w-fit"
            placeholder="Data final"
          />
        </span>
        <span className="flex flex-col flex-wrap">
          <Label htmlFor="persons" className="w-full mb-2">
            Categorias
          </Label>
          <Picker
            options={categoryList}
            selected={category}
            onChange={(v) => setCategory(v)}
          />
        </span>
        <span className="flex flex-col flex-wrap">
          <Label htmlFor="persons" className="w-full mb-2">
            Participantes
          </Label>
          <Picker
            options={personList}
            selected={person}
            onChange={(v) => setPerson(v)}
          />
        </span>
      </form>
    </aside>
  );
};

export default Filter;
