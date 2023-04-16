// endpoint per la fetch della sidebar
const endpointSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

export const GET_SEARCH = "GET_SEARCH";
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const IS_PLAYING = "IS_PLAYING";

// action creators
export const addToFavouritesAction = (id) => {
  return { type: ADD_TO_FAVOURITES, payload: id } 
}

export const removeFromFavouritesAction = (id) => {
  return { type: REMOVE_FROM_FAVOURITES, payload: id }
}

export const isPlayingAction = (track) => {
  return { type: IS_PLAYING, payload: track}
}

export const getSearchAction = (query) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(endpointSearch + query);

      if (response.ok) {
        let { data } = await response.json();
        dispatch({type: GET_SEARCH, payload: data});
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  }
}