import React, { useEffect, useState } from "react";

export type AccordianProps = {
  deckLinks: any;
};

interface DropdownOption {
  category: string;
  slug: string;
}

const Accordian = ({ deckLinks }: AccordianProps) => {
  useEffect(() => {
    const cardArray = deckLinks.nodes;
    const categoriesMap = {};

    // @ts-ignore
    cardArray.forEach((team) => {
      // @ts-ignore
      if (!categoriesMap[team.category]) {
        // @ts-ignore
        categoriesMap[team.category] = {
          category: team.category,
          teams: [],
        };
      }
      // @ts-ignore
      categoriesMap[team.category].teams.push({
        team: team.title,
        slug: team.slug,
      });
    });

    // Convert the categoriesMap object into an array of categories
    const categoriesArray: DropdownOption[] = Object.values(categoriesMap);
    setCats(categoriesArray);
  }, []);

  const [cats, setCats] = useState<DropdownOption[]>([]);
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState([]);

  // @ts-ignore
  const dropDown1handler = (e) => {
    setDropdown1Value(e.target.value);
  };

  useEffect(() => {
    // @ts-ignore
    const decksInPlay = deckLinks.nodes.filter(
      // @ts-ignore
      (deck) => deck.category === dropdown1Value
    );

    const uniqueObjects = [];
    const uniqueTitlesAndSlugs = new Set();

    for (const obj of decksInPlay) {
      const key = `${obj.title}-${obj.slug}`;
      if (!uniqueTitlesAndSlugs.has(key)) {
        uniqueObjects.push(obj);
        uniqueTitlesAndSlugs.add(key);
      }
    }
    // @ts-ignore
    setDropdown2Value(uniqueObjects);
  }, [dropdown1Value]);

  // @ts-ignore
  const handleChangeMode = (e) => {
    e.preventDefault();
    const deck = e.target[1].value;
    const version = e.target[2].value;
    // Redirect the user based on dropdown values
    const redirectUrl = `/${deck}/${version}`;
    // Do all our URL validation here
    window.location.href = redirectUrl;
  };

  return (
    <form onSubmit={handleChangeMode}>
      {/* dropdown1 */}
      <div className="mb-4">
        <label className="block text-black font-bold mb-2">
          Select Category:
        </label>
        <select
          className="w-full bg-gray-200 border border-gray-400 rounded py-2 px-4"
          value={dropdown1Value}
          onChange={dropDown1handler}
          required
        >
          <option value="">Select an option</option>
          {cats.map((option, index) => (
            <option key={index} value={option.category}>
              {option.category}
            </option>
          ))}
        </select>
      </div>
      {/* dropdown2 */}
      <div className="mb-4">
        <label className="block text-black font-bold mb-2">Select Deck:</label>
        <select
          required
          className="w-full bg-gray-200 border border-gray-400 rounded py-2 px-4"
        >
          <option value="">Select an option</option>
          {dropdown2Value.map((option, index) => (
            // @ts-ignore
            <option key={index} value={option.slug}>
              {/* @ts-ignore */}
              {option.title}
            </option>
          ))}
        </select>
      </div>

      {/* dropdown3 */}
      <div className="mb-4">
        <label className="block text-black font-bold mb-2">
          Select game mode:
        </label>
        <select className="w-full bg-gray-200 border border-gray-400 rounded py-2 px-4">
          <option value={"classic"}>Classic</option>
          <option value={"lite"}>Lite</option>
        </select>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded w-full">
        Go
      </button>
    </form>
  );
};

export default Accordian;
