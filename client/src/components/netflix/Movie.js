import styled from "styled-components";
import Divider from "../home/Divider";
import { FaPlay, FaPlus, FaStar } from "react-icons/fa";

const Movie = ({ movie }) => {
  return (
    <>
      {movie && (
        <Container>
          <Divider />
          <div
            className="movie-container"
            style={{
              backgroundImage: `url("http://image.tmdb.org/t/p/w780${movie.backdrop_path}")`,
            }}
          >
            <div className="description">
              <div className="details flex j-center">
                <div className="title">
                  <h1>{movie.title}</h1>
                </div>
                <div className="info flex">
                  <div className="date">{movie.release_date.slice(0, 4)}</div>
                  <div className="rate flex a-center">
                    <i>
                      <FaStar />
                    </i>
                    <span>{movie.vote_average}</span>
                  </div>
                </div>
                <div className="overview">
                  <span>{movie.overview}</span>
                </div>
                <div className="controls flex">
                  <button className="btn play">
                    <i>
                      <FaPlay />
                    </i>
                    <span>Play</span>
                  </button>
                  <button className="btn like">
                    <i>
                      <FaPlus />
                    </i>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Divider />
        </Container>
      )}
    </>
  );
};

export default Movie;

const Container = styled.div`
  .movie-container {
    position: relative;
    width: 100%;
    min-width: 220px;
    height: 80vh;
    background-size: cover;
    background-position: 50% 0;

    .description {
      padding: 0 6%;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.9) 5%,
        rgba(0, 0, 0, 0.5) 70%,
        rgba(0, 0, 0, 0.25) 80%,
        rgba(0, 0, 0, 0) 100%
      );

      .details {
        flex-direction: column;
        gap: 1.5rem;
        width: 50%;
        height: 100%;
        line-height: 1;

        .info {
          gap: 1rem;

          .rate {
            line-height: 0;
            gap: 0.25rem;
            color: #e87c03;
          }
        }

        .overview {
          color: rgba(255, 255, 255, 0.7);
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

        span {
          font-size: 1.2rem;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .movie-container {
      .description {
        .details {
          gap: 1rem;
          padding: 3rem 0;

          span {
            font-size: 1rem;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .movie-container {
      .description {
        .details {
          padding: 2rem 0;
          width: 100%;
        }
      }
    }
  }

  @media only screen and (max-width: 400px) {
    .movie-container {
      .description {
        .details {
          padding: 1rem 0;
        }
      }
    }
  }
`;
