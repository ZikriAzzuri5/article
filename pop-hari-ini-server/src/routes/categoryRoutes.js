const express = require("express");
const categoryController = require("../controllers/categoryController");
const {
  isAdmin,
  authenticateToken,
} = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

router.post("/", authenticateToken, isAdmin, categoryController.createCategory);
router.put(
  "/:id",
  authenticateToken,
  isAdmin,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  categoryController.deleteCategory
);

module.exports = router;
