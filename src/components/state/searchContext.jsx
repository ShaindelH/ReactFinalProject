import React, { useReducer } from 'react';
import {searchReducer} from "./reducer";

export const SearchContext = React.createContext();

export const SearchProvider = (props) => {
    const[searchState, searchDispacth] = useReducer(searchReducer, {
        movieSearch : "Trending"
    })
    //const [movieSearch, setMovieSearch] = useState("Trending");

  return (
      <SearchContext.Provider
        value= {{
          movieSearch: searchState.movieSearch,
          dispatch: searchDispacth,
        }}
      >
     {props.children}
      </SearchContext.Provider>
  );
};

 