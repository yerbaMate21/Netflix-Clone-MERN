import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import MoviesGrid from "../components/netflix/MoviesGrid";
import Dividier from "../components/home/Divider";
import Footer from "../components/home/Footer";
import { API_KEY, BASE_URL } from "../utils/constants";

const Netflix = ({ user, userDetails }) => {
  const [movies, setMovies] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}`
    );
    const data = await response.json();

    setMovies(data.results);
    setIsFetched(true);
  };

  return (
    <Container>
      <div className="top-section">
        <Navbar />
        <h3 className="t-center">Netflix Page</h3>
        {isFetched && <MoviesGrid movies={movies} />}
      </div>
      <Dividier />
      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export default Netflix;

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
  height: 100%;

  footer {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
