import Avatar from "../../atoms/avatar";
import Chip from "../../atoms/chip";

type EpisodeProps = {
  title: string;
  date: string;
  categories: {
    name: string;
    id: string;
  }[];
  persons: {
    name: string;
    photoUrl: string;
    id: string;
  }[];
  thumbnail: string;
};

const Episode = (props: EpisodeProps) => {
  const date = new Date(props.date);
  const formattedDate = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace("de ", "");
  return (
    <div>
      <div className="w-full h-56 rounded-2xl bg-slate-400 flex flex-row justify-end p-2 gap-x-2">
        <Chip label={props.categories[0].name} />
        <Chip label={`+${props.categories.length - 1}`} />
      </div>
      <div className="flex flex-row justify-between mt-2">
        <span>
          <h5 className="font-bold text-2xl text-white">{props.title}</h5>
          <p className="text-sm text-zinc-400">Exibido em {formattedDate}</p>
        </span> 
        <span className="flex flex-row">
            {props.persons.map((person) => (
                <Avatar key={person.id} name={person.name} />
            ))}
        </span>
      </div>
    </div>
  );
};

export default Episode;
