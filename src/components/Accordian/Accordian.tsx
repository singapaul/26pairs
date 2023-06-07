import React, { useState } from "react";
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

  interface DropdownOption {
    label: string;
    value: string;
  }
  const [isOpen, setIsOpen] = useState(true);
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");

  const dropdown1Options: DropdownOption[] = [
    { label: "Classic Version", value: "" },
    { label: "Lite Version", value: "lite" },
  ];

  const dropdown2Options: DropdownOption[] = [
    { label: "Option A", value: "optionA" },
    { label: "Option B", value: "optionB" },
    { label: "Option C", value: "optionC" },
  ];
  // Save button handler
  const handleSave = () => {
    // Redirect the user based on dropdown values
    const redirectUrl = `/${dropdown1Value}`;
    console.log(redirectUrl);
    // Do all our URL validation here
    window.location.href = redirectUrl;
  };
  return (
    <div>
      <button
        className="w-full bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md mb-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close Accordion" : "Open Accordion"}
      </button>

      {isOpen && (
        <div className="bg-white rounded-md p-4">
          <div className="mb-4">
            <label className="block font-bold mb-2">Select game mode:</label>
            <select
              className="w-full bg-gray-200 border border-gray-400 rounded py-2 px-4"
              value={dropdown1Value}
              onChange={(e) => setDropdown1Value(e.target.value)}
            >
              <option value="">Select an option</option>
              {dropdown1Options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bold mb-2">Dropdown 2:</label>
            <select
              className="w-full bg-gray-200 border border-gray-400 rounded py-2 px-4"
              value={dropdown2Value}
              onChange={(e) => setDropdown2Value(e.target.value)}
            >
              <option value="">Select an option</option>
              {dropdown2Options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Accordian;
