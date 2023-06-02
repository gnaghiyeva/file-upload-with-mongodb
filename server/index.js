const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(bodyParser.json())


const CharactersSchema = new mongoose.Schema({
    name:String,
    imageURL:String
})

const CharactersModel = new mongoose.model('Characters', CharactersSchema)

app.get('/characters', async(req,res)=>{
    const data = await CharactersModel.find();
    res.status(200).send(data)
})

app.post('/characters', async(req,res)=>{
    const newCharacter = new CharactersModel({
        name:req.body.name,
        imageURL:req.body.imageURL
    })

    await newCharacter.save()
    res.status(201).send('data posted succesfully')
})

DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(()=>{
    console.log('MongoDB connected!')
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})