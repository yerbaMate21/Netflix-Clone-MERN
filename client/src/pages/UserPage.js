import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLikedMoviesContext } from "../hooks/useLikedMoviesContext";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/home/Footer";
import LoadingPage from "./LoadingPage";
import bgImage from "../assets/img/background_home.jpg";
import Slider from "../components/netflix/Slider";

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

  useEffect(() => {
    if (likedMovies) {
      console.log(likedMovies.length);
    }
  }, [likedMovies]);

  return (
    <Container>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="top-section">
          <Navbar />
          <Background image={bgImage} />
          <h3>{user.email}</h3>
          {likedMovies && (
            <Slider />
            // <span>
            //   {likedMovies.map((movie) => (
            //     <h6>{movie.title}</h6>
            //   ))}
            // </span>
          )}
        </div>
      )}
      <Footer />
    </Container>
  );
};

export default UserPage;

const Container = styled.div`
  .top-section {
    height: 100vh;
  }
`;
