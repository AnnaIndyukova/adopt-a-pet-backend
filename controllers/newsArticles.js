const NewsArticle = require("../models/newsArticle");

const BadRequestError = require("../errors/BadRequestError");

const getNewsArticles = (req, res, next) => {
  NewsArticle.find({})
    .then((articles) => res.send(articles))
    .catch(next);
};

const createNewsArticle = (req, res, next) => {
  const { articleDate, articleCaption, articleText, articleAuthor } = req.body;
  const owner = req.user._id;
  NewsArticle.create({
    articleDate,
    articleCaption,
    articleText,
    articleAuthor,
    owner,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid article data"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getNewsArticles,
  createNewsArticle,
};
