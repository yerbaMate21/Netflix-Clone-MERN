import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserDetailsContext } from "../hooks/useUserDetailsContext";
import { useLikedMoviesContext } from "../hooks/useLikedMoviesContext";
import { useLogout } from "../hooks/useLogout";
import Logo from "./Logo";
import LoadingPage from "../pages/LoadingPage";
import { BiUserCircle, BiLike, BiMoviePlay } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const { userDetails, dispatch } = useUserDetailsContext();
  const { likedMovies } = useLikedMoviesContext();
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(false);

  let userName = "";

  if (user) {
    const email = user.email;
    userName = email.substring(0, email.lastIndexOf("@"));
  }

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    setIsLoading(true);

    const response = await fetch("/api/userDetails", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_USERDETAILS", payload: json });
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Container>
          <div className="navbar-container flex a-center j-between">
            <Logo />
            <div className="controls flex a-center">
              <>
                {userDetails && userDetails.length > 0 && (
                  <div
                    className={`top-movies flex a-center ${
                      location.pathname === `/` && "lightning"
                    }`}
                    onClick={() => navigate("/")}
                  >
                    <i>
                      <BiMoviePlay />
                    </i>
                    <div className="text">
                      <h5>top movies</h5>
                    </div>
                  </div>
                )}
              </>
              <>
                {likedMovies && likedMovies.length > 0 && (
                  <div
                    className={`liked flex a-center ${
                      location.pathname === `/${userName}/liked` && "lightning"
                    }`}
                    onClick={() => navigate(`/${userName}/liked`)}
                  >
                    <i>
                      <BiLike />
                    </i>
                    <div className="text">
                      <h5>my playlist</h5>
                    </div>
                  </div>
                )}
              </>
              <>
                {user && (
                  <div className="user-info flex a-center">
                    <i>
                      <BiUserCircle />
                    </i>
                    <div className="text">
                      <h6>{userName}</h6>
                    </div>
                  </div>
                )}
              </>
              <button
                className={
                  location.pathname === "/" ||
                  location.pathname === `/${userName}` ||
                  location.pathname === `/${userName}/liked`
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
      )}
    </>
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

      .top-movies,
      .liked,
      .user-info {
        gap: 0.25rem;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: 0.2s color;

        i {
          font-size: 1.75rem;
        }
      }

      .user-info {
        cursor: default;
      }

      .top-movies:hover,
      .liked:hover {
        color: rgba(255, 255, 255, 1);
      }

      .top-movies.lightning,
      .liked.lightning {
        color: rgba(255, 255, 255, 1);
        cursor: default;
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
        gap: 0.75rem;

        .top-movies {
          .text {
            display: none;
          }
        }

        .liked {
          .text {
            display: none;
          }
        }

        .user-info {
          .text {
            display: none;
          }
        }
      }
    }
  }
`;
