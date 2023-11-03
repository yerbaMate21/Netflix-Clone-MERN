import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { UserDetailsContextProvider } from "./context/UserDetailsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserDetailsContextProvider>
        <App />
      </UserDetailsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
