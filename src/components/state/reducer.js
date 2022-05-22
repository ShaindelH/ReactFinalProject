
export const Actions = Object.freeze({
    UPDATE_SEARCH_TEXT: 'UPDATE_SEARCH_TEXT',
  });
  
  export function searchReducer(state, action) {
    if (action.type ===  Actions.UPDATE_SEARCH_TEXT) {
        return updateSearch(state, action);
    }

    else{
        throw new Error(`Search Reducer does not recognize ${action.type}`);
      }
  }
  
  function updateSearch(state, action) {
    return { ...state, movieSearch: action.search};
  }