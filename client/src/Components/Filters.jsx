import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames } from '../store/actions';

const Filters = () => {
    const games = useSelector((state) => state.allGames);
    const thoseGenres = useSelector((state)=> state.genres);
    const dispatch = useDispatch();
    const [order, setOrder] = useState('ASC');
    const [filtered, setFiltered] = useState('')
  
    useEffect(()=>{
    dispatch(getVideogames());
    dispatch(getGenres())
    },[dispatch])
  
    const handleOrder = (e) => {
      setOrder(e.target.value)
    }
    //Sort by name
    if (order === 'DSC') {
      var sorted = games.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1)
    }
    if (order === 'ASC') {
      sorted = games.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    }
    //Sort by rating
    if (order === 'DSC') {
      var sortedRating = games.sort((c, d) => (c.rating < d.rating) ? 1 : -1)
    }
    if (order === 'ASC') {
      sortedRating = games.sort((c, d) => (c.rating > d.rating) ? 1 : -1)
    }
    //Filter by genre
    if (filtered) {
      let mapped = games.map(el => el)
      var product =  mapped.filter(g => (g.genres?.includes(g?.thoseGenres)))
      console.log(product)
    }
    if (filtered === "ALL"){
       product = games
    } 
    const handleFilter = (e) => {
      setFiltered(e.target.value)
    }
    console.log(filtered)

  return (
      <>
    <label>Sort by name 
    <select onChange={handleOrder} value={sorted}>
        <option value="ASC">A to Z</option>
        <option value="DSC">Z to A</option>
    </select>
    </label>
    <label>Sort by rating 
    <select onChange={handleOrder} value={sortedRating}>
        <option value="ASC">Low to hi</option>
        <option value="DSC">Hi to low</option>
    </select>
    </label>
    <label>Filter by genre 
    <select onChange={handleFilter} value={product}>
        <option value="ALL">All</option>
        {thoseGenres?.map((genre) => {
          return <option key={genre.id}>{genre.name}</option>
        })}
    </select>
    </label>
    <label>Filter by source
    <select onChange={handleFilter} value={sorted}>
        <option value="ALL">Mixed</option>
        <option value="API">API</option>
        <option value="DB">Createds</option>
    </select>
    </label>
    </>
  )
}

export default Filters