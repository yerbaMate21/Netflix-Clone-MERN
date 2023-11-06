import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    }
    if (user) {
      logout();
      navigate("/");
    }
  };

  return (
    <Container>
      <div className="navbar-container flex a-center j-between">
        <Logo />
        {user && <p>{user.email}</p>}
        <button className="btn" onClick={handleClick}>
          <span>{user ? "Sign Out" : "Sign In"}</span>
        </button>
      </div>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  .navbar-container {
    padding: 0 1.5rem;
    height: 5.5rem;
    line-height: 0;
  }

  @media only screen and (max-width: 1280px) {
    .navbar-container {
      padding: 0 0.5rem;
    }
  }

  @media only screen and (max-width: 740px) {
    .navbar-container {
      height: 4.5rem;

      button {
        span {
          font-size: 1rem;
        }
      }
    }
  }

  @media only screen and (max-width: 500px) {
    .navbar-container {
      height: 3.5rem;

      button {
        span {
          font-size: 0.9rem;
        }
      }
    }
  }
`;
