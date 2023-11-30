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
  const [data, setData] = useState([]);

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

  useEffect(() => {
    let genresArray = [];
    let moviesArray = [];

    genres.forEach((genre) => genresArray.push(genre.name));
    movies.forEach((movie) => moviesArray.push(movie.results));

    const a = moviesArray[0];
    const b = moviesArray[1];
    const c = moviesArray[2];

    if (a && b && c) {
      for (let i = 0; i < a.length; i++) {
        let a_id = a[i].id;
        let b_id = b[i].id;
        let c_id = c[i].id;

        if (a_id === b_id || a_id === c_id || b_id === c_id) {
          console.log("a", a_id);
          console.log("b", b_id);
          console.log("c", c_id);
        }
        if (a[i].id == b[i].id) {
          console.log(a[i].id);
        }
      }
    }

    const zip = genresArray.map(function (e, i) {
      return [e, moviesArray[i]];
    });

    setData(zip);
  }, [movies]);

  const getRandom = (array) => {
    const random = [...array].sort(() => 0.5 - Math.random());
    return random.slice(0, 3);
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );

      const data = await response.json();
      const randomFetchedGenres = getRandom(data.genres);
      setGenres(randomFetchedGenres);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovies = async () => {
    try {
      const data = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Navbar />
      <section>
        {data.map((d, i) => (
          <Slider movies={d[1]} genre={d[0]} key={i} />
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
