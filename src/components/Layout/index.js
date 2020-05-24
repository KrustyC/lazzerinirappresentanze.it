import React from "react"
import PropTypes from "prop-types"
import { useCycle } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import InitialOverlay from "../InitialOverlay"
import { LayoutWithCookie } from "./LayoutWithCookie"

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

  const [isVisible, onCycle] = useCycle(true, false)

  return (
    <>
      <InitialOverlay isVisible={isVisible} onHide={onCycle} />
      {!isVisible && (
        <LayoutWithCookie path={path} siteTitle={data.site.siteMetadata.title}>
          {children}
        </LayoutWithCookie>
      )}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
