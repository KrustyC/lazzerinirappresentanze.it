import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import useCookie from "../hooks/useCookie"
import CookieBanner from "./CookieBanner"
import Header from "./Header"
import Footer from "./Footer"
import InitialOverlay from "./InitialOverlay"

const MainWrapper = styled.main`
  min-height: 67vh;
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

  const [showOverlay, setShowOverlay] = React.useState(true)

  if (false) {
    return <InitialOverlay onHide={() => setShowOverlay(false)} />
  }

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />

      <MainWrapper>{children}</MainWrapper>

      <Footer />

      {showCookieBanner && (
        <CookieBanner
          onAllowCookie={onAllowCookie}
          onForbidCookie={onForbidCookie}
        />
      )}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
