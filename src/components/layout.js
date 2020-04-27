import React from "react"
import PropTypes from "prop-types"
import styled, { createGlobalStyle } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import useCookie from "../hooks/useCookie"
import CookieBanner from "./CookieBanner"
import Header from "./header"
import Footer from "./footer"

const GlobalStyle = createGlobalStyle`
  body {
    /* color: ${props => (props.theme === "purple" ? "purple" : "white")}; */
  }
`

const MainWrapper = styled.div`
  min-height: 67vh;
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`

const COOKIE_BANNER = "gatsby-gdpr-google-analytics"

const Layout = ({ children, path }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [showCookieBanner, onAllowCookie, onForbidCookie] = useCookie(
    COOKIE_BANNER,
    path
  )

  console.log("showCookieBanner", showCookieBanner)

  return (
    <>
      <GlobalStyle theme="purple" />
      <>
        <Header siteTitle={data.site.siteMetadata.title} />

        <MainWrapper>
          <main>{children}</main>
        </MainWrapper>

        <Footer />

        {showCookieBanner && (
          <CookieBanner
            onAllowCookie={onAllowCookie}
            onForbidCookie={onForbidCookie}
          />
        )}
      </>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
