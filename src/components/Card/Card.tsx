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
  cardBack?: any;
};

const Card = ({
  onClick,
  card,
  index,
  isInactive,
  isFlipped,
  isDisabled,
  version,
  cardBack = back,
}: CardProps) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
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
        <img
          src={cardBack}
          alt="Back of the playing card"
          className="picture-back"
        />
      </div>
      <div className="card-face card-back-face">
        <img
          src={card.image.url}
          className="picture-front"
          alt="Front of the playing card"
        />
      </div>
    </div>
  );
};

export default Card;
