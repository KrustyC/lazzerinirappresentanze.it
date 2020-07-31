import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import Portal from "../Portal"

const CookieContainer = styled.div`
  ${({ theme }) => css`
    position: fixed;
    width: 100vw;
    height: 300px;
    background: ${theme.colors.primary};
    color: ${theme.colors.text};
    z-index: 1;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;

    @media (max-width: 728px) {
      height: auto;
    }
  `}
`

const InnerContainer = styled.div`
  display: flex;
  margin: 30px auto;
  margin-top: 40px;
  max-width: 1240px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 728px) {
    flex-direction: column;
    margin: 30px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 700px;

  h1,
  p,
  a {
    color: white !important;
  }

  a {
    text-decoration: none !important;
  }
`

const Title = styled.h1`
  font-size: 36px;

  @media (max-width: 728px) {
    font-size: 23px;
  }
`

const Text = styled.p`
  font-weight: bold;

  @media (max-width: 728px) {
    font-size: 14px;
  }
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 728px) {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: space-between;
  }
`

const Button = styled.button`
  ${({ theme }) => css`
    width: 270px;
    height: 80px;
    font-size: 26px;
    font-weight: 900;
    background: ${({ primary }) => (primary ? "black" : "white")};
    color: ${({ primary }) =>
      primary ? "white" : theme.colors.primary} !important;
    border: none;

    &:first-of-type {
      margin-bottom: 40px;
    }

    @media (max-width: 728px) {
      width: 100%;
      height: 50px;
      font-size: 20px;

      &:first-of-type {
        margin-bottom: 0;
        margin-right: 20px;
      }
    }
  `}
`

const CookieBanner = ({ onAllowCookie, onForbidCookie }) => (
  <Portal id="cookie-banner-portal">
    <CookieContainer>
      <InnerContainer>
        <Info>
          <Title>La tua privacy è importante</Title>
          <Text>
            Il nostro sito utilizza cookie di prime parti e cookie analytics per
            ottimizzare il sito. Cliccando "OK" o proseguendo la navigazione,
            accetti l'uso dei cookie.{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </Text>
        </Info>
        <Buttons>
          <Button onClick={onForbidCookie}>Rifiuta</Button>
          <Button primary onClick={onAllowCookie}>
            Accetta
          </Button>
        </Buttons>
      </InnerContainer>
    </CookieContainer>
  </Portal>
)

export default CookieBanner
