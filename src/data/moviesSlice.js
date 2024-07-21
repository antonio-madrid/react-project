import { createSlice } from "@reduxjs/toolkit"
import {fetchMovies} from "../hooks/useRequestMovies";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: { 
        movies: [],
        page: 1,
        hasNextPage: false,
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchMovies.fulfilled, (state, action) => {
                if (!action.payload.results || action.payload.results.length === 0) {
                    state.movies = [];
                    state.page = 1;
                    state.hasNextPage = false;
                } else {
                    const movies = action.payload.results;
                    const currentPage = action.payload.page
                    const { total_pages } = action.payload;

                    if (!movies || movies.length === 0) {
                        state.movies = [];
                    } else if (movies && movies.length > 0) {
                        currentPage !== 1 ?
                            (state.movies = state.movies.concat(movies))
                            : (state.movies = movies)

                        state.hasNextPage = currentPage < total_pages;
                        // Setting current page number
                        state.page = currentPage;
                    }

                }
                state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
