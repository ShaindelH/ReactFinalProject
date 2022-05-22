import React, {useContext} from 'react';
import {MovieContext} from "../state/movieContext";
import {MovieCard} from "../movie/movie";
import {Grid} from "@mui/material";
import "../explore/explore.css";

export const WatchList = () =>{

    const {likedMovies} = useContext(MovieContext);
    return (
        <div>
            <p className="title">My Watch List</p>
            <Grid container alignItems="stretch" direction="row" justifyContent="center" spacing={2} >
               {[...likedMovies.keys()].map(key => {
                    return <Grid item style={{height: "100%"}}>    
                    <MovieCard movie={likedMovies.get(key).movie} /></Grid>
               })}
                </Grid>
        </div>

    );
}
