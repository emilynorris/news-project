const request = require("supertest");
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const app = require("../app.js");
const db = require('../db/connection');

beforeEach (() => seed(data));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('responds with array of objects containing slug and description of all topics', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then (({body}) => {
        expect(body.topics.length).toBe(3)
        expect(typeof body.topics[0].slug).toBe("string")
        expect(typeof body.topics[1].description).toBe("string")
      })
  });
  test('responds with array of objects for all articles' , () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then (({body}) => {
        expect(body.articles.length).toBe(13)

        expect(typeof body.articles[9].author).toBe("string")
        expect(typeof body.articles[1].title).toBe("string")
        expect(typeof body.articles[2].article_id).toBe("number")
        expect(typeof body.articles[3].topic).toBe("string")
        expect(typeof body.articles[4].created_at).toBe("string")
        expect(typeof body.articles[5].votes).toBe("number")
        expect(typeof body.articles[6].article_img_url).toBe("string")
        expect(typeof body.articles[7].comment_count).toBe("number")

        expect(body.articles[8]).not.toHaveProperty('body')

        expect(new Date (body.articles[0].created_at)).toEqual(new Date(1604394720000))
        expect(new Date (body.articles[12].created_at)).toEqual(new Date (1578406080000))
      })
  });
});