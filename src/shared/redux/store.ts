import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import settingsSlice from './settingsSlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers({
  settings: settingsSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const persistor = persistStore(store)

export default store
