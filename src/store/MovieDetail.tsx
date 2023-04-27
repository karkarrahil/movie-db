import { createSlice } from '@reduxjs/toolkit'



interface State {
    category: string,
    movies: Array<any>
}
const initialState: State = {
    category: 'popular',
    movies: []
}
 const MovieDetailSlice = createSlice({
    name: 'MOVIE_DETAIL',
    initialState,
    reducers: {
        changeCategory: (state, action) => {
            state.category = action.payload
        },
        addALlMovie: (state: any, action) => {
            state.movies = action.payload
        }
    }
})


export const { changeCategory, addALlMovie } = MovieDetailSlice.actions
export default MovieDetailSlice.reducer