const multer = require("multer");
const prisma = require("../prismaClient");

const storage = multer.diskStorage({
  destination: "uploads/articles",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const handleErrors = (res, error, message) => {
  console.error(error);
  res.status(500).json({ success: false, error: message });
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.articles.findMany();
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    handleErrors(res, error, "Failed to fetch articles");
  }
};

exports.createArticle = [
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      const { title, content, datetime } = req.body;
      const thumbnail = req.file?.path.replace(/\\/g, "/");

      if (!title || !content || !datetime || !thumbnail) {
        return res
          .status(400)
          .json({ success: false, error: "All fields are required" });
      }

      const isoDate = new Date(datetime).toISOString(); // Convert to ISO-8601

      const article = await prisma.articles.create({
        data: { title, content, datetime: isoDate, thumbnail },
      });

      res.status(201).json({
        success: true,
        data: article,
        message: "Articles created successfully",
      });
    } catch (error) {
      handleErrors(res, error, "Failed to create articles");
    }
  },
];

exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.articles.findUnique({
      where: { id: Number(id) },
    });

    if (article) {
      res.status(200).json({ success: true, data: article });
    } else {
      res.status(404).json({ success: false, error: "Articles not found" });
    }
  } catch (error) {
    handleErrors(res, error, "Failed to fetch article");
  }
};

exports.updateArticle = [
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, date } = req.body;
      const thumbnail = req.file?.path.replace(/\\/g, "/");

      const isoDate = date ? new Date(date).toISOString() : undefined;

      const updatedArticle = await prisma.articles.update({
        where: { id: Number(id) },
        data: { title, content, datetime: isoDate, thumbnail },
      });

      res.status(200).json({
        success: true,
        data: updatedArticle,
        message: "Articles updated successfully",
      });
    } catch (error) {
      handleErrors(res, error, "Failed to update article");
    }
  },
];

exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.articles.delete({ where: { id: Number(id) } });
    res
      .status(204)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to delete articles");
  }
};
