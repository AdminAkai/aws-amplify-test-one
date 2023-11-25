export enum Mode {
  DARK = 'darkTheme',
  LIGHT = 'lightTheme',
}

interface ISettingsInitialState {
  mode: string
}

const initialState: ISettingsInitialState = {
  mode: Mode.LIGHT,
}

export default initialState
