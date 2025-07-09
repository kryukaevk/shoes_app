module.exports = function (comment) {
  return {
    id: comment._id,
    content: comment.content,
    author: comment.author ? comment.author.login : "Пользователь",
    publishedAt: comment.createdAt,
  };
};
