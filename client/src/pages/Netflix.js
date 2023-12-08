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

  let sliderCount = 10;

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

  let genresArray = [];
  let moviesArray = [];
  let allMoviesIds = [];
  const splitIndex = allMoviesIds.length / sliderCount;

  useEffect(() => {
    genres.forEach((genre) => genresArray.push(genre.name));
    movies.forEach((movie) => moviesArray.push(movie.results));

    moviesArray.forEach((movie) => {
      for (let i = 0; i < movie.length; i++) {
        allMoviesIds.push(movie[i].id);
      }
    });

    const duplicateMovies = checkDuplicate(allMoviesIds);
    const splitIndex = allMoviesIds.length / sliderCount;
    const separateMoviesIds = chunk(allMoviesIds, splitIndex);

    // all movies ids
    //console.log("all", allMoviesIds);

    // duplicated movies ids
    // console.log("duplicate", duplicateMovies);

    // separated movies ids
    // console.log("separated", separateMoviesIds);

    //#################################//#################################//#################################
    //#################################//#################################//#################################
    // check which separated array contains one of duplicates

    for (let i of duplicateMovies) {
      const found = (element) => element == i;

      for (let j = 0; j < separateMoviesIds.length; j++) {
        console.log(
          "duplicate ID:",
          i,
          "exist in:",
          j,
          "?",
          separateMoviesIds[j].some(found),
          "------ duplicates count",
          duplicateMovies.length,
          "---slider count:",
          sliderCount
        );
        // delete specific duplicate from array
      }
    }
    //#################################//#################################//#################################
    //#################################//#################################//#################################
    //#################################//#################################//#################################

    const zip = genresArray.map(function (e, i) {
      return [e, moviesArray[i]];
    });

    setData(zip);
  }, [movies]);

  const checkDuplicate = (array) => {
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      if (obj[array[i]]) obj[array[i]]++;
      else obj[array[i]] = 1;
    }

    let duplicateElements = [];
    for (let i in obj) {
      if (obj[i] > 1) {
        duplicateElements.push(i);
      }
    }

    return duplicateElements;
  };

  const chunk = (arr, size) => {
    let newArr = [];
    for (let i = 0; i < arr.length; i += size) {
      const sliceIt = arr.slice(i, i + size);
      newArr.push(sliceIt);
    }
    return newArr;
  };

  const getRandom = (array) => {
    const random = [...array].sort(() => 0.5 - Math.random());
    return random.slice(0, sliderCount);
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
        {data.map((d, index) => (
          <Slider movies={d[1]} genre={d[0]} key={index} />
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
