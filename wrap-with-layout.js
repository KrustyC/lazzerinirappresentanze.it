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
