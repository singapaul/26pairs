import React from "react";
// @ts-ignore
import useDarkMode from "use-dark-mode";

export type DarkModeToggleProps = {};

const DarkModeToggle = ({}: DarkModeToggleProps) => {
  // @ts-ignore
  const darkModeLogic = useDarkMode(undefined, { classNameDark: "dark" });

  // Remove the isChecked state since we can get the dark mode state from darky.value
  // @ts-ignore
  const checkHandler = (event) => {
    event.preventDefault();
    darkModeLogic.toggle(); // Call the toggle function to toggle dark mode
  };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <label
          htmlFor="checkbox"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            id="checkbox"
            type="checkbox"
            className="sr-only peer"
            // onChange={checkHandler}
            // checked={darkModeLogic.value} // Use darky.value to determine the checked state
            defaultChecked
          />
          {/* Updated slider styles for animation */}
          <div
            // onClick={checkHandler}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
        </label>
      </div>
    </div>
  );
};

export default DarkModeToggle;
