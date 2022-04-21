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
      <img src={gemu.image ? gemu.image : "https://s3-us-east-2.amazonaws.com/maryville/wp-content/uploads/2021/03/04131433/MVU-BFADM-2020-Q4-Skyscraper-Future-of-Video-Games-Trends-Technology-Types-header-v2.jpg"} alt="game" />
      <div>
        <p dangerouslySetInnerHTML={{ __html: gemu.description }} />
        <p alt="Release">{gemu.releaseDate}</p>
        <p alt="Rating">Overall rating: {gemu.rating} </p>
        <p alt="Platforms"> Available in: {gemu.platforms?.map( el => el + " ")}. </p>
        <p>Genres: <span>{!gemu.genres ? "Not defined" : gemu.genres?.map( el => el.name + " ")}</span>.</p>
      </div>
      <button><Link to= "/home">Let's go back</Link></button>
    </div>)
    }else{ return(
      <Loader/>

    )
    }
};

export default Detail;