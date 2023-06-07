import React from "react";
import Dropdown from "../Dropdown";

export type AccordianProps = {
  children?: any;
};

const Accordian = ({ children }: AccordianProps) => {
  const gameModeArray = [
    { title: "Classic Version", subtitle: "26Pairs" },
    { title: "Lite Version", subtitle: "11Pairs" },
  ];

  const sportModeArray = [
    { title: "Football", subtitle: "From premier to sunday league" },
  ];

  const leagueModeArray = [
    { title: "Premier League", subtitle: "" },
    { title: "Championship", subtitle: "" },
    { title: "League One", subtitle: "" },
    { title: "League Two", subtitle: "" },
  ];

  const TeamsArray = [
    { title: "Liverpool FC", subtitle: "" },
    { title: "Chelsea FC", subtitle: "" },
    { title: "Wrexham FC", subtitle: "" },
    { title: "Chester FC", subtitle: "" },
  ];

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
  };

  return (
    <div className="w-full overflow-y">
      <form onSubmit={handleFormSubmit}>
        <Dropdown title={"Game Mode"} buttonArray={gameModeArray} />
        <Dropdown title={"Sport"} buttonArray={sportModeArray} />
        <Dropdown title={"League"} buttonArray={leagueModeArray} />
        <Dropdown title={"Team"} buttonArray={TeamsArray} />
        <button
          className="border-2 m-12 w-52 h-52 text-5xl bg-blue-400"
          type="submit"
        >
          CLICK ME
        </button>
      </form>
    </div>
  );
};

export default Accordian;
