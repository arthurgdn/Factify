const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')

//Connexion à la base de données
require('./db/mongoose')


//Charge les différents routeurs
const userRouter = require('./routers/user')

//Mise en place du serveur Express et de socket.io
const app = express()

//Mise en place du serveur Express et de socket.io
const server = http.createServer(app)

const publicPath = path.join(__dirname,'../public/')

//Utilisation de bodyParser pour faciliter l'exploitation des requetes
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json())
//Middleware permettant de gérer les CORS, à changer pour le passage en prod
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods","PUT,GET,POST,DELETE,PATCH")
    next();
    });


//On défini le chemin vers les fichiers statiques
app.use(express.static(publicPath))

//On ajoute les différentes routes 
app.use(userRouter)
module.exports = server






