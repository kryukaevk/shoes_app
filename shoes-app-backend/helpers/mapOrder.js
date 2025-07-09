module.exports = function (order) {
  return {
    id: order._id,
    login: order.user_login,
    recipient: {
      name: order.recipient.name,
      surname: order.recipient.surname,
      phone: order.recipient.phone,
      email: order.recipient.email,
    },
    delivery: {
      deliveryType: order.delivery.delivery_type,
      address: order.delivery.address,
      pickupPoint: order.delivery.pickup_point,
    },
    payment: {
      paymentMethod: order.payment.payment_method,
    },
    items: order.items.map((item) => ({
      productId: item.product,
      title: item.title,
      imageUrls: item.image_paths.map((path) => `${path}`),
      size: item.size,
      quantity: item.quantity,
      totalPrice: item.total_price,
    })),
    totalSum: order.total_sum,
    totalQuantity: order.total_quantity,
    processed: order.processed,
    createdAt: order.createdAt,
  };
};
