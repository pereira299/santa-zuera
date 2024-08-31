import Image from "next/image";

type AvatarProps = {
  image?: string;
  name: string;
  className?: string;
  stacked?: boolean;
  noTooltip?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  onChange?: () => void;
};

const Avatar = ({
  image,
  name,
  className,
  ...props
}: AvatarProps) => {
  const photo =
    image ||
    `https://avatar.iran.liara.run/username?username=${name.replace(
      /\s/g,
      "+"
    )}`;
    let avatarSize: number;

    switch (props.size) {
      case "sm":
        avatarSize = 32;
        break;
      case "md":
        avatarSize = 40;
        break;
      case "lg":
        avatarSize = 55;
        break;
      case "xl":
        avatarSize = 72;
        break;
      case "2xl":
        avatarSize = 96;
        break;
      default:
        avatarSize = 40;
        break;
    }
  return (
    <div className={`hover:z-50 group ${props.stacked ? "-ml-5" : ""} ${className}`}>
      {!props.noTooltip && (
        <span className="text-white group-hover:opacity-100 opacity-0 -mt-8 bg-zinc-700 px-2 py-1 absolute rounded-full before:absolute before:border-8 before:border-solid before:border-transparent before:mt-[1.6rem] before:ml-0 before:border-t-zinc-700 before:content-['']">
          {name}
        </span>
      )}
      <Image
        src={photo}
        alt="Avatar"
        width={avatarSize}
        height={avatarSize}
        className={`rounded-full ${
          props.stacked ? "border-2 border-black border-collapse " : ""
        }`}
      />
    </div>
  );
};

export default Avatar;
