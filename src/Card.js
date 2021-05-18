import React, { useState } from "react";
import "./Card.css";

const Card = ({ id, name, imgSrc }) => {
  const [{ angle, xOffset, yOffset }] = useState({
    angle: Math.random() * 90 - 45,
    xOffset: Math.random() * 50 - 25,
    yOffset: Math.random() * 50 - 25,
  });

  const transform = `translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`;
  return (
    <img
      className="Card"
      key={id}
      src={imgSrc}
      alt={name}
      style={{ transform }}
    />
  );
};

export default Card;
