import styled from "styled-components";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/netflix/Slider";
import Dividier from "../components/home/Divider";
import Footer from "../components/home/Footer";
import { API_KEY, BASE_URL } from "../utils/constants";

const Netflix = ({ user, userDetails }) => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [urls]);

  useEffect(() => {
    genres.forEach((genre) => {
      const newUrls = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-USsort_by=popularity.desc&page=1&with_genres=${genre.id}`;

      setUrls((url) => [...url, newUrls]);
    });
  }, [genres]);

  const getRandomGenres = (array) => {
    const randomGenres = [...array].sort(() => 0.5 - Math.random());
    return randomGenres.slice(0, 2);
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );

      const data = await response.json();
      const randomFetchedGenres = getRandomGenres(data.genres);
      setGenres(randomFetchedGenres);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovies = async () => {
    try {
      const results = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      setMovies(results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Navbar />
      <section>
        {genres.map((genre) => (
          <div key={genre.id}>
            {movies.map((movie) => (
              <Slider
                movies={movie.results}
                genre={genre.name}
                key={movie.id}
              />
            ))}
          </div>
        ))}
      </section>
      <Dividier />
      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export default Netflix;

const Container = styled.div`
  width: 100%;
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

  section {
    margin-top: 1rem;
    margin-bottom: 3rem;
  }

  footer {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
