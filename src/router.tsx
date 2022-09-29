import { ReactElement } from 'react'
import { useRoutes } from 'react-router-dom'

import { GlobalChatBox } from './globalChat'

const mainRoutes = [{ path: '/', element: <GlobalChatBox /> }]

const MainRouter = (): ReactElement | null => useRoutes(mainRoutes)

export default MainRouter
