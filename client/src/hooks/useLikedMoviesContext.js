import { LikedMoviesContext } from "../context/LikedMoviesContext";
import { useContext } from "react";

export const useLikedMoviesContext = () => {
  const context = useContext(LikedMoviesContext);

  if (!context) {
    throw Error(
      "likedMoviesContext must be used inside an LikedMoviesContextProvider"
    );
  }

  return context;
};
