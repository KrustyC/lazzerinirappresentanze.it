import React from "react"
import styled from "styled-components"
import Portal from "../Portal"
import Logo from "./Logo"

const InitialOverlayContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
  overflow: hidden;
`

const Slogan = styled.h1`
  color: white;
  font-size: 72px;
  margin-top: 100px;
  max-width: ${({ theme }) => theme.sizes.desktop.centralColumn};
`

const LogoContainer = styled.div`
  width: 300px;
  margin-top: 5rem;
`

const InitialOverlay = ({ onHide }) => {
  return (
    <Portal id="initial-overlay-portal">
      <InitialOverlayContainer onClick={onHide}>
        <Slogan>
          Trovarsi insieme  è un inizio, restare insieme un progresso, lavorare
          insieme un successo!
        </Slogan>

        <LogoContainer>
          <Logo />
        </LogoContainer>
      </InitialOverlayContainer>
    </Portal>
  )
}

export default InitialOverlay
