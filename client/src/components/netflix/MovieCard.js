import styled from "styled-components";

const MovieCard = ({ movie }) => {
  return (
    <Container>
      <div className="item">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt="movie"
        />
        <p>{movie.original_title}</p>
      </div>
    </Container>
  );
};

export default MovieCard;

const Container = styled.div`
  .item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 1rem;
    }

    img {
      width: 50%;
    }
  }
`;
