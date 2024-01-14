import styled from "styled-components";
import { useState } from "react";

const MovieItem = ({ movie, handleMovie }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Container>
      <div
        className="movie-item"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => handleMovie(movie)}
      >
        <img
          src={`http://image.tmdb.org/t/p/w780${movie.poster_path}`}
          alt={movie.title}
        />
        <div
          className={`${
            isHover && "detailed"
          } movie-details flex j-center a-center`}
        ></div>
      </div>
    </Container>
  );
};

export default MovieItem;

const Container = styled.div`
  .movie-item {
    position: sticky;

    img {
      width: 100%;
      height: 100%;
      border-radius: 0.1rem;
    }

    .movie-details {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .title {
        width: 100%;
        height: 100%;
        padding: 10%;
        opacity: 0;
        line-height: 1;
        white-space: break-spaces;

        @media screen and (max-width: 200px) {
          font-size: 0.75rem;
        }

        @media screen and (max-width: 1280px) and (min-width: 960px) {
          font-size: 1rem;
        }
      }
    }

    .movie-details.detailed {
      transition: all 0.3s ease;
    }
  }
`;
