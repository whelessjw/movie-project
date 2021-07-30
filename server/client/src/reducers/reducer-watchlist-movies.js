import { FETCH_WATCHLIST_MOVIES, ADD_MOVIE } from "../actions/types";
import { normalize, schema } from "normalizr";
import _ from "lodash";

const DEFAULT_STATE = {
  entries: {},
  order: [],
};

const moviesSchema = new schema.Entity("movies", undefined);

export default function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_WATCHLIST_MOVIES:
      const normalizedMovies = normalize(action.payload.movies, [moviesSchema]);

      return {
        // uniq ensures that if a movie was added with FETCH_MOVIE it
        // won't show up twice in the list
        order: _.uniq([...state.order, ...normalizedMovies.result]),
        entries: { ...normalizedMovies.entities.movies, ...state.entries },
      };
    case ADD_MOVIE:
      return {
        order: _.union([...state.order], [action.payload.movie.id]),
        entries: { ...state.entries, [action.payload.id]: action.payload },
      };
    default:
      return state;
  }
}
