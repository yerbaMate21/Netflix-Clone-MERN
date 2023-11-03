import { UserDetailsContext } from "../context/UserDetailsContext";
import { useContext } from "react";

export const useUserDetailsContext = () => {
  const context = useContext(UserDetailsContext);

  if (!context) {
    throw Error(
      "useUserDetailsContext must be used inside an UserDetailsContextProvider"
    );
  }

  return context;
};
