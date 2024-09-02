const express = require("express");
const articleController = require("../controllers/articleController");

const router = express.Router();

router.get("/", articleController.getAllArticles);
router.post("/", articleController.createArticle);
router.get("/:id", articleController.getArticleById);
router.put("/:id", articleController.updateArticle);
router.delete("/:id", articleController.deleteArticle);

module.exports = router;
