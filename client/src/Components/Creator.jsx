import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGame, getGenres, getVideogames } from "../store/actions";
import Loader from "./Loader";
import "./Styles/Creator.css";
import { Button1, Button2, InputF, Select1 } from "./Styles/Styled";
function validateForms(input) {
  let error = {};
  if (input.name.length < 1) {
    error.name = "Name required";
  }
  if (input.description.length < 10) {
    error.description =
      "Description too short; write something above 10 characters";
  }
  if (isNaN(input.rating) === false && (input.rating < 1 || input.rating > 5)) {
    error.rating = "The value must be a number between 1 and 5";
  }
  if (input.releaseDate.length <= 0) {
    error.releaseDate = "Release date cannot be empty";
  }
  if (input.platforms.length <= 0) {
    error.platforms = "Please select the platforms";
  }
  if (input.genres.length <= 0) {
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
  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e),
    });
  }
  function handleDeletePlat(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((g) => g !== e),
    });
  }

  if (gens) {
    return (
      <div className="containerCreator" key="rootCreator">
        <h1 id="acheuno"> CREATE YOUR GAME</h1>
        <form className="formS" key="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>
              NAME:
              <InputF
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {error.name && <p className="error">{error.name} </p>}
            </label>
          </div>
          <div>
            <label>
              DESCRIPTION:
              <InputF
                type="text"
                value={input.description}
                name="description"
                onChange={(e) => handleChange(e)}
              />
              {error.description && (
                <p className="error">{error.description} </p>
              )}
            </label>
          </div>
          <div>
            <label>
              IMAGE:
              <InputF
                type="url"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
            </label>
          </div>
          <div>
            <label>
              RATING:
              <InputF
                type="number"
                value={input.rating}
                name="rating"
                onChange={(e) => handleChange(e)}
              />
              {error.rating && <p className="error">{error.rating} </p>}
            </label>
          </div>
          <div>
            <label>
              RELEASED:
              <InputF
                type="text"
                value={input.releaseDate}
                name="releaseDate"
                onChange={(e) => handleChange(e)}
              />
              {error.releaseDate && (
                <p className="error">{error.releaseDate} </p>
              )}
            </label>
          </div>
          <div>
            <label>
              PLATFORMS:
              <Select1 name="platforms" onChange={(e) => handlePlats(e)}>
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
              </Select1>
              {error.platforms && <p className="error">{error.platforms} </p>}
            </label>
          </div>
          <label>
            GENRES:
            <Select1 name="genres" onChange={(e) => handleSelect(e)}>
              <option value="">-</option>
              {gens?.map((el) => (
                <option key={el.id} value={el.name}>
                  {el.name}
                </option>
              ))}
            </Select1>
            {error.genres && <p className="error">{error.genres} </p>}
          </label>
          <Button2
            onClick={handleClick}
            disabled={Object.keys(error).length}
            type="submit"
          >
            SEND TO DATABASE
          </Button2>
        </form>
        {input.genres.length > 0 && (
          <div className="Deleter" key={"Dof"}>
            <label>Selected genres:</label>
            {input.genres.map((e) => (
              <button className="delButton" onClick={() => handleDelete(e)}>
                {e} x
              </button>
            ))}
          </div>
        )}
        {input.platforms.length > 0 && (
          <div className="Deleter" key={"Plaf"}>
            <label>Selected platforms:</label>
            {input.platforms.map((e) => (
              <button className="delButton" onClick={() => handleDeletePlat(e)}>
                {e} x
              </button>
            ))}
          </div>
        )}
        <Button1 onClick={handleClick}>Back</Button1>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Creator;
