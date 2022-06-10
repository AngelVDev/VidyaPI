import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clear, deleteById, getDetails } from "../store/actions";
import Loader from "./Loader";
import "./Styles/Details.css";
import { Button2, ButtonT } from "./Styles/Styled";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gemu = useSelector((state) => state.gameDetail);
  const navi = useNavigate();
  function handleClick() {
    navi(-1);
  }
  function handleDelete(e, id) {
    e.preventDefault();
    dispatch(deleteById(id));
    alert(gemu.name + " deleted from our DB");
    navi(-1);
  }
  useEffect(() => {
    dispatch(clear());
    dispatch(getDetails(id));
  }, [dispatch, id]);
  if (gemu.name) {
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
          <div id="info">
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: gemu.description }}
            />
            <p>Overall rating: {gemu.rating} </p>
            <p>Released: {gemu.releaseDate}</p>
            <p>
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
          <div className="screenTainer">
            {gemu.screens
              ? gemu.screens.map((el) => (
                  <a href={el}>
                    {" "}
                    <img className="imgTainer" src={el} alt="screen" />{" "}
                  </a>
                ))
              : null}
          </div>
        </div>
        {gemu.id.length > 10 ? (
          <ButtonT onClick={(e) => handleDelete(e, id)}>Delete from DB</ButtonT>
        ) : null}
        <Button2 onClick={handleClick}>Let's go back</Button2>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default Detail;
