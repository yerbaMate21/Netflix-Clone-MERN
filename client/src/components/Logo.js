import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.png";

const Logo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <Container>
      <div className={location.pathname === "/" ? "home-logo" : "default-logo"}>
        <img src={logo} alt="logo" onClick={handleClick} />
      </div>
    </Container>
  );
};

export default Logo;

const Container = styled.div`
  .home-logo {
    img {
      height: 5rem;
    }

    @media only screen and (max-width: 960px) {
      img {
        height: 3.5rem;
      }
    }
  }

  .default-logo {
    img {
      height: 5.5rem;
      cursor: pointer;
    }

    @media only screen and (max-width: 500px) {
      img {
        height: 3rem;
      }
    }
  }
`;
