import styled from "styled-components";
import logo from "../assets/img/logo.png";
import background from "../assets/img/notFound.png";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <header>
        <div className="logo flex a-center">
          <button onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
          </button>
        </div>
      </header>
      <main>
        <div className="content flex column a-center j-center t-center">
          <h1>Lost your way?</h1>
          <p>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <button onClick={() => navigate("/")}>
            <span>Netflix Home</span>
          </button>
          <div className="error-text">
            <div className="line"></div>
            <div className="text">
              <p>
                Error Code&nbsp;<span>NSES-404</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg"></div>
      </main>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem auto;

  background-image: url(${background});
  background-size: cover;
  background-position: center;

  header {
    .logo {
      height: 4rem;
      background-color: black;
      padding: 0 2rem;

      button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;

        img {
          height: 3rem;
        }
      }
    }
  }

  main {
    position: relative;

    .content {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      gap: 2rem;
      padding: 0 1rem;

      h1 {
        font-size: 4rem;
      }

      button {
        background-color: rgba(255, 255, 255, 1);
        border: none;
        border-radius: 0.2rem;
        padding: 0.8rem 1.5rem;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
      }

      button:hover {
        background-color: rgba(255, 255, 255, 0.8);
      }

      .error-text {
        display: inline-flex;

        .line {
          min-width: 2px;
          height: 100%;
          background-color: #e50914;
        }

        .text {
          padding: 0.7rem;

          span {
            font-weight: bold;
          }
        }
      }
    }

    .bg {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: radial-gradient(
        ellipse at center,
        rgba(0, 0, 0, 0.5) 0,
        rgba(0, 0, 0, 0.2) 45%,
        rgba(0, 0, 0, 0.1) 55%,
        transparent 70%
      );
    }
  }

  @media only screen and (max-width: 960px) {
    main {
      .content {
        h1 {
          font-size: 3rem;
        }
      }
    }
  }

  @media only screen and (max-width: 420px) {
    main {
      transform: scale(0.75);
    }
  }
`;
