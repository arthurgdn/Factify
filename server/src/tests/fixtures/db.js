const User = require('../../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    "_id" : userOneId,
    "firstName":"John",
    "lastName":"Michael",
    "email":"john.michael@exemple.com",
    "password":"randompass",
    "tokens" : [{
        "token" : jwt.sign({_id:userOneId},process.env.JWT_SECRET)
    }]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    "_id" : userTwoId,
    "firstName":"Arthur",
    "lastName":"Guédon",
    "email":"john.guedon@exemple.com",
    "password":"randompass",
    "tokens" : [{
        "token" : jwt.sign({_id:userTwoId},process.env.JWT_SECRET)
    }]
}

const setupUserOne = async ()=>{
    await User.deleteMany()
    
    await (new User({...userOne})).save()
}
const setupUserTwo = async ()=>{
    await User.deleteMany()
    const user = new User({...userTwo})
    await user.save()
    
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    setupUserOne,
    setupUserTwo
}