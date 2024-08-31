import Image from "next/image";

type AvatarProps = {
  image?: string;
  name: string;
  className?: string;
  onChange?: () => void;
};

const Avatar = ({ image, name, className, onChange }: AvatarProps) => {
  const photo =
    image ||
    `https://avatar.iran.liara.run/username?username=${name.replace(
      /\s/g,
      "+"
    )}`;

  return (
    <div className={`hover:z-50 tooltip ${className}`}>
      <span className="tooltiptext">{name}</span>
      <Image
        src={photo}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
