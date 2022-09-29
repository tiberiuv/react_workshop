import App from './app'
import {render} from '@testing-library/react'

describe('App', () => {
    it('renders', () => {
        const {getByText} = render(<App />)

        expect(getByText('React App')).toBeDefined()
    })
})
