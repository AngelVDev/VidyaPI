const axios = require ("axios");
const { Videogame, Genre } = require('../db');
const {
    API_KEY,
  } = process.env;
  
const gameAPI = async () => {
    const apiURL = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`)
    const allApi = apiURL.data.results.map((el)=>({
        id: el.id,
        name: el.name,
        releaseDate: el.released,
        rating: el.rating,
        image: el.background_image,
        platforms: el.platforms.map((el) => el.platform.name),
        genres: el.genres.map((el) => {return { id: el.id, name: el.name }}),
        })
    )
    return allApi;
}

const gameDB = async () =>{
    const service = await Videogame.findAll({include: Genre});
    return service;
}
const allInfo = async ()=>{
    const api = await gameAPI();
    const byDB = await gameDB();
    const fused = api.concat(byDB);
    return fused
}
module.exports = {allInfo}