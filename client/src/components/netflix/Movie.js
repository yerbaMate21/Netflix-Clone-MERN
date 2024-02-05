import styled from "styled-components";
import { useState, useEffect } from "react";
import Divider from "../home/Divider";
import VideoContainer from "./VideoContainer";
import AlertWindow from "../AlertWindow";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLikedMoviesContext } from "../../hooks/useLikedMoviesContext";
import { API_KEY, BASE_URL } from "../../utils/constants";
import { FaPlay, FaPlus, FaStar } from "react-icons/fa";
import LoadingPage from "../../pages/LoadingPage";

const Movie = ({ movie, videoIsOpen, setVideoIsOpen }) => {
  const { user } = useAuthContext();
  const { likedMovies, dispatch } = useLikedMoviesContext();
  const [videoKey, setVideoKey] = useState(null);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchVideo();
  }, [movie]);

  const fetchVideo = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`
      );

      const data = await response.json();
      const videoKey = data.results[0].key;
      setVideoKey(videoKey);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToLiked = async () => {
    setIsLoading(true);

    const email = user.email;
    const data = { movie, videoKey };

    const response = await fetch("https://netflix-clone-mern-2br2.onrender.com/api/user/liked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ email, data }),
    });
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies));

      dispatch({ type: "ADD_LIKEDMOVIES", payload: json });

      setIsLoading(false);
      setIsAlertShown(true);
      setTimeout(() => setIsAlertShown(false), 2500);
    }
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <Divider />
          <div className="movie-container">
            <div
              className="background"
              style={{
                backgroundImage: `url("http://image.tmdb.org/t/p/w780${movie.backdrop_path}")`,
              }}
            ></div>
            <div
              className={`bg-shadow ${
                videoIsOpen || isAlertShown ? "bg-dark" : "bg-light"
              }`}
            ></div>
            {!videoIsOpen && (
              <div className="description flex j-center column">
                <div className="title">
                  <h1>{movie.title}</h1>
                </div>
                <div className="details flex">
                  <h3>{movie.release_date.slice(0, 4)}</h3>
                  <div className="box flex a-end">
                    <div className="rate flex a-center">
                      <i>
                        <FaStar />
                      </i>
                      <h2>{movie.vote_average}</h2>
                    </div>
                    <div className="reviews">
                      {movie.vote_count}&nbsp;reviews
                    </div>
                  </div>
                </div>
                <div className="controls flex">
                  <button
                    className="btn play"
                    onClick={() => setVideoIsOpen(true)}
                  >
                    <i>
                      <FaPlay />
                    </i>
                    <span>Play Now</span>
                  </button>
                  <button className="btn like" onClick={handleAddToLiked}>
                    <i>
                      <FaPlus />
                    </i>
                    <span>My list</span>
                  </button>
                </div>
                <div className="overview">{movie.overview}</div>
              </div>
            )}
            {videoIsOpen && (
              <VideoContainer
                width="700px"
                videoKey={videoKey}
                setVideoIsOpen={setVideoIsOpen}
              />
            )}
            {likedMovies && likedMovies.length > 0 && (
              <AlertWindow
                message={likedMovies[0].message}
                showAlert={isAlertShown}
              />
            )}
          </div>
          <Divider />
        </>
      )}
    </Container>
  );
};

export default Movie;

const Container = styled.div`
  .movie-container {
    position: relative;
    width: 100%;
    height: 70vh;

    .background,
    .bg-shadow,
    .description {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .background {
      left: 50%;
      transform: translate(-50%);
      background-position-x: center;
      background-position-y: 33%;
      background-size: cover;
    }

    .bg-light {
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.2) 30%,
        rgba(0, 0, 0, 1) 100%
      );
    }

    .bg-dark {
      background: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.75) 5%,
        rgba(0, 0, 0, 1) 100%
      );
    }

    .description {
      width: 60%;
      padding: 0 6%;
      gap: 1.25rem;
      line-height: 1;

      .details {
        gap: 0.75rem;
        line-height: 0;
        align-items: center;

        .box {
          gap: 0.5rem;

          .rate i {
            color: #e87c03;
          }

          .reviews {
            color: rgba(255, 255, 255, 0.7);
            font-size: 1rem;
            margin-bottom: 0.25rem;

            @media only screen and (max-width: 960px) {
              font-size: 0.8rem;
            }
          }
        }
      }

      .controls {
        gap: 0.5rem;

        .play,
        .like {
          display: flex;
          align-items: center;
          line-height: 1;
          gap: 0.5rem;
        }

        .play {
          background-color: rgba(255, 255, 255, 1);
          color: black;
        }

        .like {
          background-color: rgba(255, 255, 255, 0.25);
        }

        .play:hover,
        .like:hover {
          background-color: rgba(255, 255, 255, 0.5);
        }
      }

      .overview {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.2rem;

        @media only screen and (max-width: 960px) {
          font-size: 1rem;
        }
      }

      span {
        font-size: 1.2rem;

        @media only screen and (max-width: 960px) {
          font-size: 1rem;
        }
      }
    }
  }

  @media only screen and (max-width: 500px) {
    .movie-container {
      .description {
        width: 100%;
        align-items: center;
        text-align: center;
        padding: 0.5rem;

        .controls {
          flex-direction: column;
        }
      }
    }
  }
`;
