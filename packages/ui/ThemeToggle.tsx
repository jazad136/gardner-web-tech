import { useMemo } from "react";
import { useTheme } from "next-themes";
import { BsMoon, BsSun } from "react-icons/bs";
import Switch from "react-switch";
import cn from "classnames";

export interface ThemeToggleProps {
  isLarge: boolean;
  id: string;
  center?: boolean;
}

const ThemeToggle = ({ isLarge, id, center = true }: ThemeToggleProps) => {
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
          <BsSun color="white" className="lg:p-1.5 p-1 w-full h-full" />
        }
        checkedIcon={<BsMoon className="lg:p-1.5 p-1 w-full h-full" />}
      />
    </div>
  );
};

export default ThemeToggle;
