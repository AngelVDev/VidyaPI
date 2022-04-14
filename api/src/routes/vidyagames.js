const { Videogame, Genre } = require('../db');
const { Router } = require('express');
const { allInfo } = require('../controllers/vidya.controllers');
const router = Router();

router.get("/videogames", async(req, res) =>{
    const {name} = req.query;
    const info = await allInfo();
    try{
        if(name){
    const gameTitle = info.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()));
      // eslint-disable-next-line no-unused-expressions
      gameTitle.length < 16
        ? res.status(200).send(gameTitle)
        : res.status(404).send('GAME NOT FOUND');
    } else {
      res.status(200).json(info);
    } 
    }
    catch(error){
        console.log(error)
    }
})
router.get("/videogames/:id", async (req, res) =>{
    const {id} = req.params;
    const vidyas = await allInfo();
    try{
    const vidID  = vidyas.find((el) => el.id === id);
    if(!vidID){
    const vidByDB = await Videogame.findByPk(id, {
        includ: {
            model: Genre
        }
    });
    vidByDB ? res.status(200).json(vidByDB) 
    : res.status(404).send("INVALID ID");} else{
        res.status(200).json(vidID)
    }} catch(err){ console.log(err)}
})

router.post('/videogames', async (req, res) => {
    const {
      name, description, rating, platforms, genres
    } = req.body;
    try {
      const gameNew = await Videogame.create({
        name,
        description,
        rating,
        platforms: [platforms],
        genres: [genres],
      });
      const genDb = await Genre.findAll({ where: { name: diets } });
      gameNew.addGenre(genDb);
      res.status(201).json(gameNew);
    } catch (error) {
      console.log(error);
    }
  });
  router.get('/:id/delete', async (req, res) => {
    try {
      await Videogame.destroy({
        where: { id: req.params.id },
      });
      return res.status(204).json({ msg: 'Game deleted' });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;