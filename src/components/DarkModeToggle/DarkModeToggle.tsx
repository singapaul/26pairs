import React, { useState } from "react";
// @ts-ignore
import useDarkSide from "./useDarkSide";
// import useDarkMode from "use-dark-mode";
// import useDarkMode from "use-dark-mode";

export type DarkModeToggleProps = {
  title?: any;
  buttonArray?: any;
};

const DarkModeToggle = ({ title, buttonArray }: DarkModeToggleProps) => {
  // const [colorTheme, setTheme] = useDarkSide();

  // const [darkSide, setDarkSide] = useState(
  //   colorTheme === "light" ? true : false
  // );

  // @ts-ignore
  const toggleDarkMode = () => {
    console.log("darkmode.value");
  };

  // const darkmode = useDarkMode(true);

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      <div className="flex">
        <button className="border-2 border-black" onClick={toggleDarkMode}>
          Press me
        </button>
        {/* <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={darkmode.value}
            readOnly
            // onChange={darkmode.toggle}
          />
          <div
            onClick={toggleDarkMode}
            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          ></div>
        </label> */}
      </div>
    </div>
  );
};

export default DarkModeToggle;
