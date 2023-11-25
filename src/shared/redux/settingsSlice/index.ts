import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import initialState, { Mode } from './initialState'

// Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setMode: (state, { payload }: PayloadAction<Mode>) => {
      state.mode = payload
    },
  },
})

export const { setMode } = settingsSlice.actions

export default settingsSlice.reducer
