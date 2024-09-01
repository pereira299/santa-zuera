import { Picker } from "@/src/components/molecules/picker";
import Filter from "@/src/components/organisms/Filter";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Category, Episode, Person } from "@/types/global";
import { useState } from "react";

const EpisodePage = async () => {
  const content = await getContent();
  return (
    <main className="min-h-screen px-10 pt-32">
      <h1 className="font-bitter text-4xl font-bold mb-5">Episódios</h1>
      <div className="w-full flex flex-row">
        <Filter persons={content.persons.items} categories={content.categories.items}/>
      </div>
    </main>
  );
};
export default EpisodePage;

export async function getContent(): Promise<{
  categories: { items: Category[] };
  persons: { items: Person[] };
}> {
  const categories = await fetch(`${process.env.BASE_URL}/api/categories`);
  const persons = await fetch(`${process.env.BASE_URL}/api/persons`);
  return {
    categories: await categories.json(),
    persons: await persons.json(),
  };
}
