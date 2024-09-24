const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { validateNewsBody } = require("../middlewares/validation");

const {
  getNewsArticles,
  createNewsArticle,
} = require("../controllers/newsArticles");

router.get("/", getNewsArticles);
router.use(auth);
router.post("/", validateNewsBody, createNewsArticle);

module.exports = router;
