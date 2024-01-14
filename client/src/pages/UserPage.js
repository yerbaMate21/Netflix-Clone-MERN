import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLikedMoviesContext } from "../hooks/useLikedMoviesContext";
import LoadingPage from "./LoadingPage";
import Navbar from "../components/Navbar";
import MovieItem from "../components/netflix/MovieItem";
import Divider from "../components/home/Divider";
import Footer from "../components/home/Footer";

const UserPage = ({ user }) => {
  const { likedMovies, dispatch } = useLikedMoviesContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchLikedMovies();
    }
  }, [user]);

  const fetchLikedMovies = async () => {
    setIsLoading(true);

    const response = await fetch(`/api/user/liked/${user.email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_LIKEDMOVIES", payload: json });
      setIsLoading(false);
    }
  };

  const handleMovie = () => {
    console.log("play video or remove from liked movies");
  };

  return (
    <Container>
      <Navbar />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="content">
          <h3>Liked Movies</h3>
          {likedMovies && likedMovies.length > 0 && (
            <div className="grid-container">
              {likedMovies.map((movie) => (
                <div className="movie-item-container" key={movie.id}>
                  <MovieItem movie={movie} handleMovie={handleMovie} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Divider />
      <Footer />
    </Container>
  );
};

export default UserPage;

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
      gap: 0.5rem;

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
        transition: all 0.3s ease;
      }

      .movie-item-container:hover {
        transform: scale(1.05);
      }
    }
  }
`;
