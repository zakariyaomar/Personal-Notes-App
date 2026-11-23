const { Router } = require("express");
const { register, login, me } = require("../controllers/auth.controller");
const { validate } = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { registerSchema, loginSchema } = require("../validation/auth.validation");

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", requireAuth, me);

module.exports = router;
