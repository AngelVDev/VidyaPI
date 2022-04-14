const { Router } = require('express');
const { genAPI } = require('../controllers/gen.controllers');
const router = Router();
const { Genre } = require('../db');

router.get('/genres', async (req, res) => {
  const gens = await genAPI();
try{ 
    const allGenres = await Genre.findAll();
    if(!allGenres.length){
        Genre.bulkCreate(gens);
} else
  console.log("TE TRAIGO TODO, PAPUUUU AAAAA", allGenres)
  res.json(allGenres);
} catch(err){
    console.log("ESTE ES EL ERROR, CULIADAZO",err)
}
});
module.exports = router;