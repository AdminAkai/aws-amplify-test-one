interface IColors {
  blue: '#002366'
  black: '#122333'
  gray: '#c5d5e5'
  white: '#FFFFF0'
  red: '#DC143C'
}

interface IThemeColors {
  background: {
    primary: string
    secondary: string
  }
  nav: {
    primary: string
    secondary: string
  }
  logo: string
  text: {
    primary: string
    secondary: string
  }
  button: {
    primary: string
  }
}

interface ITheme {
  [key: string]: IThemeColors
}

export const colors: IColors = {
  blue: '#002366',
  black: '#122333',
  gray: '#c5d5e5',
  white: '#FFFFF0',
  red: '#DC143C',
}

const lightTheme: IThemeColors = {
  background: {
    primary: colors.white,
    secondary: colors.gray,
  },
  nav: {
    primary: colors.black,
    secondary: colors.white,
  },
  logo: colors.blue,
  text: {
    primary: colors.black,
    secondary: colors.white,
  },
  button: {
    primary: colors.red,
  },
}

const darkTheme: IThemeColors = {
  background: {
    primary: colors.gray,
    secondary: colors.white,
  },
  nav: {
    primary: colors.white,
    secondary: colors.gray,
  },
  logo: colors.blue,
  text: {
    primary: colors.white,
    secondary: colors.white,
  },
  button: {
    primary: colors.red,
  },
}

const theme: ITheme = {
  lightTheme,
  darkTheme,
}

export default theme
