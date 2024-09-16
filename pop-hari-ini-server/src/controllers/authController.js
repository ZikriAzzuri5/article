const prisma = require("../prismaClient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { secretKey } = require("../../app/config");

const handleErrors = (res, error, message) => {
  console.error(error);
  res.status(500).json({ success: false, error: message });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    handleErrors(res, error, "Error logging in");
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = "USER";
    if (email.endsWith("@phi.com")) {
      role = "ADMIN";
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    handleErrors(res, error, "Error registering user");
  }
};
