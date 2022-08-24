import { useTheme } from "next-themes";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

type Props = {
  id: string;
};

const ThemeToggle: React.FC<Props> = ({ id }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex">
      {theme === "dark" ? (
        <BsMoon
          id={id}
          color="white"
          onClick={() => setTheme("light")}
          className="mr-2 hover:cursor-pointer"
        />
      ) : (
        <BsSun
          id={id}
          color="black"
          onClick={() => setTheme("dark")}
          className="mr-2 hover:cursor-pointer"
        />
      )}
    </div>
  );
};

export default ThemeToggle;
