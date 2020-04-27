import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

const FooterWrapper = styled.footer`
  background: black;
  color: white;
  min-height: 200px;
`

const InnerFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterWrapper>
      <InnerFooter>
        © {currentYear} Lazzerini Rappresentanze
        <br />
        <div>
          Designed and built by{" "}
          <a href="https://beatricecox.com">Beatrice Cox</a> and{" "}
          <a href="https://dcrestini.me">Davide Crestini</a>
        </div>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </InnerFooter>
    </FooterWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
