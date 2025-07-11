const express = require("express");
const router = express.Router();
const {
  getProducts,
  searchProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/product");
const { addComment, deleteComment } = require("../controllers/comment");
const mapProduct = require("../helpers/mapProduct");
const mapComment = require("../helpers/mapComment");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const { IncomingForm } = require("formidable");
const { fileTypeFromFile } = require("file-type");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const filters = {
      categoryId: req.query.categoryId,
      seasonId: req.query.seasonId,
      minPrice: req.query.minPrice ? parseInt(req.query.minPrice) : null,
      maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice) : null,
      size: req.query.size,
      search: req.query.search,
    };
    const { products, lastPage } = await getProducts(limit, page, filters);
    res.send({ data: products.map(mapProduct), lastPage });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const products = await searchProducts(req.query.search);
    res.send({ data: products.map(mapProduct) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.send({ data: mapProduct(product) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });
  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/:productId/comments/:commentId",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.productId, req.params.commentId);
    res.send({ error: null });
  }
);

router.post(
  "/",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const form = new IncomingForm({
      uploadDir: path.join(__dirname, "../uploads"),
      keepExtensions: true,
      multiples: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).send({ error: err.message });
      }

      const imageFiles = files.imageFiles
        ? Array.isArray(files.imageFiles)
          ? files.imageFiles
          : [files.imageFiles]
        : [];

      if (imageFiles.length === 0) {
        return res
          .status(400)
          .send({ error: "Требуется загрузить хотя бы одно изображение" });
      }

      const imagePaths = [];
      for (const file of imageFiles) {
        const filePath = file.filepath;
        const fileType = await fileTypeFromFile(filePath);
        if (!fileType || !fileType.mime.startsWith("image/")) {
          return res
            .status(400)
            .send({ error: "Загруженный файл не является изображением" });
        }
        imagePaths.push(`/uploads/${path.basename(filePath)}`);
      }

      try {
        const newProduct = await addProduct({
          title: fields.title[0],
          image_paths: imagePaths,
          price: Number(fields.price[0]),
          category: fields.categoryId[0],
          season: fields.seasonId[0],
          description: fields.description[0],
          manufacturer: fields.manufacturer[0],
          sizes: fields.sizes[0].split(","),
        });

        res.send({ data: mapProduct(newProduct) });
      } catch (error) {
        console.error("Ошибка при добавлении продукта:", error);
        res.status(500).send({ error: error.message || "Неизвестная ошибка" });
      }
    });
  }
);

router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const form = new IncomingForm({
      uploadDir: path.join(__dirname, "../uploads"),
      keepExtensions: true,
      multiples: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).send({ error: err.message });
      }

      const { id } = req.params;

      const imageFiles = files.imageFiles
        ? Array.isArray(files.imageFiles)
          ? files.imageFiles
          : [files.imageFiles]
        : [];

      const imagePaths = [];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const filePath = file.filepath;
          const fileType = await fileTypeFromFile(filePath);
          if (!fileType || !fileType.mime.startsWith("image/")) {
            return res
              .status(400)
              .send({ error: "Загруженный файл не является изображением" });
          }
          imagePaths.push(`/uploads/${path.basename(filePath)}`);
        }
      }

      try {
        const updatedProduct = await editProduct(id, {
          title: fields.title[0],
          price: Number(fields.price[0]),
          description: fields.description[0],
          manufacturer: fields.manufacturer[0],
          sizes: fields.sizes[0].split(","),
          category: fields.categoryId[0],
          season: fields.seasonId[0],
          ...(imagePaths.length > 0 && { image_paths: imagePaths }),
        });

        res.send({ data: mapProduct(updatedProduct) });
      } catch (error) {
        console.error("Ошибка при обновлении продукта:", error);
        res.status(500).send({ error: error.message || "Неизвестная ошибка" });
      }
    });
  }
);

router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteProduct(req.params.id);
    res.send({ error: null });
  }
);

module.exports = router;
