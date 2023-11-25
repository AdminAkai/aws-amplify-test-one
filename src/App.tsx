import { FC } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { ThemeProvider } from 'styled-components'

// import { selectMode } from 'src/shared/redux/settingsSlice/selectors'
// import { useAppSelector } from 'src/shared/redux/store'

// import Main from 'src/features/Main'
// import Landing from 'src/features/Landing'

// import theme from './shared/lib/theme'

import './assets/fonts/stylesheet.css'
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card,
} from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import config from './aws-exports'

// import GlobalStyle from './shared/lib/globalStyles'
import './App.css'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(config)

const App: FC<{ signOut: any }> = ({ signOut }) => {
  // const mode = useAppSelector(selectMode)

  return (
    <View className='App'>
      <Card>
        <Heading level={1}>We now have Auth!</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  )

  // return (
  //   <ThemeProvider theme={theme[mode]}>
  //     <BrowserRouter>
  //       <GlobalStyle />
  //       <Routes>
  //         <Route path='/' element={<Main />}>
  //           <Route index element={<Landing />} />
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </ThemeProvider>
  // )
}

export default withAuthenticator(App)
