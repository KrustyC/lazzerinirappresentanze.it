import React from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
import { isMobile } from "react-device-detect"
import Logo from "./Logo"
import LogoMobile from "./LogoMobile"

const InitialOverlayContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.primary};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
  overflow: hidden;
`

const Slogan = styled.span`
  color: white !important;
  font-size: 50px;
  margin-top: 100px;
  text-align: center;
  line-height: 70px;
  max-width: ${({ theme }) => theme.sizes.desktop.centralColumn};

  @media (max-width: 728px) {
    font-size: 30px;
    line-height: 50px;
  }
`

const LogoContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
`

const InitialOverlay = ({ isVisible, onHide }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="child"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <InitialOverlayContainer onClick={onHide}>
            <Slogan>
              Trovarsi insieme è un inizio, restare insieme un progresso,
              lavorare insieme un successo!
            </Slogan>

            <LogoContainer>
              {isMobile ? <LogoMobile /> : <Logo />}
            </LogoContainer>
          </InitialOverlayContainer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InitialOverlay
