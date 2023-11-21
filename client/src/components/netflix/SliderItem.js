import styled from "styled-components";

const SliderItem = ({ movie, width }) => {
  return (
    <Container>
      <div className="slider-item" style={{ width: `${width}%` }}>
        <img
          className="slider-image"
          src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
      </div>
    </Container>
  );
};

export default SliderItem;

const Container = styled.div`
  .slider-item {
    padding: 0 4px;
    display: inline-block;

    &-image {
      width: 100%;
      height: 100%;
    }

    &:first-of-type {
      padding-left: 0;
    }

    &:last-of-type {
      padding-right: 0;
    }

    img {
      display: block;
      width: 100%;
      max-width: 100%;
    }
  }
`;
