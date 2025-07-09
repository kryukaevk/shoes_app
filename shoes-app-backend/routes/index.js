const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/auth", require("./authRoute"));
router.use("/categories", require("./categoriesRoute"));
router.use("/products", require("./productsRoute"));
router.use("/seasons", require("./seasonsRoute"));
router.use("/users", require("./usersRoute"));
router.use("/order-steps", require("./orderStepRoute"));
router.use("/orders", require("./orderRoute"));
router.use("/comments", require("./commentsRoute"));

module.exports = router;
