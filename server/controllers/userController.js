const User = require("../models/userModel");

const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json(user.likedMovies);
    } else return res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else
        return res.json({ message: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ message: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ message: "Error adding movie to the liked list" });
  }
};

const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ message: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ message: "Movie successfully removed.", movies });
    } else return res.json({ message: "User with given email not found." });
  } catch (error) {
    return res.json({ message: "Error removing movie to the liked list" });
  }
};

module.exports = { getLikedMovies, addToLikedMovies, removeFromLikedMovies };
