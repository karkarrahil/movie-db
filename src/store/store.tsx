import { combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit'
import movieReducer from './movieSlice'
import MovieDetailReducer from './MovieDetail'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from "redux-persist";
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import { Action } from '@remix-run/router';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}
const rootReducer = combineReducers({
    MovieDetail: MovieDetailReducer,
    movieShow: movieReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
type MyType = { value: string };
interface MyInterface extends MyType {
    id: number;
}
export const persistor = persistStore(store)
interface MyAction {
    type: string;
    payload?: any;
  }
  
export type RootState = ReturnType<typeof store.getState>
export type ApiDespatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    MyAction
>;
export default store;