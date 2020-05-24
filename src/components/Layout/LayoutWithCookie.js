import React from "react"
import styled from "styled-components"
import useCookie from "../../hooks/useCookie"
import CookieBanner from "../CookieBanner"
import Header from "../Header"
import Footer from "../Footer"

const MainWrapper = styled.main`
  min-height: 67vh;
`

const COOKIE_BANNER = "gatsby-gdpr-google-analytics"

export const LayoutWithCookie = ({ children, siteTitle, path }) => {
  const [showCookieBanner, onAllowCookie, onForbidCookie] = useCookie(
    COOKIE_BANNER,
    path
  )

  return (
    <>
      <Header siteTitle={siteTitle} />

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
