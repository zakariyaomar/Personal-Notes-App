const { PrismaClient } = require("@prisma/client");

// Reuse a single PrismaClient instance across the app to avoid exhausting
// database connections, especially important with hot-reload in dev.
const prisma = new PrismaClient();

module.exports = prisma;
