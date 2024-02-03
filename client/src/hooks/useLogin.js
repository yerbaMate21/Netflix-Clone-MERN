import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError({
      ...error,
      email: null,
      password: null,
    });

    try {
      const response = await fetch(
        "https://netflix-clone-mern-2br2.onrender.com/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError({
          ...error,
          email: json.emailError,
          password: json.passwordError,
        });
      }
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { login, isLoading, error };
};
