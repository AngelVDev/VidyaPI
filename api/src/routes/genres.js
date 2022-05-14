const { Router } = require('express');
const { genAPI } = require('../controllers/gen.controllers');
const router = Router();
const { Genre } = require('../db');

router.get('/genres', async (req, res) => {
  const gens = await genAPI();
  let allGenres = await Genre.findAll();
try{ 
    if(!allGenres.length){
       await Genre.bulkCreate(gens);
       res.status(201).json("Createds")
    } else{
      res.status(200).json(allGenres);
    }
} catch(err){
    console.log("ESTE ES EL ERROR, CULIADAZO",err)
}
});
module.exports = router;