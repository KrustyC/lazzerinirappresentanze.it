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
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
  overflow: hidden;
`

const Slogan = styled.span`
  position: absolute;
  color: white !important;
  font-size: 50px;
  text-align: center;
  line-height: 70px;
  max-width: ${({ theme }) => theme.sizes.desktop.centralColumn};

  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  @media (max-width: 728px) {
    font-size: 30px;
    line-height: 50px;
  }
`

const LogoContainer = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  display: flex;
  align-self: flex-start;
  justify-content: center;
  padding: 40px 0;

  top: 0;
  right: 0;

  @media only screen and (min-width: 600px) {
    justify-content: flex-end;
    padding: 40px;
    bottom: 0;
    top: initial;
  }
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
              {/* {isMobile ? <LogoMobile /> : <Logo />} */}

              <Logo />
            </LogoContainer>
          </InitialOverlayContainer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InitialOverlay
