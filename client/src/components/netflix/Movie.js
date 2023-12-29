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
              <div className="details flex">
                <div className="title">
                  <h1>{movie.title}</h1>
                </div>
                <div className="info flex">
                  <div className="date">{movie.release_date.slice(0, 4)}</div>
                  <div className="rate flex a-center">
                    <i>
                      <FaStar />
                    </i>
                    <p>{movie.vote_average}</p>
                  </div>
                </div>
                <div className="overview">{movie.overview}</div>
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
    min-width: 200px;
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
        rgba(0, 0, 0, 0.8) 25%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.25) 75%,
        rgba(0, 0, 0, 0) 100%
      );

      .details {
        flex-direction: column;
        gap: 1.5rem;
        padding: 4rem 0;
        width: 100%;
        width: 50%;
        height: 100%;

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
            line-height: 1;
            gap: 0.5rem;
            font-size: 1.2rem;
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
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .movie-container {
      .description {
        .details {
          padding: 3rem 0;
          width: 75%;
        }
      }
    }
  }

  @media only screen and (max-width: 400px) {
    .movie-container {
      .description {
        .details {
          padding: 2rem 0;
          width: 100%;

          .controls {
            .play,
            .like {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
`;
