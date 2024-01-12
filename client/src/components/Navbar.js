import styled from "styled-components";
import Logo from "./Logo";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserDetailsContext } from "../hooks/useUserDetailsContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuthContext();
  const { userDetails } = useUserDetailsContext();
  const { logout } = useLogout();

  let userName = "";

  if (user) {
    const email = user.email;
    userName = email.substring(0, email.lastIndexOf("@"));
  }

  const handleClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <div className="navbar-container flex a-center j-between">
        <Logo />
        <div className="controls flex a-center">
          {user && userDetails && userDetails.length > 0 && (
            <div
              className={`user-info flex a-center ${
                location.pathname === `/${userName}` && "lightning"
              }`}
              onClick={() => navigate(`/${userName}`)}
            >
              <i>
                <FaRegUserCircle />
              </i>
              <div className="user-name">
                <h5>{userName}</h5>
              </div>
            </div>
          )}
          <button
            className={
              location.pathname === "/" || location.pathname === `/${userName}`
                ? "btn"
                : "btn default "
            }
            onClick={handleClick}
          >
            <span>{user ? "Sign Out" : "Sign In"}</span>
          </button>
        </div>
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

    .controls {
      gap: 1.5rem;

      .user-info {
        gap: 0.25rem;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: 0.2s color;

        i {
          font-size: 1.75rem;
        }
      }

      .user-info:hover {
        color: rgba(255, 255, 255, 1);
      }

      .user-info.lightning {
        color: rgba(255, 255, 255, 1);
      }

      button.default {
        font-size: 1rem;
        color: black;
        background-color: transparent;
      }

      button.default:hover {
        text-decoration: underline;
      }
    }
  }

  @media only screen and (max-width: 1280px) {
    .navbar-container {
      padding: 0 0.5rem;
    }
  }

  @media only screen and (max-width: 740px) {
    .navbar-container {
      height: 4.5rem;
    }
  }

  @media only screen and (max-width: 500px) {
    .navbar-container {
      height: 3.5rem;

      .controls {
        .user-info {
          .user-name {
            display: none;
          }
        }
      }
    }
  }
`;
