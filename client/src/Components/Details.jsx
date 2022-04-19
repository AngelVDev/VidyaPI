import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams} from "react-router-dom"
import { getDetails } from "../store/actions";
import Loader from "./Loader";
import "./Styles/Details.css"


const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gemu = useSelector((state) => state.gameDetail);
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch,id]);
  if(gemu){
      return (
    <div id="MASTERCARD">
      <h2>{gemu.name}</h2>
      <img src={gemu.image ? gemu.image : "https://i.pinimg.com/564x/00/1e/ed/001eed88d8244f464e8b525fdcd516de.jpg"} alt="game" />
      <div>
        <p dangerouslySetInnerHTML={{ __html: gemu.description }} />
        <p alt="Release">{gemu.releaseDate}</p>
        <p alt="Rating">Overall rating: {gemu.rating} </p>
        <p alt="Platforms"> Available in: {gemu.platforms} </p>
        <p>Genres: <span>{!gemu.genres ? "Not defined" : gemu.genres.map( el =>
        el.length > 1 ? el + ", " : el + ".")}</span></p>
      </div>
      <button><Link to= "/home">Let's go back</Link></button>
    </div>)
    }else{ return(
      <Loader/>

    )
    }
};

export default Detail;