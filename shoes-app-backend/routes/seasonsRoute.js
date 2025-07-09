const express = require("express");
const router = express.Router();
const { addSeason, getSeasons, getSeason } = require("../controllers/season");
const mapSeason = require("../helpers/mapSeason");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

router.get("/", async (req, res) => {
  try {
    const seasons = await getSeasons();
    res.send({ data: seasons.map(mapSeason) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const season = await getSeason(req.params.id);
    res.send({ data: mapSeason(season) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const season = await addSeason({
    name: req.body.name,
  });
  res.send({ data: mapSeason(season) });
});

module.exports = router;
