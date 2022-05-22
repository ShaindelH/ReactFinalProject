import "./explore.css";
import "../app/App.css";
import {TextField, Button, Grid} from "@mui/material";
import React, {useState, useContext} from 'react';
import {MovieContext} from "../state/movieContext";
import {MovieCard} from "../movie/movie";
import SearchIcon from '@mui/icons-material/Search';

export const Explore = () => {
    const [searchText, setSearchText] = useState("");
    const {setDisplayMovies, displayMovies, movieSearch, setMovieSearch} = useContext(MovieContext);
    var apiKey = "91353e9e0ae592ed9abfaeb0d5d467ed";

   
    function searchMovie(){
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`)
        .then(result => result.json())
        .then((data) => {
            let newMovies = new Map([]);
            data.results.map(movie => {
              newMovies.set(movie.id, {title: movie.title, id: movie.id, img:`https://image.tmdb.org/t/p/w154${movie.poster_path}`, rating: (movie.vote_average/2)})
            });
            
            setDisplayMovies(newMovies);
            setMovieSearch(`"${searchText}"`);
        }) 
    }

    function onInputKeyUp(event) {
      if (event.key === 'Enter') {
        searchMovie();
      }
    }
    
    return (
    <div className="explore">
      <h6 className="title">EXPLORE</h6>
      <div className = "search">
      <TextField 
        id="outlined-basic" variant="outlined" size= "small"
        label = "Search..."
        onChange={(event) => setSearchText(event.target.value)}
        value = {searchText}
        onKeyUp={onInputKeyUp}
        autoFocus
        />
        <Button size="40" onClick={searchMovie}>
          <SearchIcon size="40"/>
        </Button>
        </div>
        <p style={{fontSize:45}} className="title">{movieSearch} MOVIES</p>
        <Grid container alignItems="stretch" direction="row" justifyContent="center" spacing={2} >
          {[...displayMovies.keys()].map(key => {
            if (displayMovies.get(key).img.substring(displayMovies.get(key).img.length - 4) !== "null") {
                return <Grid item style={{height: "100%", width: "300px"}}>    
                    <MovieCard movie={displayMovies.get(key)} /></Grid>
            }
          })}
        </Grid>
    </div>
  );
  }
  