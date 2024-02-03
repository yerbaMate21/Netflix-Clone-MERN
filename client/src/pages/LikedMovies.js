import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLikedMoviesContext } from "../hooks/useLikedMoviesContext";
import Navbar from "../components/Navbar";
import MovieItem from "../components/netflix/MovieItem";
import VideoContainer from "../components/netflix/VideoContainer";
import Divider from "../components/home/Divider";
import Footer from "../components/home/Footer";
import LoadingPage from "./LoadingPage";
import { FaPlay, FaTrashAlt } from "react-icons/fa";

const LikedMovies = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { likedMovies, dispatch } = useLikedMoviesContext();
  const [videoKey, setVideoKey] = useState();
  const [videoIsOpen, setVideoIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (user) {
      fetchLikedMovies();
    }
  }, [user]);

  useEffect(() => {
    if (likedMovies && likedMovies.length < 1) {
      navigate("/");
    }
  }, [likedMovies]);

  const fetchLikedMovies = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://netflix-clone-mern-2br2.onrender.com/api/user/liked/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      dispatch({ type: "SET_LIKEDMOVIES", payload: json });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMovie = async (id) => {
    setIsLoading(true);

    const email = user.email;
    const movieId = id;

    try {
      const response = await fetch(
        "https://netflix-clone-mern-2br2.onrender.com/api/user/remove",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ email, movieId }),
        }
      );
      const json = await response.json();

      dispatch({ type: "REMOVE_LIKEDMOVIES", payload: json });

      setIsLoading(false);
      fetchLikedMovies();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlay = (key) => {
    setVideoKey(key);
    setVideoIsOpen(true);
  };

  const handleRemove = (movie) => {
    const id = movie.id;
    removeMovie(id);
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      {videoIsOpen ? (
        <VideoContainer
          width="100vw"
          height="100vh"
          videoKey={videoKey}
          setVideoIsOpen={setVideoIsOpen}
        />
      ) : (
        <Container>
          <Navbar />
          <div className="content">
            <h3>Liked Movies</h3>
            {likedMovies && likedMovies.length > 0 && (
              <div className="grid-container">
                {likedMovies.map((item, index) => (
                  <div
                    className="movie-item-container"
                    key={index}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                  >
                    <MovieItem movie={item.movie} handleMovie={() => null} />
                    <div className="controls flex">
                      <button
                        className="btn play"
                        onClick={() => handlePlay(item.videoKey)}
                      >
                        <i>
                          <FaPlay />
                        </i>
                      </button>
                      <button
                        className="btn del"
                        onClick={() => handleRemove(item.movie)}
                      >
                        <i>
                          <FaTrashAlt />
                        </i>
                      </button>
                    </div>
                    <div className={`bg ${isHover && "visible"}`}></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Divider />
          <Footer />
        </Container>
      )}
    </>
  );
};

export default LikedMovies;

const Container = styled.div`
  background-image: linear-gradient(
    to bottom,
    #000000,
    #080506,
    #0f0b0b,
    #150f10,
    #191313,
    #191313,
    #191313,
    #191313,
    #150f10,
    #0f0b0b,
    #080506,
    #000000
  );

  .content {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 1rem;
    padding: 2rem 12%;

    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;

      @media screen and (max-width: 960px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media screen and (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media screen and (max-width: 400px) {
        grid-template-columns: repeat(1, 1fr);
      }

      .movie-item-container {
        position: relative;

        .controls {
          position: absolute;
          top: 65%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          gap: 0.5rem;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          justify-content: center;

          .play,
          .del {
            background-color: rgba(255, 255, 255, 1);
            color: black;
            box-shadow: 0 0 15px 2px black;
            font-size: 2vw;

            @media screen and (max-width: 600px) {
              font-size: 4vw;
            }

            @media screen and (max-width: 400px) {
              font-size: 6vw;
            }
          }

          .play:hover,
          .del:hover {
            background-color: rgba(125, 125, 125, 1);
          }
        }

        .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
          z-index: 1;
          transition: all 0.3s ease;
        }

        .bg.visible {
          background-color: rgba(0, 0, 0, 0.5);
        }
      }

      .movie-item-container:hover {
        transition: all 0.3s ease;
        transform: scale(1.05);

        .controls {
          opacity: 1;
          pointer-events: auto;
        }

        .bg {
          background-color: rgba(0, 0, 0, 0);
        }
      }
    }
  }
`;
