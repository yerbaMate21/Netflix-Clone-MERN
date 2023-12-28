import styled from "styled-components";

const Movie = ({ movie }) => {
  return (
    <>
      {movie && (
        <Container>
          <div className="background flex a-center">
            <img
              src={`http://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="description">
              <section>
                <div className="title">{movie.title}</div>
                <div className="details">{movie.overview}</div>
                <div className="controls">
                  <button className="play">play</button>
                  <button className="liked">add to playlist</button>
                </div>
              </section>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Movie;

const Container = styled.div`
  .background {
    position: relative;

    img {
      width: 100vw;
      height: 100%;
    }
  }

  .description {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0)
    );
    border: 1px solid magenta;

    section {
    }
  }
`;
