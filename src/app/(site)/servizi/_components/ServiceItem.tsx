import { classNames } from "@/lib/utils/classNames";

interface ServiceItemProps {
  index: number;
  text: string;
}

/** Alternates sides down the page, as on the original. */
export const ServiceItem: React.FC<ServiceItemProps> = ({ index, text }) => {
  const onLeft = index % 2 !== 0;

  return (
    <li
      className={classNames(
        "flex w-full items-center bg-primary/90 px-5 py-8 text-white md:min-h-40 md:w-[70vw]",
        onLeft ? "self-start md:justify-end" : "self-end md:justify-start"
      )}
    >
      <div className="flex items-start gap-6 md:w-[40vw] md:items-center">
        <span className="text-5xl font-bold md:text-8xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-base font-bold md:text-xl">{text}</span>
      </div>
    </li>
  );
};
