import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import { navbarLinks } from "../../utils/links"
import Logo from "./Logo"

const HeaderWrapper = styled.div`
  height: 210px;
  margin-bottom: 1.45rem;
`

const InnerHeader = styled.div`
  margin: 0 auto;
  width: 80vw;

  display: flex;
  /* align-items: space-between; */
  justify-content: space-between;
`

const LogoContainer = styled(Link)`
  text-decoration: none !important;
`

const Links = styled.div`
  display: flex;
  padding-top: 100px;
`

const linkHighlight = css`
  ${({ theme }) => css`
    content: "";
    position: absolute;
    background: ${theme.colors.primary};
    height: 180px;
    width: 55px;
    border-radius: 25px;
    z-index: -1;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  `}
`

const StyledLink = styled(Link)`
  ${({ active }) => css`
    margin-right: 20px;
    color: black !important;
    text-decoration: none;
    font-weight: bold;
    position: relative;
    z-index: 101;

    ::before {
      ${linkHighlight};
      top: -230px;
    }

    &.active {
      ::before {
        ${linkHighlight};
        top: -130px;
      }
    }

    :hover::before,
    :hover::before {
      ${linkHighlight};
      top: -130px;
    }
  `}
`

const Header = ({ siteTitle }) => (
  <HeaderWrapper>
    <InnerHeader>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Links>
        {navbarLinks.map(({ text, link }) => (
          <StyledLink activeClassName="active" key={text} to={link}>
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
