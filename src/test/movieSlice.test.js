import moviesSlice, { fetchMovieService } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'
import {fetchMovies} from "../hooks/useRequestMovies";

describe('MovieSlice test', () => {
    
    it('should set loading true while action is pending', () => {
        const action = {type: fetchMovies.pending};
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action).toEqual({type: fetchMovies.pending})
     })

    it('should return payload when action is fulfilled', () => {
        const action = {
            type: fetchMovies.fulfilled, 
            payload: moviesMock
        };
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action.payload).toBeTruthy()
    })

    it('should set error when action is rejected', () => {
        const action = {type: fetchMovies.rejected};
        const initialState = moviesSlice.reducer(
        { 
            movies: [], fetchStatus: '',
        }, action);
        expect(action).toEqual({type: fetchMovies.rejected})
     })

})