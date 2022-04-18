import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getQRecipes } from "../store/actions";
import "./Styles/SearchBar.css"

const SearchBar = () => {
  let dispatch = useDispatch();
  let [name, setName] = useState("");
  let handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getQRecipes(name));
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