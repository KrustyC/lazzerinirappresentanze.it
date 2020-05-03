import React from "react"
import styled from "styled-components"
import Portal from "../Portal"
import Logo from "./Logo"

const OverlayContainer = styled.div`
  position: absolute;
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
  z-index: q00;
`

const Slogan = styled.h1`
  color: white;
  font-size: 81px;
  max-width: ${({ theme }) => theme.sizes.desktop.centralColumn};
`

const LogoContainer = styled.div`
  width: 300px;
  margin-top: 5rem;
`

const InitialOverlay = ({ onHide }) => {
  return (
    <Portal id="portal">
      <OverlayContainer onClick={onHide}>
        <Slogan>
          Trovarsi insieme e' un inizio, restare insieme un progresso, lavorare
          insieme un successo!
        </Slogan>

        <LogoContainer>
          <Logo />
        </LogoContainer>
      </OverlayContainer>
    </Portal>
  )
}

export default InitialOverlay
