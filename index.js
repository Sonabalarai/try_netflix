import express from "express";
import Movie from "./movies.model.js";
import connectDB from "./connectDb.js";
import mongoose from "mongoose";

const app = express();
//to make app understand json()
app.use(express.json());

connectDB();

// Api for adding movies
app.post("/movies/add", async (req, res) => {
  const newMovies = req.body;

  await Movie.create(newMovies);

  return res.status(201).send({ message: "Movies added successfully....." });
});

// Api for get movies list
app.get("/movies/list", async (req, res) => {
  const moviesList = await Movie.find();
  return res.status(200).send({ message: "success", movies: moviesList });
});

// Api get movies details
app.get("/movies/details/:id", async (req, res) => {
  // extract course id from req.params
  const movieId = req.params.id;
  //validate for mongo id

  const isValidMongoId = mongoose.isValidObjectId(movieId);

  // if not mongo id
  if (!isValidMongoId) {
    return res.status(404).send({ message: "Nat valid mongoose id.." });
  }

  // find movie by id

  const isRequiredMovie = await Movie.findOne({ _id: movieId });

  //if movie not found
  if (!isRequiredMovie) {
    return res.status(401).send({ message: "movies doesn't exist" });
  }

  return res.status(200).send({ message: "success", movies: isRequiredMovie });
});

// delete movie by id
app.delete("/movies/delete/:id", async (req, res) => {
  // extract movie id from req.params

  const movieId = req.params.id;

  // check valid mongooes id
  const isValidMongoId = mongoose.isValidObjectId({ _id: movieId });

  if (!isValidMongoId) {
    return res.status(404).send({ message: "Mongoose id is not valid " });
  }

  const isRequiredMovie = await Movie.findOne(movieId);
  if (!isRequiredMovie) {
    return res.status(404).send({ message: "Movie not exist" });
  }

  // delete movie
  await Movie.deleteOne({ _id: movieId });

  // send response
  return res
    .status(200)
    .send({ message: "movies successfully delted........" });
});
// ############## Port and Server ###############s
const PORT = 8001;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT} port`);
});
