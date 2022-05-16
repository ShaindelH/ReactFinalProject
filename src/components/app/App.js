import {Explore} from '../explore/explore';
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import {Header} from "../header/header";
import {Details} from "../details/details";
import {WatchList} from "../watchlist/watchlist";
import {MovieProvider} from "../state/movieContext";

export const App = () => { 

  return (
    <div>
      <MovieProvider>
      <HashRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path= "/mymovies" element={<WatchList/>} />
        </Routes>
      </HashRouter>
      </MovieProvider>
    </div>
  );
}

