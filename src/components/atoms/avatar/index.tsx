import Image from "next/image";

type AvatarProps = {
  image?: string;
  name: string;
  className?: string;
  stacked: boolean;
  onChange?: () => void;
};

const Avatar = ({ image, name, className, onChange, stacked }: AvatarProps) => {
  const photo =
    image ||
    `https://avatar.iran.liara.run/username?username=${name.replace(
      /\s/g,
      "+"
    )}`;

  return (
    <div className={`hover:z-50 group ${stacked ? "-ml-5": ""} ${className}`}>
      <span className="text-white group-hover:opacity-100 opacity-0 -mt-8 bg-zinc-700 px-2 py-1 absolute rounded-full before:absolute before:border-8 before:border-solid before:border-transparent before:mt-[1.6rem] before:ml-0 before:border-t-zinc-700 before:content-['']">
        {name}
      </span>
      <Image
        src={photo}
        alt="Avatar"
        width={40}
        height={40}
        className={`rounded-full ${stacked ? "border-2 border-black border-collapse " : ""}`}
      />
    </div>
  );
};

export default Avatar;
