import { useAuthContext } from "./useAuthContext";
import { useUserDetailsContext } from "./useUserDetailsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchUserDetails } = useUserDetailsContext();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("planName");
    localStorage.removeItem("planPrice");

    dispatch({ type: "LOGOUT" });
    dispatchUserDetails({ type: "SET_USERDETAILS", payload: null });
  };

  return { logout };
};
