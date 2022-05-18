import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  getGenres,
  orderByName,
  orderByRating,
  showCreated,
} from "../store/actions";

const Filters = () => {
  const thoseGenres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const handleOrderName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };
  const handleOrderRating = (f) => {
    f.preventDefault();
    dispatch(orderByRating(f.target.value));
  };
  const handleFilterGen = (c) => {
    c.preventDefault();
    dispatch(filterByGenre(c.target.value));
  };
  const handleFilterSrc = (k) => {
    k.preventDefault();
    dispatch(showCreated(k.target.value));
  };

  return (
    <>
      <label>
        Sort by name
        <select onChange={(e) => handleOrderName(e)}>
          <option value="ASC">A to Z</option>
          <option value="DSC">Z to A</option>
        </select>
      </label>
      <label>
        Sort by rating
        <select onChange={(f) => handleOrderRating(f)}>
          <option value="Low">Low to hi</option>
          <option value="High">Hi to low</option>
        </select>
      </label>
      <label>
        Filter by genre
        <select onChange={(c) => handleFilterGen(c)}>
          <option value="ALL">All</option>
          {thoseGenres?.map((genre) => {
            return <option key={genre.id}>{genre.name}</option>;
          })}
        </select>
      </label>
      <label>
        Filter by source
        <select onChange={(k) => handleFilterSrc(k)}>
          <option value="MIX">Mixed</option>
          <option value="API">API</option>
          <option value="DB">Createds</option>
        </select>
      </label>
    </>
  );
};

export default Filters;
