import { createContext, useReducer, useEffect } from "react";

export const LikedMoviesContext = createContext();

export const likedMoviesReducer = (state, action) => {
  switch (action.type) {
    case "SET_LIKEDMOVIES":
      return {
        likedMovies: action.payload,
      };
    case "ADD_LIKEDMOVIES":
      return {
        likedMovies: [action.payload, { ...state.likedMovies }],
      };
    case "REMOVE_LIKEDMOVIES":
      return {
        likedMovies: [action.payload, state.likedMovies],
      };
    default:
      return state;
  }
};

export const LikedMoviesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likedMoviesReducer, {
    likedMovies: null,
  });

  useEffect(() => {
    const likedMovies = JSON.parse(localStorage.getItem("likedMovies"));

    if (likedMovies) {
      dispatch({ type: "SET_LIKEDMOVIES", payload: likedMovies });
    }
  }, []);

  return (
    <LikedMoviesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LikedMoviesContext.Provider>
  );
};
