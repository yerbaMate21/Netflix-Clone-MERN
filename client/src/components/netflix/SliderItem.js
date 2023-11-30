import styled from "styled-components";

const SliderItem = ({ movie }) => {
  return (
    <Container>
      <div className="slider-item">
        <img
          src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
        <div className="movie-details flex j-center a-center">
          {/* <div className="title">{movie.title}</div> */}
        </div>  
      </div>
    </Container>
  );
};

export default SliderItem;

const Container = styled.div`
  .slider-item {
    position: relative;

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
      color: red;
    }
  }
`;
