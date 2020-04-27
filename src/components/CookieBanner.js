import React from "react"
import styled from "styled-components"
import Portal from "./Portal"

const CookieContainer = styled.div`
  position: absolute;
  width: 80vw;
  height: 200px;
  background: mediumaquamarine;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  bottom: 20px;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
`

const Button = styled.button`
  padding: 10px 15px;
  background: ${({ primary }) => (primary ? "mediumaquamarine" : "gray")};
`

const CookieBanner = ({ onAllowCookie, onForbidCookie }) => (
  <Portal id="portal">
    <CookieContainer>
      <p>
        Il nostro sito utilizza cookie di prime parti e cookie analytics per
        ottimizzare il sito. Cliccando "OK" o proseguendo la navigazione,
        accetti l'uso dei cookie. Per maggiori informazioni e disattivazione
        consulta l'informativa cookie completa.
      </p>
      <div>
        <Button primary onClick={onAllowCookie}>
          Accetta
        </Button>
        <Button onClick={onForbidCookie}>Rifiuta</Button>
      </div>
    </CookieContainer>
  </Portal>
)

export default CookieBanner
