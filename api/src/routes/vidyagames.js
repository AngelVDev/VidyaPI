const { Videogame, Genre } = require("../db");
const { Router } = require("express");
const { allInfo } = require("../controllers/vidya.controllers");
const router = Router();

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  const info = await allInfo();
  try {
    if (name) {
      const gameTitle = info.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      // eslint-disable-next-line no-unused-expressions
      gameTitle.length < 16
        ? res.status(200).send(gameTitle)
        : res.status(404).send("GAME NOT FOUND");
    } else {
      res.status(200).json(info);
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  const vidyas = await allInfo();
  try {
    const vidyaID = vidyas.find((element) => `${element.id}` === id);
    if(!vidyaID){
      const vidByDB = await Videogame.findByPk(id, {include : {model: Genre,},});
      vidByDB
      ? res.status(200).json(vidByDB)
      : res.status(404).send("INVALID ID IN DB")
    }else{
       res.status(200).json(vidyaID);
      }
  } catch (err) {
    console.log(err);
  }
});

router.post("/videogames", async (req, res) => {
  const { name, description, rating, platforms, genres, released } = req.body;
  // const vidyaInDb = await Videogame.findOne({name});
  try {
    // console.log(vidyaInDb.name)
    const gameNew = await Videogame.create(
      {
        name,
        description,
        rating,
        released,
        platforms,
        genres
      },
      );
      console.log(gameNew.name)
      const genDb = await Genre.findAll({ where: { name: genres } });
      gameNew.addGenre(genDb);
    // if (gameNew.name !== vidyaInDb.name) {
      res.status(201).json(gameNew);
    // } else {
    //   res.status(400).send("Already in DB");
    // }
  } catch (error) {
    console.log(error);
  }
});
router.get("videogames/:id/delete", async (req, res) => {
  try {
    await Videogame.destroy({
      where: { id: req.params.id },
    });
    return res.status(204).json({ msg: "Game deleted" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
