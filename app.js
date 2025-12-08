const express = require("express");
const app = express();
const db = require("./db/connection");

app
.get("/api/topics", (request, response) => {
    return db.query(`
        SELECT 
        slug, 
        description 
        FROM topics;
        `)
    .then (({ rows }) => {
        // console.log ("topics", rows)
        response.status(200).send({ topics: rows})
    })
})

app.get("/api/articles", (request, response) => {
    return db.query(`
        SELECT 
        a.article_id, 
        a.author, 
        a.title, 
        a.topic, 
        a.created_at, 
        a.votes, 
        a.article_img_url,
        COUNT(c.comment_id)::int AS comment_count
        FROM articles a 
        LEFT JOIN comments c
        ON a.article_id = c.article_id
        GROUP BY a.article_id, a.author
        ORDER BY a.created_at DESC;
        `)
    .then (({ rows }) => {
        // console.log("articles", rows)
        response.status(200).send({ articles: rows})
    })
})

app.get("/api/articles/:article_id", (request, response) => {
    const { article_id } = request.params
    return db.query(`
        SELECT * FROM articles
        WHERE article_id = ${article_id}
        `)
    .then (({ rows }) => {
        console.log("article", rows)
        response.status(200).send({ article: rows})
    })
})

app.get("/api/users", (request,response) => {
    return db.query(`SELECT * FROM users;`)
    .then (({ rows }) => {
        response.status(200).send({ users: rows})
    })
})




module.exports = app