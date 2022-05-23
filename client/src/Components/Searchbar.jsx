import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQVideogames } from "../store/actions";
import "./Styles/Searchbar.css";

const SearchBar = () => {
  let dispatch = useDispatch();
  let [name, setName] = useState("");
  let handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getQVideogames(name));
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getQVideogames(name));
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search your game here"
        onChange={(e) => handleInputChange(e)}
      />
      <button className="Sub" type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
