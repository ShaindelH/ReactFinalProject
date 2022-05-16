import React, {useState, useEffect} from 'react';

export const MovieContext = React.createContext();
export const MovieProvider = (props) => {
const [displayMovies, setDisplayMovies] = useState(new Map([]));
const [likedMovies, setLikedMovies] = useState(new Map([]));
const [ratedMovies, setRatedMovies] = useState(new Map([]));
const [movieSearch, setMovieSearch] = useState("Trending");
const [selectedMovie, setSelectedMovie] = useState();
var apiKey = "91353e9e0ae592ed9abfaeb0d5d467ed";

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
  .then(result => result.json())
  .then((data) => {
      let popularMovies = new Map([]);
      data.results.map(movie => {
        popularMovies.set(movie.id, {title: movie.title, id: movie.id, img:`https://image.tmdb.org/t/p/w154${movie.poster_path}`, isLiked: false});
      })
      setDisplayMovies(popularMovies);
  })
}, []);

  return (
      <MovieContext.Provider
        value= {{
          displayMovies,
          setDisplayMovies,
          likedMovies,
          setLikedMovies,
          ratedMovies,
          setRatedMovies,
          selectedMovie,
          setSelectedMovie,
          movieSearch,
          setMovieSearch,
        }}
      >
     {props.children}
      </MovieContext.Provider>
  )};