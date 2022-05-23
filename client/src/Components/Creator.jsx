import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGame, getGenres, getVideogames } from "../store/actions";
import Loader from "./Loader";
import "./Styles/Creator.css";
function validateForms(input) {
  let error = {};
  if (!input.name) {
    error.name = "Name required";
  }
  if (input.description.length < 10) {
    error.description =
      "Description too short; write something above 10 characters";
  }
  if (!input.image.includes("https")) {
    error.image = "Please put a valid URL";
  }
  if (input.rating < 1 || input.rating > 5) {
    error.rating = "The value must be a number between 1 and 5";
  }
  if (input.releaseDate === null) {
    error.releaseDate = "Release date cannot be empty";
  }
  if (!input.platforms.length) {
    error.platforms = "Please select the platforms";
  }
  if (!input.genres.length) {
    error.genres = "Select at least one genre";
  }
  return error;
}
const Creator = () => {
  const dispatch = useDispatch();
  const gens = useSelector((state) => state.genres);
  const navi = useNavigate();
  let [error, setError] = useState({});
  let [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    rating: "",
    platforms: [],
    genres: [],
    releaseDate: "",
  });
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validateForms({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleClick() {
    navi(-1);
  }
  function handleSubmit(e) {
    e.preventDefault(e);
    dispatch(createGame(input));
    alert("Thanks");
    setInput({
      name: "",
      description: "",
      image: "",
      releaseDate: "",
      rating: "",
      platforms: [],
      genres: [],
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...input.genres, e.target.value].filter(Boolean),
    });
  }
  function handlePlats(e) {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value].filter(Boolean),
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== el),
    });
  }
  if (gens.length) {
    return (
      <div className="containerCreator" key="rootCreator">
        <h1> GAME to be created:</h1>
        <form className="formS" key="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={input.name}
                name="name"
                required
                onChange={(e) => handleChange(e)}
              />
              {error.name && <p>{error.name} </p>}
            </label>
          </div>
          <div>
            <label>
              Description:
              <input
                type="text"
                value={input.description}
                name="description"
                required
                onChange={(e) => handleChange(e)}
              />
              {error.description && <p>{error.description} </p>}
            </label>
          </div>
          <div>
            <label>
              Image:
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
          <div>
            <label>
              Rating:
              <input
                type="number"
                value={input.rating}
                name="rating"
                min="0"
                required
                onChange={(e) => handleChange(e)}
              />
              {error.rating && <p>{error.rating} </p>}
            </label>
          </div>
          <div>
            <label>
              Released:
              <input
                type="text"
                required
                value={input.released}
                name="released"
                onChange={(e) => handleChange(e)}
              />
              {error.releaseDate && <p>{error.releaseDate} </p>}
            </label>
          </div>
          <div>
            <label>
              Platforms:
              <select name="platforms" onChange={(e) => handlePlats(e)}>
                <option value="">-</option>
                <option value="PlayStation 3">PS3</option>
                <option value="PlayStation 4">PS4</option>
                <option value="PlayStation 5">PS5</option>
                <option value="PS Vita">PS Vita</option>
                <option value="Wii">Wii</option>
                <option value="Wii U">Wii U</option>
                <option value="Nintendo Switch">Switch</option>
                <option value="PC">PC</option>
                <option value="Linux">Linux</option>
                <option value="macOS">macOS</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="Xbox 360">Xbox 360</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Xbox Series S/X">Xbox Series</option>
              </select>
              {error.platforms && <p>{error.platforms} </p>}
            </label>
          </div>
          <label>
            Genres:
            <select name="genres" onChange={(e) => handleSelect(e)}>
              <option value="">-</option>
              {gens?.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </select>
            {error.genres && <p>{error.genres} </p>}
          </label>
          <button
            onClick={handleClick}
            disabled={Object.keys(error).length}
            type="submit"
          >
            Send to database
          </button>
        </form>
        <ul>
          <span>Estoy muy feliz de estar acá</span>
          {input.gens?.map((el) => (
            <div>
              <button onClick={() => handleDelete(el)}>x</button>
              <p>PAPEL DE DIARIO{el}</p>
            </div>
          ))}
        </ul>
        <button onClick={handleClick}>Back</button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Creator;
