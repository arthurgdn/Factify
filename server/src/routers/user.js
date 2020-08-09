const express = require('express')

const auth = require('../middleware/auth')

const User = require('../models/user')
const userController = require('../controllers/user')

const router = new express.Router()

//API to signup on the platform
router.post('/users', userController.signup)

//API to get a user's info 
router.get('/users/me',auth,userController.getUser)

//API to login
router.post('/users/login',userController.login)


//API upload avatar

router.post('/users/me/avatar',auth,userController.upload.single('avatar'),userController.uploadImage,
    (error,req,res,next)=>{
        
        res.status(400).send({error: error.message})
    })
//Recuperer la photo d'un utilisateur
router.get('/users/:id/avatar',userController.getUserImage)


//API to logout

router.post('/users/logout',auth,userController.logout)

// //API to logout of all sessions 
// router.post('/users/logoutAll',auth,async(req,res)=>{
//     try{
//         req.user.tokens = []
//         await req.user.save()
//         res.send()
//     }catch(e){
//         res.status(500).send()
//     }
// })

//API to delete account
router.post('/users/me/delete',auth, userController.deleteUser)

module.exports = router


