const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Post = require('../models/post')
const server = require('../server')
const {setupUserTwo,userTwo, userTwoId,testPost,testPostId} = require('./fixtures/db')
const User = require('../models/user')

const funFact = {
    title : "Post title test",
    content : "This is a test for a fun fact",
    upvotes : [],
    downvotes : [],
    score : 0
}
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
    expect(res.body).toMatchObject(funFact)
})

test('Doit upvoter sur le fun fact test', async ()=>{
    
    const res = await request(server).post('/posts/'+testPostId+'/upvote')
    .set('Content-Type','application/json')
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send().expect(200) 

    const post = await Post.findById(res.body._id)
    expect(post).not.toBeNull()
    expect(post.upvotes[post.upvotes.length-1].upvote.user).toStrictEqual(userTwoId)
})


test('Doit downvoter un fun fact deja upvote',async ()=>{
    
    const res = await request(server).post('/posts/'+testPostId+'/downvote')
    .set('Content-Type','application/json')
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send().expect(200) 

    const post = await Post.findById(res.body._id)
    expect(post).not.toBeNull()
    expect(post.downvotes[post.downvotes.length-1].downvote.user).toStrictEqual(userTwoId)

    
})

