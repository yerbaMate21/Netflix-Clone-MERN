import styled from "styled-components";

const SliderItem = ({ movie, width }) => {
  return (
    <Container style={{ width: `${width}%` }}>
      <img
        src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
        alt={movie.title}
      />
    </Container>
  );
};

export default SliderItem;

const Container = styled.div`
  display: inline-block;

  img {
    width: 100%;
    height: 100%;
  }
`;
