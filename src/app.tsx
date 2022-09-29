import { ReactElement } from 'react'
import globalStyle from './globalStyle'
import { Global } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalChatBox } from 'globalChat'

const App = (): ReactElement => {
    return (
        <ChakraProvider>
            <Global styles={globalStyle} />
            <GlobalChatBox />
        </ChakraProvider>
    )
}

export default App
