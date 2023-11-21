import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/netflix/Slider";
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
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
    );
    const data = await response.json();

    setMovies(data.results);
    setIsFetched(true);
  };

  return (
    <>
      {isFetched && (
        <Container>
          <Navbar />
          <Slider movies={movies} />
          <Dividier />
          <footer>
            <Footer />
          </footer>
        </Container>
      )}
    </>
  );
};

export default Netflix;

const Container = styled.div`
  height: 100%;
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

  footer {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
