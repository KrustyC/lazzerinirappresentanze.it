import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import Logo from "./Logo"
import LinkedInLogo from "./LinkedInLogo"
import { footerLinks } from "../../utils/links"

const FooterWrapper = styled.footer`
  width: 100%;
  background: black;
  color: white;
  padding: 4rem 5rem;

  @media (max-width: 728px) {
    padding: 2.5rem;
  }
`

const InnerFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > div {
    padding: 0 2rem;
    height: 100%;
  }

  @media (max-width: 728px) {
    flex-direction: column;
    > div {
      padding: 2rem 0;
      width: 100%;
    }
  }
`

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Center = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  border-left: 1px solid white;
  border-right: 1px solid white;

  @media (max-width: 728px) {
    border-top: 1px solid white;
    border-bottom: 1px solid white;

    border-left: none;
    border-right: none;
  }
`

const StyledLink = styled(Link)`
  color: white !important;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`

const Right = styled.div`
  color: white !important;
  flex: 3;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const IconContainer = styled.a`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  background: white;
  * {
    width: 30px !important;
    height: 30px !important;
  }
`

const Layout = () => {
  return (
    <FooterWrapper>
      <InnerFooter>
        <Left>
          <Logo />
        </Left>

        <Center>
          {footerLinks.map(({ text, link }) => (
            <StyledLink key={text} to={link}>
              {text}
            </StyledLink>
          ))}
        </Center>

        <Right>
          LAZZERINI RAPPRESENTANZE S.r.L.
          <br />
          Via del Prucino, 2/L - 52037
          <br />
          Sansepolcro (AR) - Italy
          <br />
          <br />
          Tel/Fax. 0575 742154
          <br />
          P.Iva 0225813051
          <br />
          <br />
          <IconContainer
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInLogo />
          </IconContainer>
        </Right>
        {/* <Link to="/privacy-policy">Privacy Policy</Link> */}
      </InnerFooter>
    </FooterWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
