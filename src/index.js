const express = require("express")
const mongoose = require('mongoose');

const app = express()
const port = 3000
mongoose.connect('mongodb+srv://larissaishikawa:<password>@harrypotter-api.6obyz.mongodb.net/?retryWrites=true&w=majority&appName=harrypotter-api');

const Movie = mongoose.model('Movie', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
});

app.get("", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log('App running')
})