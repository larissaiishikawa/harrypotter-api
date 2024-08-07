const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

const Movie = mongoose.model("Movie", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.send(movies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    }
    return res.send({ message: "Movie deleted successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url,
      },
      { new: true }
    );
    if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    }
    return res.send(movie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
    });

    await movie.save();
    res.send(movie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Conectar ao MongoDB e iniciar o servidor
mongoose
  .connect(
    "mongodb+srv://larissaishikawa:SUcjlIZ6Z1Q5ZRIY@harrypotter-api.6obyz.mongodb.net/?retryWrites=true&w=majority&appName=harrypotter-api",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error);
  });
