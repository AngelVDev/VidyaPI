import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetails } from "../store/actions";
import Loader from "./Loader";
import "./Styles/Details.css";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gemu = useSelector((state) => state.gameDetail);
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);
  if (gemu.id) {
    return (
      <div id="MASTERCARD">
        <div id="detailContainer">
          <h2>{gemu.name}</h2>
          <img
            src={
              gemu.image
                ? gemu.image
                : "https://media0.giphy.com/media/YPKMYvgpJf7ZTl0OIk/giphy.gif"
            }
            alt="game"
          />
          <p dangerouslySetInnerHTML={{ __html: gemu.description }} />
          <p alt="Release">{gemu.released}</p>
          <p alt="Rating">Overall rating: {gemu.rating} </p>
          <p alt="Platforms">
            {" "}
            Available in:{" "}
            {gemu.platforms?.map((el) => (
              <span>{el}</span>
            ))}
          </p>
          <p>
            Genres:{" "}
            {!gemu.genres
              ? "Not defined"
              : gemu.genres?.map((el) => <span>{el.name}</span>)}
          </p>
        </div>
        <button>
          <Link to="/home">Let's go back</Link>
        </button>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Detail;
