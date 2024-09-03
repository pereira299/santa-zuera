"use client";

import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Picker } from "../../molecules/picker";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Category, Item, Person } from "@/types/global";
import { Button } from "../../ui/button";
import Chip from "../../atoms/chip";

type FilterProps = {
  categories: Category[];
  persons: Person[];
};

const Filter = (props: FilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [persons, setPersons] = useState<Person[]>([]);
  const [person, setPerson] = useState<Item[]>([]);
  const [category, setCategory] = useState<Item[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");

  useLayoutEffect(() => {
    const filters = window.sessionStorage.getItem("filters");
    if (!filters) return;
    const res = JSON.parse(filters);
    setPerson(res.person || []);
    setCategory(res.category || []);
    setStartDate(res.startDate || "");
    setEndDate(res.endDate || "");
    setTitle(res.title || "");
  }, []);

  const personList = useMemo(() => {
    if (persons.length === 0)
      return props.persons.map((person) => ({
        value: person.id,
        label: person.name,
      }));

    return persons.map((person) => ({
      value: person.id,
      label: person.name,
    }));
  }, [props.persons, persons]);

  const categoryList = useMemo(() => {
    if (categories.length === 0)
      return props.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));
    return categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  }, [props.categories, categories]);

  const activeFilters = useMemo(() => {
    return [
      person.length > 0 ? "Participantes" : "",
      category.length > 0 ? "Categorias" : "",
      startDate ? "Data inicial" : "",
      endDate ? "Data final" : "",
      title ? "Titulo" : "",
    ].filter((v) => v);
  }, [person, category, startDate, endDate, title]);

  const removeFilter = (filter: string) => {
    switch (filter) {
      case "Participantes":
        setPerson([]);
        break;
      case "Categorias":
        setCategory([]);
        break;
      case "Data inicial":
        setStartDate("");
        break;
      case "Data final":
        setEndDate("");
        break;
      case "Titulo":
        setTitle("");
        break;
    }
  };

  const clearFilters = () => {
    setPerson([]);
    setCategory([]);
    setStartDate("");
    setEndDate("");
    setTitle("");

    window.sessionStorage.removeItem("filters");
    window.location.href = `/episodios`;
  };

  const searchCategory = async (search: string) => {
    if (!search.length) setCategories([]);
    if (search.length < 3)
      setCategories([{ id: "", name: "Informe ao menos 3 caracteres" }]);

    const data = await fetch(`/api/categories?search=${search}`).then((res) =>
      res.json()
    );

    setCategories(data.items);
  };

  const searchPerson = async (search: string) => {
    if (!search) {
      setPersons([]);
      return;
    }
    if (search.length < 3) {
      setPersons([
        {
          id: "",
          name: "Informe ao menos 3 caracteres",
          photoUrl: "",
          instagramUrl: "",
        },
      ]);
      return;
    }

    const data = await fetch(`/api/persons?search=${search}`).then((res) =>
      res.json()
    );
    setPersons(data.items);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters = {
      person,
      category,
      startDate,
      endDate,
      title,
    };
    const params: string[][] = [];
    Object.entries(filters)
      .filter(([_, v]) => v)
      .forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((i) => params.push([`${k}[]`, i.value]));
          return;
        }
        params.push([k, v]);
      });

    window.sessionStorage.setItem(
      "filters",
      JSON.stringify({ person, category, startDate, endDate, title })
    );
    window.location.href = `/episodios?${params
      .map((p) => p.join("="))
      .join("&")}`;
  };
  return (
    <aside className="flex flex-col gap-4 bg-zinc-800 p-3 rounded-2xl w-full lg:w-[26vw] lg:fixed top-[10.2rem] 2xl:top-[11rem]">
      <h4 className="text-xl 2xl:text-3xl font-bold w-fit">Filtros</h4>
      <div className="flex flex-row flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            variant="outlined"
            remove
            onRemove={() => removeFilter(filter)}
          />
        ))}
        {activeFilters.length > 0 && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            className="font-bold text-zinc-400 w-fit px-1 2xl:text-lg"
          >
            Limpar
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <span className="flex flex-col flex-wrap">
          <Label htmlFor="persons" className="w-full mb-2 2xl:text-xl">
            Categorias <small>(máximo 3)</small>
          </Label>
          <Picker
            options={categoryList}
            selected={category}
            onChange={(v) => setCategory(v)}
            max={3}
            onload={true}
            onSearch={searchCategory}
          />
        </span>
        <span className="flex flex-col flex-wrap">
          <Label htmlFor="persons" className="w-full mb-2 2xl:text-xl">
            Participantes <small>(máximo 2)</small>
          </Label>
          <Picker
            options={personList}
            selected={person}
            onChange={(v) => setPerson(v)}
            max={2}
            onload={true}
            onSearch={searchPerson}
          />
        </span>
        <span className="w-full">
          <Label htmlFor="title" className="2xl:text-xl">
            Titulo
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Informe ao menos 3 caracteres..."
            className="bg-zinc-700 rounded-lg p-2 w-full 2xl:text-lg"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
          />
        </span>
        <Button type="submit">Filtrar</Button>
      </form>
    </aside>
  );
};

export default Filter;
