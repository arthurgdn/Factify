const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const cors = require('cors')
//Connexion à la base de données
require('./db/mongoose')


//Charge les différents routeurs
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')
const feedRouter = require('./routers/feed')
//Mise en place du serveur Express et de socket.io
const app = express()

//Mise en place du serveur Express et de socket.io
const server = http.createServer(app)

const publicPath = path.join(__dirname,'../public/')

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

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
app.use(postRouter)
app.use(feedRouter)

module.exports = server






