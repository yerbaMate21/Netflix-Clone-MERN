import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/home/Footer";
import bgImage from "../assets/img/background_userPage.jpg";
import { API_KEY, BASE_URL } from "../utils/constants";

const Netflix = ({ user, userDetails }) => {
  const [movies, setMovies] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}`
    );
    const data = await response.json();

    setMovies(data.results);
    setIsFetched(true);
  };

  console.log(movies);

  return (
    <Container>
      <div className="top-section">
        <Navbar />
        <Background image={bgImage} />
        <h1 className="t-center">Netflix Page</h1>
        {isFetched && <div className="movies">{movies[0].original_title} </div>}
      </div>
      <div className="bottom-section">bottom section</div>
      <Footer />
    </Container>
  );
};

export default Netflix;

const Container = styled.div`
  .top-section {
    height: 100vh;
    border: 1px solid green;
  }

  .bottom-section {
    border: 1px solid red;
  }
`;
