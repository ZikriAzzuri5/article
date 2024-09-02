import { v4 as uuidv4 } from "uuid";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = prisma;
