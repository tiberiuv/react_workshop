import {css, SerializedStyles} from '@emotion/react'

const style: SerializedStyles = css`
    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        overflow: auto;
        width: 100%;
        height: 100%;
    }

    #root {
        display: flex;
        min-height: 100vh;
    }

    body {
        margin: 0;
        padding: 0;
        line-height: 21px;
        min-height: 100%;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;

        button {
            font-family: 'Open Sans', Arial, Helvetica, sans-serif;
        }
    }

    ul, ul li, ul ul li {
        margin: 0;
        padding: 0;
        text-indent: 0;
        list-style-type: none;
    }

    a {
        text-decoration: underline;

        &:hover
            text-decoration: underline;
    }

    h1, h2, h3, h4, h5 {
        margin: 0;
    }

    h1 {
        font-size: 28px;
        line-height: 30px;
    }

    h2 {
        font-size: 24px;
        line-height: 26px;
    }

    h3 {
        font-size: 18px;
        line-height: 26px;
    }

    h4 {
        font-size: 16px;
        line-height: 24px;
    }

    h5 {
        font-size: 14px;
        line-height: 21px;
    }

    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`
export default style
