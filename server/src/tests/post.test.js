const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Post = require('../models/post')
const server = require('../server')
const {setupUserTwo,userTwo, userTwoId,} = require('./fixtures/db')
const User = require('../models/user')

beforeEach(setupUserTwo)
test('Doit créer un nouveau fun fact', async ()=>{
    const res = await request(server).post('/posts')
    .set('Content-Type','application/json')
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send({
        "title":"Post title test",
        "content":"This is a test for a fun fact"
    }).expect(201)

    const post = await Post.findById(res.body._id)
    expect(post).not.toBeNull()
    console.log(res.body)
    expect(res.body).toMatchObject({
        title : "Post title test",
        content : "This is a test for a fun fact",
        upvotes : [],
        downvotes : [],
        score : 0
    })
})