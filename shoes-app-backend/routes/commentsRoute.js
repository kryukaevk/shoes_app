const express = require("express");
const router = express.Router();
const { getComments } = require("../controllers/comment");
const mapComment = require("../helpers/mapComment");

router.get("/", async (req, res) => {
  try {
    const comments = await getComments();
    res.send({ data: comments.map(mapComment) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

module.exports = router;
