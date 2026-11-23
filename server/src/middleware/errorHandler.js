// Centralized error handler. Any error passed to next(err) ends up here.
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === "P2002") {
    // Prisma unique constraint violation
    return res.status(409).json({ error: "A record with that value already exists" });
  }

  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;
  res.status(status).json({ error: message });
}

function notFoundHandler(req, res) {
  res.status(404).json({ error: "Not found" });
}

module.exports = { errorHandler, notFoundHandler };
