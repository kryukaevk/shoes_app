module.exports = function (step) {
  return {
    id: step._id,
    title: step.title,
    registeredAt: step.createdAt,
  };
};
