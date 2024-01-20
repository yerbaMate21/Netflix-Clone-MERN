import styled from "styled-components";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLikedMoviesContext } from "../hooks/useLikedMoviesContext";
import Navbar from "../components/Navbar";
import MovieItem from "../components/netflix/MovieItem";
import Divider from "../components/home/Divider";
import Footer from "../components/home/Footer";

const LikedMovies = () => {
  const { user } = useAuthContext();
  const { likedMovies, dispatch } = useLikedMoviesContext();

  useEffect(() => {
    if (user) {
      fetchLikedMovies();
    }
  }, [user]);

  const fetchLikedMovies = async () => {
    const response = await fetch(`/api/user/liked/${user.email}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_LIKEDMOVIES", payload: json });
    }
  };

  const handleMovie = () => {
    console.log("play video or remove from liked movies");
  };

  return (
    <Container>
      <Navbar />
      <div className="content">
        <h3>Liked Movies</h3>
        {likedMovies && likedMovies.length > 0 && (
          <div className="grid-container">
            {likedMovies.map((movie) => (
              <div className="movie-item-container" key={movie.id}>
                <MovieItem movie={movie} handleMovie={handleMovie} />
                <div className="controls">controls</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Divider />
      <Footer />
    </Container>
  );
};

export default LikedMovies;

const Container = styled.div`
  background-image: linear-gradient(
    to bottom,
    #000000,
    #080506,
    #0f0b0b,
    #150f10,
    #191313,
    #191313,
    #191313,
    #191313,
    #150f10,
    #0f0b0b,
    #080506,
    #000000
  );

  .content {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 1rem;
    padding: 2rem 12%;

    .grid-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;

      @media screen and (max-width: 960px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media screen and (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media screen and (max-width: 400px) {
        grid-template-columns: repeat(1, 1fr);
      }

      .movie-item-container {
        cursor: pointer;
        position: relative;

        .controls {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 1px solid yellow;
        }
      }

      .movie-item-container:hover {
        transition: all 0.3s ease;
        transform: scale(1.05);
      }
    }
  }
`;
