const express = require("express");
const router = express.Router();
const {
  getOrder,
  getOrders,
  addOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/order");

const mapOrder = require("../helpers/mapOrder");

const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

router.get("/", async (req, res) => {
  try {
    const login = req.query.login;
    const orders = await getOrders(login);
    res.send({ data: orders.map(mapOrder) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await getOrder(req.params.id);
    res.send({ data: mapOrder(order) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newOrder = await addOrder({
      user_login: req.body.login ? req.body.login.name : "guest",
      recipient: {
        name: req.body.recipient.name,
        surname: req.body.recipient.surname,
        phone: req.body.recipient.phone,
        email: req.body.recipient.email,
      },
      delivery: {
        delivery_type: req.body.delivery.deliveryType,
        address: req.body.delivery.address,
        pickup_point:
          req.body.delivery.deliveryType === "pickup"
            ? req.body.delivery.pickupPoint.address
            : undefined,
      },
      payment: {
        payment_method: req.body.payment.paymentMethod,
      },
      items: req.body.orderData.items.map((item) => ({
        product: item.productId,
        title: item.title,
        image_paths: Array.isArray(item.imageUrls)
          ? item.imageUrls
          : [item.imageUrls || ""],
        size: item.size,
        quantity: item.quantity,
        total_price: item.totalPrice,
      })),
      total_sum: req.body.orderData.totalSum,
      total_quantity: req.body.orderData.allQuantity,
      processed: req.body.processed || false,
    });
    res.send({ data: mapOrder(newOrder) });
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res.status(400).send({ error: error.message });
  }
});

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const modifiedOrder = await updateOrder(req.params.id, {
      processed: req.body.processed,
    });
    res.send({ data: mapOrder(modifiedOrder) });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteOrder(req.params.id);
    res.send({ error: null });
  }
);

module.exports = router;
