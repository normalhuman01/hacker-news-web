import Image from "next/image";
import { useState } from "react";
import angleDown from "../public/images/angle-down-solid.svg";
import angular from "../public/images/angular.png";
import reactjs from "../public/images/react.png";
import vuejs from "../public/images/vue.png";

type SelectProps = {
  placeholder: string;
  value: string;
  onSelect: Function;
};

const items = [
  {
    key: "angular",
    label: "Angular",
    icon: <Image src={angular} alt="angular" width={24} />,
  },
  {
    key: "reactjs",
    label: "React",
    icon: <Image src={reactjs} alt="reactjs" width={24} />,
  },
  {
    key: "vuejs",
    label: "Vuejs",
    icon: <Image src={vuejs} alt="vuejs" width={24} />,
  },
];

export const Select = ({ placeholder, value, onSelect }: SelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="relative w-[18rem]"
        onBlur={() => {
          setOpen(false);
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded bg-white p-2 pl-4 ring-1 ring-neutral-800"
        >
          <span>
            {value == ""
              ? placeholder
              : items.find((x) => x.key === value)?.label}
          </span>
          <span className="text-2xl w-4 h-4 grid place-content-center">
            <Image src={angleDown} alt="angle down" />
          </span>
        </button>

        {open && (
          <ul className="z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300">
            {items.map((x) => (
              <li
                key={x.key}
                className="cursor-pointer select-none p-2 hover:bg-gray-200 flex gap-2 align-items"
                onMouseDown={() => onSelect(x.key)}
              >
                {x.icon} {x.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
