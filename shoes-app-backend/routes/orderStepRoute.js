const express = require("express");
const router = express.Router();
const {
  addOrderStep,
  getOrderStep,
  getOrderSteps,
} = require("../controllers/orderStep");
const mapOrderStep = require("../helpers/mapOrderStep");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

router.get("/", async (req, res) => {
  try {
    const orderSteps = await getOrderSteps();
    res.send({ data: orderSteps.map(mapOrderStep) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const orderStep = await getOrderStep(req.params.id);
    res.send({ data: mapOrderStep(orderStep) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const orderStep = await addOrderStep({
    title: req.body.title,
  });
  res.send({ data: mapOrderStep(orderStep) });
});

module.exports = router;
