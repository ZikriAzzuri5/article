const prisma = require("../prismaClient");

const handleErrors = (res, error, message) => {
  console.error(error);
  res.status(500).json({ success: false, error: message });
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    handleErrors(res, error, "Failed to fetch categories");
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (category) {
      res.status(200).json({ success: true, data: category });
    } else {
      res.status(404).json({ success: false, error: "Articles not found" });
    }
  } catch (error) {
    handleErrors(res, error, "Failed to fetch category");
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Name is required" });
    }

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({
      success: true,
      data: category,
      message: "Category created successfully",
    });
  } catch (error) {
    handleErrors(res, error, "Failed to create Category");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Name is required" });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.status(200).json({
      success: true,
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    handleErrors(res, error, "Failed to update Category");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: Number(id) } });
    res
      .status(204)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to delete category");
  }
};
