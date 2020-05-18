import React from "react"
import styled from "styled-components"
import { motion, AnimatePresence } from "framer-motion"
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
  color: white !important;
  font-size: 64px;
  margin-top: 100px;
  text-align: center;
  max-width: ${({ theme }) => theme.sizes.desktop.centralColumn};
`

const LogoContainer = styled.div`
  width: 300px;
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
              <Logo />
            </LogoContainer>
          </InitialOverlayContainer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InitialOverlay
