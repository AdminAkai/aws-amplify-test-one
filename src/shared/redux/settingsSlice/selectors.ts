import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../store'

const selectSettingsSliceReducer = (state: RootState) => state.settings

export const selectMode = createSelector(
  [selectSettingsSliceReducer],
  (state) => state.mode
)
