import React, { useState } from "react";
import { ReactNode } from "react";
import AboutPopup from "../AboutPopup";
import SettingsPopup from "../SettingsPopup";
import StatsPopup from "../StatsPopup";
import Sidemenu from "../Sidemenu/Sidemenu";
import { AiOutlineMenu } from "react-icons/ai";

export type HeaderProps = {
  children?: ReactNode;
  variant?: "game" | "menu";
  navbarOpen?: any;
  setNavbarOpen?: any;
  deckLinks: any;
  restart: any;
};

const Header = ({ children, deckLinks }: HeaderProps) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const buttonHandler = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <header className="w-full border-b-2 border-white flex justify-between">
      <div className="flex items-center">
        <button className="text-4xl p-2" onClick={buttonHandler}>
          <AiOutlineMenu />
        </button>
      </div>
      <Sidemenu
        deckLinks={deckLinks}
        showSidebar={showSidebar}
        onClickHandler={buttonHandler}
      />
      {children}
      <div className="flex items-center">
        <AboutPopup />
        <StatsPopup />
        <SettingsPopup />
      </div>
    </header>
  );
};

export default Header;
