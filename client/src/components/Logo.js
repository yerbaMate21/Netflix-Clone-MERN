import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

const Logo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <div className={`logo ${location.pathname === "/" && "no-pointer"}`}>
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
      </div>
    </Container>
  );
};

export default Logo;

const Container = styled.div`
  .logo {
    img {
      height: 5rem;
      cursor: pointer;
    }

    @media only screen and (max-width: 960px) {
      img {
        height: 3.5rem;
      }
    }
  }

  .logo.no-pointer > img {
    cursor: default;
  }
`;
