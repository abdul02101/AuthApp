import { configureStore } from '@reduxjs/toolkit'
import userRegistratSlice from './slice/usersSlice'

export const store = configureStore({
    reducer: {
        user: userRegistratSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch