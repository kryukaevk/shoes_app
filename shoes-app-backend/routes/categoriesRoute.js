const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategories,
  getCategory,
} = require("../controllers/category");
const mapCategory = require("../helpers/mapCategory");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.send({ data: categories.map(mapCategory) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await getCategory(req.params.id);
    res.send({ data: mapCategory(category) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.post("/", hasRole([ROLES.ADMIN]), authenticated, async (req, res) => {
  const category = await addCategory({
    name: req.body.name,
  });
  res.send({ data: mapCategory(category) });
});

module.exports = router;
