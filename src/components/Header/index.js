import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import { navbarLinks } from "../../utils/links"
import Logo from "./Logo"

const HeaderWrapper = styled.div`
  background: white;
  height: 150px;
  /* background: red; */
  margin-bottom: 1.45rem;
`

const InnerHeader = styled.div`
  margin: 0 auto;
  padding: 1rem 7rem;

  display: flex;
  /* align-items: space-between; */
  justify-content: space-between;
`

const LogoContainer = styled.div``

const Links = styled.div`
  display: flex;
  padding-top: 50px;
`

const StyledLink = styled(Link)`
  margin-right: 20px;
  color: black !important;
  text-decoration: none;
  font-weight: bold;
`

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <InnerHeader>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Links>
        {navbarLinks.map(({ text, link }) => (
          <StyledLink key={text} to={link}>
            {text}
          </StyledLink>
        ))}
      </Links>
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
