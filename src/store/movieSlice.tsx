import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import React, { memo, useEffect } from 'react'





const APIKey = import.meta.env.VITE_REACT_APP_API_KEY
export const FetchData = createAsyncThunk('MovieThunk', async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`);
    return response.json();
})
export const FetchMovie = createAsyncThunk('MovieThunk', async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=1`);
    return response.json();
})


const MovieSlice = createSlice({
    name: 'movie',
    initialState: {
        movies: null,
        AllCategory: null,
        isLoading: false,
        error: false
    },

    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(FetchData.pending, (state, action) => {
            state.isLoading = true;
            // console.log(state.isLoading)
        })
        builder.addCase(FetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movies = action.payload.results;
            // console.log(state.isLoading)
        })
        builder.addCase(FetchData.rejected, (state, action) => {
            state.error = true;
            // console.log(action.payload)
        })
    }
})


export default MovieSlice.reducer;