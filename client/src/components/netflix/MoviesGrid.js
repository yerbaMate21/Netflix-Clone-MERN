import styled from "styled-components";
import MovieCard from "./MovieCard";

const MoviesGrid = ({ movies }) => {
  return (
    <Container>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </Container>
  );
};

export default MoviesGrid;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
