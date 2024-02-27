import mongoose from "mongoose";

// set rule/Schema
const movieSchema = new mongoose.Schema({
  name: String,
  leadActor: String,
  rating: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
