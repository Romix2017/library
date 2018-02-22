
import { List } from 'immutable';
import { Genre } from "../../models/genre";

export const LOAD_GENRES = "LOAD_GENRES";
export const ADD_GENRE = "ADD_GENRE";
export const DELETE_GENRE = "DELETE_GENRE";
export const UPDATE_GENRE = "UPDATE_GENRE";
export const BACKEND_ACTION_STARTED = "BACKEND_ACTION_STARTED";
export const BACKEND_ACTION_FINISHED = "BACKEND_ACTION_FINISHED";


export function loadGenres(genres: List<Genre>) {
  return {
    type: LOAD_GENRES,
    genres: genres
  }
}

export function addGenre(newGenre: Genre) {
  return {
    type: ADD_GENRE,
    newGenre
  }
}

export function updateGenre(genre: Genre) {

  return {
    type: UPDATE_GENRE,
    genre
  }
}

export function deleteGenre(genre: Genre) {
  return {
    type: DELETE_GENRE,
    genre
  }
}

export function startBackendAction(message: string) {
  return {
    type: BACKEND_ACTION_STARTED,
    message
  }
}

export function endBackendAction(message: string = '') {
  return {
    type: BACKEND_ACTION_FINISHED,
    message
  }
}
