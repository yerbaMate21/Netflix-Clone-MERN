import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import { API_URL } from "../utils/constants";

export const useSignup = () => {
  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError({
      ...error,
      email: null,
      password: null,
    });

    try {
      const response = await fetch(`${API_URL}/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError({
          ...error,
          email: json.emailError,
          password: json.passwordError,
        });
      }
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      navigate("/signup");
    } catch (error) {
      console.log(error);
    }
  };

  return { signup, isLoading, error };
};
