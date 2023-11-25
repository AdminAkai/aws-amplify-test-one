import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { MainContainer } from './styledComponents'

const Main: FC = () => {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  )
}

export default Main
