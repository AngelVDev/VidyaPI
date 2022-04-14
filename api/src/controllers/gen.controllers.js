const axios = require ("axios");
const { Genre } = require('../db')
const {
    API_KEY,
  } = process.env;

const genAPI = async() => {
    const apiURL = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    try{
    const gens = apiURL.data.results.map(
        (el) => ({
            id: el.id,
            name: el.name,
            // image: el.image_background,
        })
    )
    return gens}
    catch(err){
        console.log("ERROR DE CONTROLLER", err)
    }
}
module.exports = {genAPI}