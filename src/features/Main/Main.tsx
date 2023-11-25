import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from 'src/shared/components/Navbar'

import { MainContainer } from './styledComponents'

const Main: FC = () => {
  return (
    <MainContainer>
      <Navbar />
      <Outlet />
    </MainContainer>
  )
}

export default Main
