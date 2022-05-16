import React, { useContext } from "react";
import {MovieContext} from "../state/movieContext";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Rating
} from "@mui/material";
import { useNavigate} from "react-router-dom";
import {LikeButton} from "./likeButton";
import "../app/App.css";


export const MovieCard = ({movie}) => {
  const navigate = useNavigate();
  
  const {displayMovies, setRatedMovies, ratedMovies, setSelectedMovie, selectedMovie} = useContext(MovieContext);
  
  const rating = ratedMovies.has(movie.id) ? ratedMovies.get(movie.id): 0;
   return (
    <Card className="movieCard" sx={{width:250, borderRadius: 3}}>
      <div style={{height: '100%'}}>
        <CardActionArea
          onClick={() => {
            setSelectedMovie(movie.id);
            navigate(`/details/${movie.id}`);
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={movie.img}
            alt={movie.title}
          />
          <CardContent sx={{height: '100%'}}>
            <Typography
              className="movieName"
              gutterBottom
              variant="h5"
              component="div"
              
            >
              {movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Stack direction="row" spacing={2}>
        
        <p>{movie.vote}</p>
        <Rating 
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          ratedMovies.set(movie.id, newValue);
          setRatedMovies(new Map(ratedMovies));
        }}
      />
      <LikeButton movie={movie}/>
      
        </Stack>
      </div>
    </Card>
  );
};
