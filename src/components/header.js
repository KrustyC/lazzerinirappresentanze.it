import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import React from "react"

const HeaderWrapper = styled.div`
  background: mediumaquamarine;
  margin-bottom: 1.45rem;
`

const InnerHeader = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const StyledLink = styled(Link)`
  margin-right: 20px;
  color: black !important;
  text-decoration: none;
`

const links = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Chi Siamo",
    link: "/about",
  },
  {
    text: "I Nostri Servizi",
    link: "/i-nostri-servizi",
  },
  {
    text: "Contatti",
    link: "/contatti",
  },
]

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <InnerHeader>
      {links.map(({ text, link }) => (
        <StyledLink key={text} to={link}>{text}</StyledLink>
      ))}
    </InnerHeader>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
