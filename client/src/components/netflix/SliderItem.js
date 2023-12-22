import styled from "styled-components";
import { useState } from "react";

const SliderItem = ({ movie }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Container>
      <div
        className="slider-item"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div
          className={`${
            isHover && "detailed"
          } movie-details flex j-center a-center`}
        >
          <div className="title flex j-center a-center t-center">
            {movie.title}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SliderItem;

const Container = styled.div`
  .slider-item {
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
      background-color: rgba(0, 0, 0, 0);

      .title {
        width: 100%;
        height: 100%;
        padding: 0 12.5%;
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
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease;

      .title {
        opacity: 1;
        transition: all 0.3s ease;
      }
    }
  }
`;
