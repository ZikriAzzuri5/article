const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const articleRoutes = require("./routes/articleRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use("/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
