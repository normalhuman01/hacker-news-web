import Image from "next/image";
import headerText from "../public/images/hacker.svg";

export const Header = () => {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0, 21, 41, 0.12)",
        boxShadow: "0 1px 4px 0 rgba(0, 21, 41, 0.12)",
        paddingLeft: "7rem",
      }}
    >
      <Image className="py-6" src={headerText} alt="title" />
    </div>
  );
};
