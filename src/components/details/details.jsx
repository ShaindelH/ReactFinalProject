import "./details.css";
import "../app/App.css";
import {Card, CardContent, Button, Typography, Stack, Grid, Item} from "@mui/material";
import React, {useState, useEffect, useContext} from "react";
import {MovieContext} from "../state/movieContext";
import {useNavigate} from 'react-router-dom';
import {MovieCard} from "../movie/movie";
import {LikeButton} from "../movie/likeButton";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

export const Details = () => { 
    const {selectedMovie} = useContext(MovieContext);
        const [movie, setMovie] = useState({});
        const[genres, setGenres] = useState([]);
        const[similarMovies, setSimilarMovies] = useState([]);
        const[cast, setCast] = useState([{}]);
        const navigate = useNavigate();

        useEffect(() => {
            fetch(`https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=91353e9e0ae592ed9abfaeb0d5d467ed`)
            .then(result => result.json())
            .then((data) => {
                
                setMovie({title: data.title, id: selectedMovie, img: `https://image.tmdb.org/t/p/w154${data.poster_path}`, overview: data.overview, 
                runtime: data.runtime, date: data.release_date, vote: data.vote_average});  
                const genre = data.genres.map(item => {
                    return item.name
                })
                setGenres(genre);
            });
            
            fetch(`https://api.themoviedb.org/3/movie/${selectedMovie}/similar?api_key=91353e9e0ae592ed9abfaeb0d5d467ed&language=en-US&page=1`)
            .then(result => result.json())
                .then((data) => {
                    const newMovies = data.results.slice(0,3).map(element => {
                        return {title: element.title, id: element.id, img: `https://image.tmdb.org/t/p/w154${element.poster_path}`, vote: element.vote_average} 
                        })
                    setSimilarMovies(newMovies);
                });

                fetch(`https://api.themoviedb.org/3/movie/${selectedMovie}/credits?api_key=91353e9e0ae592ed9abfaeb0d5d467ed&language=en-US`)
                .then(result => result.json())
                .then((data) => {
                    const castInfo = data.cast.map(member => {
                       if(typeof member.profile_path != "undefined"){
                            return {name: member.name, img: `https://image.tmdb.org/t/p/w45${member.profile_path}`, character: member.character}
                        }  
                    })
                    setCast(castInfo);                    
                });
          }, []);

        return(
            !selectedMovie ? 
            <div>
            <p className="title"> Movie Details </p>
            <div className="centered">
                
                <Button variant="contained" 
                    onClick={() => {
                    navigate(`/`);
                  }}
                >      
                    Explore Movies
                </Button> 
                </div>
                </div>
                :
                <div className="movieDeets">
                <p className="title">{movie.title}<LikeButton movie={movie}/>
                </p>
                <Stack sx= {{justifyContent:'center'}} direction="row" spacing={3}>
                        {/* <Typography variant="body2">{movie.date.substring(0, movie.date.indexOf("-"))} </Typography> */}
                        <Typography variant="body2">{Math.floor(movie.runtime/60) + " hrs " + movie.runtime % 60 + " mins"}</Typography>
                </Stack>
                <Stack className= "genres" sx= {{justifyContent: "center"}} direction="row" spacing={3}>
                {genres.map(genre => 
                    <Typography variant="body2">{genre}</Typography>)
                }
                </Stack>  
                <img className="photo" src={movie.img} alt={movie.title}/>
                <p style={{fontSize:25}} className="title" >Overview</p>
                <Typography variant="body1">{movie.overview}</Typography>
                
                
                 <p style={{fontSize:25}} className="title" >Cast</p>
                <Slideshow cast={cast}/>
                <p style={{fontSize:25}} className="title" >Similar Movies</p>
               
                {/* <Stack direction="row" spacing={3}>
                {similarMovies.map(movie => {
                     return <MovieCard movie ={movie}/>}
                )}
                </Stack> */}
               <Grid container alignItems="stretch" direction="row" justifyContent="center" spacing={2} >
               {similarMovies.map(movie => {
                    return <Grid item style={{height: "100%"}} xs={4}>    
                    <MovieCard movie={movie} /></Grid>
               })}
                </Grid>
            </div>
        );
    }

  const Slideshow = ({cast}) =>{
      
      return (
        <div>
         {/* <div> class="carousel-inner" role="listbox" style="max-width:900px; max-height:600px !important;"> */}
        <Carousel interval={1000}>
            {cast.map(actor => 
            {return <Carousel.Item>
          <img sx={{height: "400px"}}
            className="d-block w-100"
            src={actor.img}
            alt={actor.name}
          />
          <Carousel.Caption>
            <h3>{actor.name}</h3>
            <p>Character: {actor.character}</p>
          </Carousel.Caption>
        </Carousel.Item>
        })}
        </Carousel>
        </div>
      )
  }


   