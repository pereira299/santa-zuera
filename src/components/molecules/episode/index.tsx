import Avatar from "../../atoms/avatar";
import Chip from "../../atoms/chip";

type EpisodeProps = {
  title: string;
  publishDate: string;
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
  className?: string;
};

const Episode = (props: EpisodeProps) => {
  const date = new Date(props.publishDate);
  const formattedDate = Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace("de ", "");

  const persons =
    props.persons.length > 3
      ? [
          ...props.persons.slice(0, 2),
          {
            name: `%2B${props.persons.length - 2}`,
            photoUrl: "",
            id: "",
          },
        ]
      : props.persons;
  return (
    <div className={`${props.className} hover:brightness-90`}>
      <div
        className="w-full h-56 rounded-2xl transition-all duration-200 bg-center bg-cover hover:bg-[size:120%] bg-slate-400 flex flex-row justify-end p-2 gap-x-2"
        style={{
          backgroundImage: `url(${props.thumbnail})`,
        }}
      >
        <Chip label={props.categories[0].name} />
        {props.categories.length > 1 && (
          <Chip label={`+${props.categories.length - 1}`} />
        )}
      </div>
      <div className="flex flex-row justify-between mt-2">
        <span className="w-8/12">
          <h5 className="font-bold text-2xl text-white">{props.title}</h5>
          <p className="text-sm text-zinc-400">Exibido em {formattedDate}</p>
        </span>
        <span className="flex flex-row">
          {persons.map((person) => (
            <Avatar
              key={person.id}
              name={person.name}
              image={person.photoUrl}
              stacked
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default Episode;
