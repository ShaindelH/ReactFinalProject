import "./details.css";
import "../app/App.css";
import {
  Button,
  Typography,
  Stack,
  Grid,
  Rating
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "../state/movieContext";
import { useNavigate, useParams} from "react-router-dom";
import { MovieCard } from "../movie/movie";
import { LikeButton } from "../movie/likeButton";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";

export const Details = () => {
  const { selectedMovie, setSelectedMovie} = useContext(MovieContext);
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([{}]);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {  
    if(id !== selectedMovie){
      setSelectedMovie(id);
    }
    window.scrollTo(0, 0);
    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=91353e9e0ae592ed9abfaeb0d5d467ed`
    )
      .then((result) => result.json())
      .then((data) => {
        const currMovie = {
          title: data.title,
          id: Number(selectedMovie),
          img: `https://image.tmdb.org/t/p/w154${data.poster_path}`,
          overview: data.overview,
          runtime: data.runtime,
          year: data.release_date.substring(0, data.release_date.indexOf("-"))
        };
        setMovie(currMovie);
        const genre = data.genres.map((item) => {
          return item.name;
        });
        setGenres(genre);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMovie}/similar?api_key=91353e9e0ae592ed9abfaeb0d5d467ed&language=en-US&page=1`
    )
      .then((result) => result.json())
      .then((data) => {
        const newMovies = data.results.slice(0, 3).map((element) => {
          return {
            title: element.title,
            id: element.id,
            img: `https://image.tmdb.org/t/p/w154${element.poster_path}`,
            rating: element.vote_average / 2, //convert from out of 10 to out of 5
          };
        });
        setSimilarMovies(newMovies);
      });

    fetch(
      `https://api.themoviedb.org/3/movie/${selectedMovie}/credits?api_key=91353e9e0ae592ed9abfaeb0d5d467ed&language=en-US`
    )
      .then((result) => result.json())
      .then((data) => {
        const castInfo = data.cast.map((member) => {
          return {
            name: member.name,
            img: `https://image.tmdb.org/t/p/w185${member.profile_path}`,
            character: member.character,
          };
        });
        setCast(castInfo);
      });
  }, [selectedMovie]);


  return !selectedMovie || id === ":id" ? (
    <div>
      <p className="title"> Movie Details </p>
      <div className="centered">
        <Button
        style={{ backgroundColor:"black"}}
          variant="contained"
          onClick={() => {
            navigate(`/`);
          }}
        >
          Explore Movies
        </Button>
      </div>
    </div>
  ) : (
    <div>
      <p className="title">
        {movie.title}
        <LikeButton movie={movie} />
      </p>
      <div className="movieDeets">
        <Stack sx={{ justifyContent: "center" }} direction="row" spacing={3}>
          <Typography variant="body2">{movie.year} </Typography>
          <Typography variant="body2">
            {Math.floor(movie.runtime / 60) +
              " hrs " +
              (movie.runtime % 60) +
              " mins"}
          </Typography>
        </Stack>
        <Stack
          className="genres"
          sx={{ justifyContent: "center" }}
          direction="row"
          spacing={3}
        >
          {genres.map((genre) => (
            <Typography variant="body2">{genre}</Typography>
          ))}
        </Stack>
        <div>
          <img className="photo" src={movie.img} alt={movie.title} />
        </div>
        <p style={{ fontSize: 35 }} className="title">
          Overview
        </p>
        <p style={{ fontSize: 30, fontFamily: "Segoe UI" }}>{movie.overview}</p>

        <p style={{ fontSize: 35 }} className="title">
          Cast
        </p>
        <div className="carousel">
        <Carousel 
        interval={1000}
        style={{ height: "450px", width: "300px"}}
      >
        {cast.map((actor) => {
            return (
              <Carousel.Item style={{ height: "450px", width: "300px" }}>
                <img
                  style={{ height: "450px", width: "300px" }}
                  className="d-block w-100"
                  src={actor.img}
                  alt={actor.name}
                />
                <Carousel.Caption>
                  <h3>{actor.name}</h3>
                  <p>Character: {actor.character}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
        })}
      </Carousel>
      </div>
        <p style={{ fontSize: 35 }} className="title">
          Similar Movies
        </p>
        <Grid
          container
          alignItems="stretch"
          direction="row"
          justifyContent="center"
          spacing={2}
        >
          {similarMovies.map((movie) => {
            return (
              <Grid item style={{ height: "100%" ,width:"300px"}} >
                <MovieCard movie={movie} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

