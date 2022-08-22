import cn from "classnames";
import { useTheme } from "next-themes";
import React, { useMemo } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import Switch from "react-switch";

type Props = {
  isLarge: boolean;
  id: string;
  center?: boolean;
};

const ThemeToggle: React.FC<Props> = ({ isLarge, id, center = true }) => {
  const { theme, setTheme } = useTheme();
  const isDark = useMemo(() => theme === "dark", [theme]);

  return (
    <div className="flex">
      <Switch
        id={id}
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Theme toggle"
        value="dark"
        boxShadow="none"
        activeBoxShadow="none"
        onColor="#2563EB"
        className={cn({ "mx-auto": center })}
        height={isLarge ? 28 : 22}
        width={isLarge ? 56 : 50}
        uncheckedIcon={
          <BsSun color="white" className="h-full w-full p-1 lg:p-1.5" />
        }
        checkedIcon={<BsMoon className="h-full w-full p-1 lg:p-1.5" />}
      />
    </div>
  );
};

export default ThemeToggle;
