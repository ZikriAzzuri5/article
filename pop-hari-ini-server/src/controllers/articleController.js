const multer = require("multer");
const sanitizeHtml = require("sanitize-html");
const prisma = require("../prismaClient");
const generateSlug = require("../utils/slugGenerator");

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
    const articles = await prisma.article.findMany();
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    handleErrors(res, error, "Failed to fetch articles");
  }
};

// exports.createArticle = [
//   upload.single("thumbnail"),
//   async (req, res) => {
//     try {
//       const { title, content, datetime } = req.body;
//       const thumbnail = req.file?.path.replace(/\\/g, "/");
//       const authorId = req.user.id;

//       if (!title) {
//         return res
//           .status(400)
//           .json({ success: false, error: "All fields are required" });
//       } else if (!content) {
//         return res
//           .status(400)
//           .json({ success: false, error: "content required" });
//       } else if (!datetime) {
//         return res
//           .status(400)
//           .json({ success: false, error: "datetime required" });
//       } else if (!thumbnail) {
//         return res
//           .status(400)
//           .json({ success: false, error: "thumbnail required" });
//       }

//       const sanitizedContent = sanitizeHtml(content, {
//         allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
//         allowedAttributes: {
//           "*": ["style", "class"],
//           a: ["href", "name", "target"],
//           img: ["src", "alt"],
//         },
//       });

//       const isoDate = new Date(datetime).toISOString(); // Convert to ISO-8601
//       const slug = generateSlug(title);

//       const article = await prisma.article.create({
//         data: {
//           title,
//           content: sanitizedContent,
//           datetime: isoDate,
//           thumbnail,
//           slug,
//           authorId,
//         },
//       });
//       console.log(article);
//       res.status(201).json({
//         success: true,
//         data: article,
//         message: "Articles created successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       handleErrors(res, error, "Failed to create articles");
//     }
//   },
// ];

// exports.getArticleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const article = await prisma.article.findUnique({
//       where: { id: Number(id) },
//     });

//     if (article) {
//       res.status(200).json({ success: true, data: article });
//     } else {
//       res.status(404).json({ success: false, error: "Articles not found" });
//     }
//   } catch (error) {
//     handleErrors(res, error, "Failed to fetch article");
//   }
// };

exports.createArticle = [
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      console.log("body : ", req.body);
      let { title, content, datetime, category } = req.body;
      const thumbnail = req.file?.path.replace(/\\/g, "/");

      const authorId = req.user.id;
      // const categoryId = parseInt(category);

      if (!authorId) {
        return res
          .status(400)
          .json({ success: false, error: "User not logged in" });
      }
      if (!title || !content || !datetime || !thumbnail) {
        return res
          .status(400)
          .json({ success: false, error: "All fields are required" });
      }
      console.log(title);
      console.log(content);
      console.log(category);
      console.log(datetime);
      console.log(thumbnail === null);

      const sanitizedContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          "*": ["style", "class"],
          a: ["href", "name", "target"],
          img: ["src", "alt"],
        },
      });

      const isoDate = new Date(datetime).toISOString(); // Convert to ISO-8601
      const slug = generateSlug(title);

      const article = await prisma.article.create({
        data: {
          title,
          content: sanitizedContent,
          datetime: isoDate,
          thumbnail,
          slug,
          author: {
            connect: { id: authorId }, // Menghubungkan artikel dengan user yang ada berdasarkan ID
          },
          category: {
            connect: { id: categoryId }, // Menghubungkan artikel dengan kategori yang ada
          },
        },
      });

      res.status(201).json({
        success: true,
        data: article,
        message: "Article created successfully",
      });
    } catch (error) {
      handleErrors(res, error, "Failed to create article");
    }
  },
];

exports.updateArticle = [
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, datetime } = req.body;
      const thumbnail = req.file?.path.replace(/\\/g, "/");

      const sanitizedContent = content
        ? sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            allowedAttributes: {
              "*": ["style", "class"],
              a: ["href", "name", "target"],
              img: ["src", "alt"],
            },
          })
        : undefined;

      const isoDate = datetime ? new Date(datetime).toISOString() : undefined;

      const updatedData = {
        content: sanitizedContent,
        datetime: isoDate,
        thumbnail,
      };
      if (title) {
        updatedData.title = title;
        updatedData.slug = generateSlug(title);
      }

      const updatedArticle = await prisma.article.update({
        where: { id: Number(id) },
        data: updatedData,
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
    await prisma.article.delete({ where: { id: Number(id) } });
    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    handleErrors(res, error, "Failed to delete articles");
  }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await prisma.article.findUnique({
      where: { slug: slug },
    });

    if (article) {
      res.status(200).json({ success: true, data: article });
    } else {
      res.status(404).json({ success: false, error: "Article not found" });
    }
  } catch (err) {
    handleErrors(res, err, "Failed to fetch article by slug");
  }
};
