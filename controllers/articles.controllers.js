const {fetchAllArticles,fetchArticlesById, fetchArticleCommentsById, updateArticleVotesById} = require ("../models/articles.models")

function getAllArticles (req,res) {
    fetchAllArticles().then((articles) => {
        res.status(200).send({articles})
    })
}

function getArticlesById (req,res,next) {
    const { article_id } = req.params
    fetchArticlesById(article_id).then((article) => {
        res.status(200).send({article})
    })
}

function getArticleCommentsById (req,res,next) {
    const { article_id } = req.params
    fetchArticleCommentsById(article_id).then((comments) => {
        res.status(200).send({comments})
    })
}

function patchArticleVotesById (req,res,next) {
    const { article_id } = req.params
    const { inc_votes } = req.body
    updateArticleVotesById(article_id, inc_votes).then((updatedArticle) => {
        res.status(200).send({updatedArticle})
    })
}

module.exports = {getAllArticles, getArticlesById, getArticleCommentsById, patchArticleVotesById}