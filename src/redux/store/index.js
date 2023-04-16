import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducers/searchReducer";
import favouritesReducer from "../reducers/favouritesReducer";
import playerReducer from "../reducers/playerReducer";

const rootReducer = combineReducers({
  search: searchReducer,
  favourites: favouritesReducer,
  player: playerReducer,
})

const store = configureStore({
  reducer: rootReducer
})

export default store;