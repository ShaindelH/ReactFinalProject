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
  
  const {setSelectedMovie} = useContext(MovieContext);
  
  
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
          <CardContent className="movieName" sx={{height: '100px', overflow: "elipsis"}}>
            <Typography 
              variant="h5"
              component="div" 
            >
              {movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Stack direction="row" spacing={2}>
        <LikeButton movie={movie}/>
        <Rating 
        name="simple-controlled"
        value={movie.rating}
        precision={0.5} 
        readOnly
        />
        </Stack>
      </div>
    </Card>
  );
};
