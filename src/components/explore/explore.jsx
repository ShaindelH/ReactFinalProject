import "./explore.css";
import "../app/App.css";
import {TextField, Button, Grid} from "@mui/material";
import React, {useState, useContext, useEffect} from 'react';
import {MovieContext} from "../state/movieContext";
import {MovieCard} from "../movie/movie";

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
              newMovies.set(movie.id, {title: movie.title, id: movie.id, img:`https://image.tmdb.org/t/p/w154${movie.poster_path}`, vote: movie.vote_average})
            });
            
            setDisplayMovies(newMovies);
            setMovieSearch(`\"${searchText}\"`);
        }) 
    }
    
    return (
    <div className="explore">
      <h6 className="title" >Explore</h6>
      <div className = "search">
      <TextField 
        id="outlined-basic" variant="outlined" size= "small"
        label = "Search..."
        onChange={(event) => setSearchText(event.target.value)}
        value = {searchText}
        autoFocus
        />
        <Button  onClick={searchMovie}>
          Search
        </Button>
        </div>
        <p className="title" >{movieSearch} Movies</p>
        <Grid container alignItems="stretch" direction="row" justifyContent="center" spacing={2} >
               {[...displayMovies.keys()].map(key => {
                    return <Grid item style={{height: "100%", width: "300px"}}>    
                    <MovieCard movie={displayMovies.get(key)} /></Grid>
               })}
                </Grid>
    </div>
  );
  }
  