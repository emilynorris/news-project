const request = require("supertest");
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const app = require("../app.js");
const db = require('../db/connection');

beforeAll (() => seed(data));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('responds with array of objects containing all topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then (({body}) => {
        expect(body.topics.length).toBeGreaterThan(0)
        body.topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string")
          expect(typeof topic.description).toBe("string")
        })
      })
    })
  })

  describe('/api/articles', () => {
    test('GET: 200 - responds with array of objects for all articles' , () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then (({body}) => {
          expect(body.articles.length).toBeGreaterThan(0)
          body.articles.forEach((article) => {
            expect(typeof article.author).toBe("string")
            expect(typeof article.title).toBe("string")
            expect(typeof article.article_id).toBe("number")
            expect(typeof article.topic).toBe("string")
            expect(typeof article.created_at).toBe("string")
            expect(typeof article.votes).toBe("number")
            expect(typeof article.article_img_url).toBe("string")
            expect(typeof article.comment_count).toBe("number")
          })
        expect(body.articles[8]).not.toHaveProperty('body')
        expect(new Date (body.articles[0].created_at)).toEqual(new Date(1604394720000))
        expect(new Date (body.articles[12].created_at)).toEqual(new Date (1578406080000))
      })
    })
    test('GET: 200 - responds with article filtered by article_id', () => {
      return request(app)
        .get('/api/articles/5')
        .expect(200)
        .then (({body}) => {
          expect(body.article[0].article_id).toBe(5)
          expect(body.article.length).toBe(1)
          expect(typeof body.article[0].author).toBe("string")
          expect(typeof body.article[0].title).toBe("string")
          expect(typeof body.article[0].article_id).toBe("number")
          expect(typeof body.article[0].topic).toBe("string")
          expect(typeof body.article[0].created_at).toBe("string")
          expect(typeof body.article[0].votes).toBe("number")
          expect(typeof body.article[0].article_img_url).toBe("string")
          expect(typeof body.article[0].body).toBe("string")
        })
    })
    test('GET: 200 - responds with article comments filtered by article_id', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then (({body}) => {
          expect(body.comments[0].article_id).toBe(1)
          expect(body.comments.length).toBeGreaterThan(0)
          body.comments.forEach((comment) => {
            expect(typeof comment.comment_id).toBe("number")
            expect(typeof comment.votes).toBe("number")
            expect(typeof comment.created_at).toBe("string")
            expect(typeof comment.author).toBe("string")
            expect(typeof comment.body).toBe("string")
            expect(typeof comment.article_id).toBe("number")
          })
    })
  })
})

describe ('GET /api/users', () => {
  test('responds with array of objects containing all users', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then (({body}) => {
        expect(body.users.length).toBeGreaterThan(0)
        body.users.forEach((user) => {
          expect(typeof user.username).toBe("string")
          expect(typeof user.name).toBe("string")
          expect(typeof user.avatar_url).toBe("string")
        })  
      })
  })
})