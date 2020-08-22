const request = require('supertest')
const User = require('../models/user')
const server = require('../server')
const {setupUserOne,userOneId,userOne} = require('./fixtures/db')



beforeEach(setupUserOne)
test('Doit inscrire un utilisateur', async ()=>{
    const res = await request(server).post('/users')
    .set('Content-Type','application/json')
    .send({
        "firstName":"John",
        "lastName":"Bob",
        "email":"john.bob@emple.com",
        "password":"randompass"
    }).expect(201)

    const user = await User.findById(res.body.user._id)
    expect(user).not.toBeNull()
    expect(res.body).toMatchObject({
        user : {
        firstName: "John",
        lastName: "Bob"
        },
        token : user.tokens[0].token
    })
    })

test('Doit connecter l utilisateur 1', async ()=>{
    const res = await request(server).post('/users/login')
    .set('Content-Type','application/json')
    .send({
        "email":userOne.email,
        "password":userOne.password
    }).expect(200)

    const user = await User.findById(res.body.user._id)
    expect(res.body.token).toBe(user.tokens[1].token)
})



test('Doit deconnecter l utilisateur', async ()=>{
    await request(server).post('/users/logout')
    .set('Content-Type','application/json')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send().expect(200)

    const user = await User.findById(userOneId)
    expect(user.tokens.find((token)=>token.token===userOne.tokens[0].token)).toBeUndefined()
})


test('Doit refuser la connexion de l utilisateur', async ()=>{
     await request(server).post('/users/login')
    .set('Content-Type','application/json')
    .send({
        "email":userOne.email,
        "password":"wrongpass"
    }).expect(400)
})

test('Doit connecter un utilisateur', async ()=>{
    const res = await request(server).post('/users/login')
    .set('Content-Type','application/json')
    .send({
        "email":userOne.email,
        "password":userOne.password
    }).expect(200)

    const user = await User.findById(res.body.user._id)
    expect(res.body.token).toBe(user.tokens[1].token)
})

test('Doit supprimer l utilisateur', async ()=>{
     await request(server).post('/users/me/delete')
    .set('Content-Type','application/json')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        "password":userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})