import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
// import 'dotenv/config'

const isDev = global.NODE_ENV === 'development'
console.log(isDev, global)

const Outer = () =>
    isDev ? (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    ) : (
        <App />
    )

ReactDOM.render(<Outer />, document.getElementById('root'))
