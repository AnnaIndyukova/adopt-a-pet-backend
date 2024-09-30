const mongoose = require("mongoose");

const newsArticleSchema = new mongoose.Schema(
  {
    articleDate: {
      type: String,
      required: [true, "The 'article date' field is required"],
    },
    articleCaption: {
      type: String,
      required: [true, "The 'article caption' field is required"],
    },
    articleText: {
      type: String,
      required: [true, "The 'article text' field is required"],
    },
    articleAuthor: {
      type: String,
      required: [true, "The 'article author' field is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("newsArticle", newsArticleSchema);
