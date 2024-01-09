import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { UserDetailsContextProvider } from "./context/UserDetailsContext";
import { LikedMoviesContextProvider } from "./context/LikedMoviesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserDetailsContextProvider>
        <LikedMoviesContextProvider>
          <App />
        </LikedMoviesContextProvider>
      </UserDetailsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
