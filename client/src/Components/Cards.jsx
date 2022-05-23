import React from "react";
import "./Styles/Cards.css";

const Cards = ({ image, name, genres, rating }) => {
  return (
    <div id="container">
      <div id="info">
        <h1>{name}</h1>
        <p>
          Genres:{" "}
          {genres?.map((el) => (
            <span key={el.name + "id"} id="genR">
              {el.name}
            </span>
          ))}
        </p>
        <h2>✨: {rating}</h2>
      </div>
      <img src={image} preload="true" alt="cardimgerror" />
    </div>
  );
};
export default Cards;
