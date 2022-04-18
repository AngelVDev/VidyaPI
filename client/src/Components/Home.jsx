import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { getGenres, getVideogames } from '../store/actions';
import "./Styles/Home.css"
import Cards from './Cards';
import Loader from './Loader';

const Home = () => {
const games = useSelector((state) => state.allGames);
const thoseGenres = useSelector((state)=> state.genres);
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getVideogames());
  dispatch(getGenres())
})
  
if(games){
return (
    <div className='Wall'>
      The sight of all this games, fills you with determination
      <Cards id='Cards'>{
      games &&
      games.map((GG)=> {
        return(
      <Link to={"/home/" + GG.id}>
        <div
        name={GG.name}
        image= {GG.image}
        genres={GG.genres}
        key={GG.id}
        />
      </Link>)})
      }</Cards>
    </div>
  )
} else {
  return(<Loader/>)
}
}

export default Home