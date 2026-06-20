import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { Fragment, useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";
export default function ThemeSwitch() {
  const { isDarkMode, setIsDarkMode } = useThemeContext();
  return (
    <div className="flex justify-center items-center gap-4">
      <Sun className="inline-block" />
      <Switch checked={isDarkMode} onChange={setIsDarkMode} as={Fragment}>
        {({ checked, disabled }) => (
          <button
            className={clsx(
              "group inline-flex h-6 w-11 items-center rounded-full",
              checked ? "bg-background-sec" : "bg-gray-200",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <span className="sr-only">Toggle dark mode</span>
            <span
              className={clsx(
                "size-4 rounded-full bg-white transition",
                checked ? "translate-x-6" : "translate-x-1",
              )}
            />
          </button>
        )}
      </Switch>
      <Moon className="inline-block" />
    </div>
  );
}
