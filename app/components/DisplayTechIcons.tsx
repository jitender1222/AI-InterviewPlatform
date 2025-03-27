import { getTechLogos } from "@/lib/utils";
import Image from "next/image";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className="relative group bg-dark-300 rounded-full p-2 flex-center"
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            height={100}
            width={100}
            alt="image"
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
