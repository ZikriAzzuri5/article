const jwt = require("jsonwebtoken");
const { secretKey } = require("../app/config");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   console.log(token);
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send("Access Denied");
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const verified = jwt.verify(token, secretKey);
//     req.user = verified;
//     next();
//   } catch (err) {
//     return res.status(400).json({ message: "Invalid Token" });
//   }
// };

// const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "ADMIN") {
//     return res.status(403).json({ message: "Access Denied: Admins only" });
//   }
//   next();
// };

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send("Access Denied");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

const isAdmin = (req, res, next) => {
  // Pastikan req.user sudah ada sebelum memeriksa role
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
