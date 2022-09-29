import { ReactElement } from 'react'
import globalStyle from './globalStyle'
import { Global } from '@emotion/react'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'

const client = new QueryClient()

const App = (): ReactElement => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={client}>
                <ChakraProvider>
                    <Router />
                    <Global styles={globalStyle} />
                </ChakraProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
