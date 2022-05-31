const { Videogame, Genre } = require("../db");
const { Router } = require("express");
const { allInfo } = require("../controllers/vidya.controllers");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  const info = await allInfo();
  try {
    if (name) {
      const gameTitle = await info.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      // eslint-disable-next-line no-unused-expressions
      gameTitle.length
        ? res.status(200).send(gameTitle)
        : res.status(404).send("GAME NOT FOUND");
    } else {
      res.status(200).json(info);
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});
router.get("/videogames/:id", async (req, res) => {
  const { id } = req.params;
  const vidyas = await allInfo();
  try {
    const vidyaID = await vidyas.find((element) => `${element.id}` === id);
    if (id.includes("-")) {
      const vidByDB = await Videogame.findByPk(id, {
        include: { model: Genre },
      });
      vidByDB
        ? res.status(200).json(vidByDB)
        : res.status(404).send("INVALID ID IN DB");
    } else {
      const descID = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      vidyaID.description = descID.data.description;
      res.status(200).json(vidyaID);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

router.post("/videogames", async (req, res) => {
  const { name, image, description, rating, platforms, genres, released } =
    req.body;
  try {
    const gameNew = await Videogame.create({
      name,
      image,
      description,
      rating,
      released,
      platforms: [platforms],
    });
    const genDB = await Genre.findAll({ where: { name: genres } });
    await gameNew.addGenre(genDB);
    res.status(201).json(gameNew);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).send(error);
    console.log(err);
  }
});

module.exports = router;
