import React from "react";
import "./Styles/Cards.css";

const Cards = ({image, name, genres}) => {
  return (
      <div id="container">
        <div id="info">
        <h1>{name}</h1>
        <p>Genres: {genres?.map((el)=> el.name + ";  ")}</p>
        </div>
        <img src={image} alt="cardimgerror" />
      </div>
  );
};
export default Cards;