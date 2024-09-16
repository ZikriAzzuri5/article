const express = require("express");
const articleController = require("../controllers/articleController");
const {
  isAdmin,
  authenticateToken,
} = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", articleController.getAllArticles);
router.get("/:slug", articleController.getArticleBySlug);

router.post("/", authenticateToken, isAdmin, articleController.createArticle);
router.put("/:id", authenticateToken, isAdmin, articleController.updateArticle);
router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  articleController.deleteArticle
);

module.exports = router;
