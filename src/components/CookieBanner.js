import React from "react"
import styled from "styled-components"
import Portal from "./Portal"

const CookieContainer = styled.div`
  position: absolute;
  width: 80vw;
  height: 200px;
  background: red;
  z-index: 1;

  bottom: 20px;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
`

const CookieBanner = ({ onAllowCookie, onForbidCookie }) => (
  <Portal id="portal">
    <CookieContainer>
      Questo e' un Bannerr!!!
      <button onClick={onAllowCookie}>Consento</button>
      <button onClick={onForbidCookie}>Non Consento</button>
    </CookieContainer>
  </Portal>
)

export default CookieBanner
