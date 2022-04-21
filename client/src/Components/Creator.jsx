import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createGame, getGenres } from '../store/actions';

function validateForms (input)
{
  let error = {};
  if (input.name === null) {error.name = "Name required";} 
  if (input.description.length < 10) { error.description = "Description too short; write something above 10 characters";}
  if (input.image === null || input.image.includes(!"https//")) { error.image = "Please put a valid URL";}
  if (input.rating < 1 || input.rating > 5) {error.rating = "The value must be a number between 1 and 5"}
  if (!input.releaseDate) {error.releaseDate = "Release date cannot be empty"}
  if (!input.platforms) {error.platforms = "Please select the platforms"}
  if (!input.genres) {error.genres = "Select at least one genre";}
}
const Creator = () => {
  const dispatch = useDispatch();
  const gens = useSelector((state) => state.genres)
  const navi = useNavigate()
  let [error, setError] = useState({});
  let [input, setInput] = useState({
    name : "",
    image : "",
    description: "",
    rating: "",
    platforms: [],
    genres: [],
    releaseDate: "",
  })
  
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
      genres: [...input.gens, e.target.value],
    });
  }


  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.gens.filter(gen => gen !== el),
    });
  }
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div>
    <h1> GAME to be created:</h1>
  <form onSubmit={(e) => handleSubmit(e)}>
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
          min="1"
          max="5"
          value={input.rating}          
          name="rating"
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
          value={input.releaseDate}
          name="releaseDate"
          onChange={(e) => handleChange(e)}
        />
        {error.releaseDate && <p>{error.releaseDate} </p>}
      </label>
    </div>
    <div>
      <label>
            Platforms:
        <input
          type="text"
          value={input.platforms}
          name="platforms"
          required
          onChange={(e) => handleChange(e)}
        />
        {error.platforms && <p>{error.platforms} </p>}
      </label>
    </div>
        Genres:
        <select onChange={(e) => handleSelect(e)}>
          {gens?.map((el) => (
            <option value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        {error.gens && <p>{error.gens} </p>}
        <ul>
        {input?.gens.map((el) => (
          <div>
            <button onClick={() => handleDelete(el)}>x</button>
            <p>{el}</p>
          </div>
        ))}
        </ul>
        
  <button className="butt" type="submit">
    Create Recipe
  </button>
  <Link to="/home">
    <button className="butt">Back</button>
  </Link>
  <input type="text" placeholder="Paste the ID of a recipe" onChange={(e) => handleChange(e)}
  />
      </form>
  </div>
  )
}

export default Creator