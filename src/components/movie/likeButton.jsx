import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useContext } from "react";
import {MovieContext} from "../state/movieContext";
import {IconButton, Tooltip} from "@mui/material";

export const LikeButton = ({movie}) => {
  
  const {likedMovies, setLikedMovies} = useContext(MovieContext);  

  function handleLikeClick() {
   
    if(likedMovies.has(Number(movie.id))){
      likedMovies.delete(movie.id);
      console.log("inserting");
      console.log(likedMovies);
    }
    else{
      likedMovies.set(Number(movie.id), {movie});
      console.log("inserting");
      console.log(likedMovies);
    }
    let copy = new Map(likedMovies);
    setLikedMovies(copy);
  }
   
  return (
   
    <Tooltip title="Like Movie">
    <IconButton
      size="medium"
      sx={{ marginLeft: 2, "&:hover": { color: "green" } }}
      onClick={handleLikeClick}
    >
      {likedMovies.has(movie.id) ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <FavoriteBorderOutlinedIcon
          sx={{ color: "red" }}
          className="likeButton"
        />
      )}
    </IconButton>
    </Tooltip>
  );
};
