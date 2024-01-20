import { createContext, useReducer, useEffect } from "react";

export const UserDetailsContext = createContext();

export const userDetailsReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERDETAILS":
      return {
        userDetails: action.payload,
        isLoading: false,
      };
    case "CREATE_USERDETAILS":
      return {
        userDetails: [action.payload, { ...state.userDetails }],
        isLoading: false,
      };
    case "UPDATE_USERDETAILS":
      return {
        userDetails: [action.payload, state.userDetails],
        isLoading: false,
      };
    default:
      return state;
  }
};

export const UserDetailsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userDetailsReducer, {
    userDetails: null,
    isLoading: true,
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      dispatch({
        type: "SET_USERDETAILS",
        payload: userDetails,
      });
    }
  }, []);

  return (
    <UserDetailsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
