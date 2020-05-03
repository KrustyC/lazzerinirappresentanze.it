import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "./src/components/Layout"

const GlobalStyle = createGlobalStyle`
  body {
    /* color: ${props => (props.theme === "purple" ? "purple" : "white")}; */
  }
`

const theme = {
  colors: {
    primary: "#F7F00B",
  },
  sizes: {
    desktop: {
      centralColumn: '920px'
    }
  }
}

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <GlobalStyle />
      <Layout {...props}>{element}</Layout>
    </>
  )
}

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </>
  )
}
