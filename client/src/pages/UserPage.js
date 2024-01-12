import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLikedMoviesContext } from "../hooks/useLikedMoviesContext";
import LoadingPage from "./LoadingPage";
import Navbar from "../components/Navbar";
import Divider from "../components/home/Divider";
import Footer from "../components/home/Footer";
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

  const handleMovie = () => {
    console.log("Open Movie Details");
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="top-section">
          <Navbar />
        </div>
      )}
      <Divider />
      <Footer />
    </Container>
  );
};

export default UserPage;

const Container = styled.div`
  .top-section {
    height: 100%;
    margin-bottom: 3rem;
  }
`;
