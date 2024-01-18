import { useAuthContext } from "./useAuthContext";
import { useUserDetailsContext } from "./useUserDetailsContext";
import { useLikedMoviesContext } from "./useLikedMoviesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchUserDetails } = useUserDetailsContext();
  const { dispatch: dispatchLikedMovies } = useLikedMoviesContext();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("planName");
    localStorage.removeItem("planPrice");
    localStorage.removeItem("likedMovies");

    dispatch({ type: "LOGOUT" });
    dispatchUserDetails({ type: "SET_USERDETAILS", payload: null });
    dispatchLikedMovies({ type: "SET_LIKEDMOVIES", payload: null });
  };

  return { logout };
};
