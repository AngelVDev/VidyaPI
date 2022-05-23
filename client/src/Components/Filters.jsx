import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  getGenres,
  getVideogames,
  orderByName,
  orderByRating,
  showCreated,
} from "../store/actions";

const Filters = ({ currentPage, setCurrentPage }) => {
  const thoseGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };
  const handleOrderRating = (e) => {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
  };
  const handleFilterGen = (e) => {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
  };
  const handleFilterSrc = (e) => {
    e.preventDefault();
    dispatch(showCreated(e.target.value));
  };
  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };

  return (
    <>
      <button onClick={(e) => handleReset(e)}>RESET</button>
      <label>
        Sort by name
        <select onChange={(e) => handleOrderName(e)}>
          <option value="">-</option>
          <option value="ASC">A to Z</option>
          <option value="DSC">Z to A</option>
        </select>
      </label>
      <label>
        Sort by rating
        <select onChange={(e) => handleOrderRating(e)}>
          <option value="">-</option>
          <option value="Low">Low to hi</option>
          <option value="High">Hi to low</option>
        </select>
      </label>
      <label>
        Filter by genre
        <select onChange={(e) => handleFilterGen(e)}>
          <option value="ALL">All</option>
          {thoseGenres?.map((genre) => {
            return <option key={genre.id}>{genre.name}</option>;
          })}
        </select>
      </label>
      <label>
        Filter by source
        <select onChange={(e) => handleFilterSrc(e)}>
          <option value="MIX">Mixed</option>
          <option value="API">API</option>
          <option value="DB">Createds</option>
        </select>
      </label>
    </>
  );
};

export default Filters;
