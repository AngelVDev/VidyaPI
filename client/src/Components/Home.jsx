import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { getGenres, getVideogames } from '../store/actions';
import "./Styles/Home.css"
import Cards from './Cards';
import Loader from './Loader';
import Searchbar from './Searchbar'
import Filters from './Filters';

const Home = () => {
  const games = useSelector((state) => state.allGames);
  const thoseGenres = useSelector((state)=> state.genres);
  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(getVideogames());
  dispatch(getGenres())
  },[dispatch])

if(games){
return (
    <div className='Wall'>
      <h3 className='Welcome'>The sight of all this games, fills you with determination 🌟</h3>
      <div>
        <Filters/>
        <Searchbar/>
      {games && games?.map((GG)=> {
        return(
        <Link to={"/home/" + GG.id}>
        <Cards 
        name={GG.name}
        image= {GG.image}
        genres={GG.genres}
        key={GG.id}
        />
        </Link>)})
      }
      </div>
    </div>
  )
} else {
  return(<Loader/>)
}
}

export default Home