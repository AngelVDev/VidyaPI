import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clear, getDetails } from "../store/actions";
import Loader from "./Loader";
import "./Styles/Details.css";
import { Button2 } from "./Styles/Styled";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gemu = useSelector((state) => state.gameDetail);
  const navi = useNavigate();
  function handleClick() {
    navi(-1);
  }
  useEffect(() => {
    dispatch(clear());
    dispatch(getDetails(id));
  }, [dispatch, id]);
  if (gemu.id) {
    return (
      <div className="MASTERCARD">
        <div className="detailContainer">
          <h2>{gemu.name}</h2>
          <img
            src={
              gemu.image
                ? gemu.image
                : "https://media0.giphy.com/media/YPKMYvgpJf7ZTl0OIk/giphy.gif"
            }
            alt="game"
          />
          <p
            className="desc"
            dangerouslySetInnerHTML={{ __html: gemu.description }}
          />
          <p alt="Rating">Overall rating: {gemu.rating} </p>
          <p alt="Release">Released: {gemu.releaseDate}</p>
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
          <div className="screenTainer">
            {gemu.screens.map((el) => (
              <a href={el}>
                {" "}
                <img className="imgTainer" src={el} alt="screen" />{" "}
              </a>
            ))}
          </div>
        </div>
        <Button2 onClick={handleClick}>Let's go back</Button2>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Detail;
