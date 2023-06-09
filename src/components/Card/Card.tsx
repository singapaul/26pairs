import React from "react";
import classnames from "classnames";
import { ReactNode } from "react";
// @ts-ignore
import back from "../../assets/temp/clubs.png";
import "./Card.css";

export type CardProps = {
  children?: ReactNode;
  onClick?: any;
  card?: any;
  index?: any;
  isInactive?: any;
  isFlipped: any;
  isDisabled: any;
  version: "classic" | "lite";
};

// @to-do pass the card a prop telling the component if you're playing classic (52) or premier league version (24)
// so it takes a different CSS for sizing
const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
  version,
}: CardProps) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };
  return (
    // tailwind card classes
    // <div className="border-solid border-2 border-black bg-sky-500 h-12 w-12">
    //   {children}
    // </div>

    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive,
        classicCard: version === "classic",
        liteCard: version === "lite",
      })}
      onClick={handleClick}
    >
      <div className="card-face card-font-face">
        <img src={back} alt="pokeball" className="picture-back" />
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} className="picture-front" alt="pokeball" />
      </div>
    </div>
  );
};

export default Card;
