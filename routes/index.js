const router = require("express").Router();
const userRouter = require("./users");
const petRouter = require("./pets");
const newsRouter = require("./news");
const NotFoundError = require("../errors/NotFoundError");
const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateUserLogin,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateUserLogin, login);
router.use("/users", userRouter);
router.use("/pets", petRouter);
router.use("/news", newsRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
