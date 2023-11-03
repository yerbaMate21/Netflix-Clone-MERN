import { useAuthContext } from "./useAuthContext";
import { useUserDetailsContext } from "./useUserDetailsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchUserDetails } = useUserDetailsContext();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("planName");

    dispatch({ type: "LOGOUT" });
    dispatchUserDetails({ type: "SET_USERDETAILS", payload: null });
  };

  return { logout };
};
