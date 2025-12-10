const express = require("express");
const app = express();
const db = require("./db/connection");
const {getAllArticles, getArticlesById, getArticleCommentsById, patchArticleVotesById} = require ("./controllers/articles.controllers")
const {getAllTopics} = require ("./controllers/topics.controllers");
const {getAllUsers} = require("./controllers/users.controllers");

app.use('/api', express.static('public'))

//articles
app.get("/api/articles", getAllArticles)
app.get("/api/articles/:article_id", getArticlesById) 
app.get("/api/articles/:article_id/comments",getArticleCommentsById)
app.patch("/api/articles/:article_id", patchArticleVotesById)

//topics
app.get("/api/topics", getAllTopics)

//users
app.get("/api/users", getAllUsers)

module.exports = app