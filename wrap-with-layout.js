import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "./src/components/Layout"

const GlobalStyle = createGlobalStyle`
  * {
    color: ${({ theme }) => theme.colors.text} !important;
  }
`

const theme = {
  colors: {
    primary: "#EE9A21",
    text: "#5A5A5A",
  },
  sizes: {
    desktop: {
      centralColumn: "920px",
    },
  },
}

export default function wrapPageElement({ element, props }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Layout {...props}>{element}</Layout>
      </>
    </ThemeProvider>
  )
}
