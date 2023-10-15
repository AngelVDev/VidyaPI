import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filterByGenre,
  getGenres,
  getVideogames,
  orderByName,
  orderByRating,
  showCreated,
} from "../store/actions";
import { Button1, Button2, Select1 } from "./Styles/Styled";

const Filters = ({ gens, setCurrentPage }) => {
  const dispatch = useDispatch();

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
    setCurrentPage(1);
    dispatch(showCreated(e.target.value));
  };
  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getVideogames());
  };
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  return (
    <>
      <Button2 onClick={(e) => handleReset(e)}>RESET</Button2>
      <label>
        Sort by name
        <Select1 onChange={(e) => handleOrderName(e)}>
          <option value="">-</option>
          <option value="ASC">A to Z</option>
          <option value="DSC">Z to A</option>
        </Select1>
      </label>
      <label>
        Sort by rating
        <Select1 onChange={(e) => handleOrderRating(e)}>
          <option value="">-</option>
          <option value="Low">Low to hi</option>
          <option value="High">Hi to low</option>
        </Select1>
      </label>
      <label>
        Filter by genre
        <Select1 onChange={(e) => handleFilterGen(e)}>
          <option value="ALL">All</option>
          {gens &&
            gens?.map((genre) => {
              return <option key={genre?.id}>{genre?.name}</option>;
            })}
        </Select1>
      </label>
      <label>
        Filter by source
        <Select1 onChange={(e) => handleFilterSrc(e)}>
          <option value="MIX">Mixed</option>
          <option value="API">API</option>
          <option value="DB">Createds</option>
        </Select1>
      </label>
    </>
  );
};

export default Filters;
