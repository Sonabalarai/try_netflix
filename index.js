import express from "express";
import Movie from "./movies.model.js";
import connectDB from "./connectDb.js";

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

// ############## Port and Server ###############
const PORT = 8001;

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT} port`);
});
