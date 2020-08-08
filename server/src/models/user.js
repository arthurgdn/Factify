const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//Schéma définissant un utilisateur
const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        trim : true
    },
    lastName:{
        type: String,
        required: true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 6,
        validate(value){
            if (value.toLowerCase().includes('password')){
                throw new Error('Ne mettez pas password dans votre mot de passe')
            }
        }
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalide')
            }
        }
    },
    profilePicture : {
        type: Buffer,
        required : false
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
},{
    timestamps : true
})


//Méthode statique utilisée lors de la connexion de l'utilisateur avec ses identifiants
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error('Email ou mot de passe incorrect')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch){
        throw new Error('Email ou mot de passe incorrect')
    }
    return user
}

//Méthode pour générer un token d'authentification
userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//On minimise la taille des données à renvoyer et on supprime les informations sensibles
userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.email
    delete userObject.profilePicture

    return userObject
}
//Hash le mot de passe avant la sauvegarde
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})


const User = mongoose.model('User',userSchema)

module.exports = User 