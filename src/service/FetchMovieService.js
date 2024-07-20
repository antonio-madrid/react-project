import {createAsyncThunk} from "@reduxjs/toolkit";

/** Real call to API */
export const fetchMovies = createAsyncThunk(
    'fetch-movies', async (apiUrl) => {
        const response = await fetch(apiUrl)
        return response.json()
})