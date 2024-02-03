import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLikedMoviesContext } from "../hooks/useLikedMoviesContext";
import LoadingPage from "./LoadingPage";
import Navbar from "../components/Navbar";
import Slider from "../components/netflix/Slider";
import Movie from "../components/netflix/Movie";
import Dividier from "../components/home/Divider";
import Footer from "../components/home/Footer";
import { API_KEY, BASE_URL } from "../utils/constants";

const Netflix = () => {
  const { user } = useAuthContext();
  const { dispatch } = useLikedMoviesContext();
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [urls, setUrls] = useState([]);
  const [data, setData] = useState([]);
  const [openMovie, setOpenMovie] = useState(null);
  const [videoIsOpen, setVideoIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let sliderCount = 3;

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

    let duplicateObjectsArray = [];

    for (let i of duplicateMovies) {
      const found = (element) => element === i;
      for (let j = 0; j < separateMoviesIds.length; j++) {
        const booleanValue = separateMoviesIds[j].some(found);
        if (booleanValue === true) {
          let obj = { id: i, index: j };
          duplicateObjectsArray.push(obj);
        }
      }
    }

    let objectsToRemove = [];

    for (let i = 0; i < duplicateObjectsArray.length - 1; i++) {
      if (duplicateObjectsArray[i].id === duplicateObjectsArray[i + 1].id) {
        let obj = {
          id: duplicateObjectsArray[i].id,
          index: duplicateObjectsArray[i + 1].index,
        };
        objectsToRemove.push(obj);
      }
    }

    // remove duplicates
    if (objectsToRemove.length > 0) {
      for (let i = 0; i < moviesArray.length; i++) {
        for (let j of objectsToRemove) {
          if (i === j.index) {
            for (let k of moviesArray[i]) {
              if (j.id === k.id) {
                const findIndex = moviesArray[i].findIndex(
                  (obj) => obj.id === k.id
                );
                findIndex !== -1 && moviesArray[i].splice(findIndex, 1);
              }
            }
          }
        }
      }
    }

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
      setIsLoading(true);
      const data = await Promise.all(
        urls.map((url) => fetch(url).then((res) => res.json()))
      );
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLikedMovies = async () => {
    try {
      const response = await fetch(
        `https://netflix-clone-mern-2br2.onrender.com/api/user/liked/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      dispatch({ type: "SET_LIKEDMOVIES", payload: json });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGenres();
    fetchLikedMovies();
  }, []);

  const handleMovie = (movie) => {
    setOpenMovie(movie);
    setVideoIsOpen(false);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <Container>
        <Navbar />
        <header>
          {openMovie && (
            <Movie
              movie={openMovie}
              videoIsOpen={videoIsOpen}
              setVideoIsOpen={setVideoIsOpen}
            />
          )}
        </header>
        <section>
          {data.map((d, index) => (
            <Slider
              movies={d[1]}
              genre={d[0]}
              key={index}
              handleMovie={handleMovie}
            />
          ))}
        </section>
        <Dividier />
        <footer>
          <Footer />
        </footer>
      </Container>
    </>
  );
};

export default Netflix;

const Container = styled.div`
  width: 100%;
  min-width: 300px;
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
    margin-bottom: 8rem;
  }

  footer {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
