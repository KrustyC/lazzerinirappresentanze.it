import React from "react"
import styled from "styled-components"
import CenteredColumn from "../CenteredColumn"

const Container = styled(CenteredColumn)`
  display: flex;
  justify-content: space-between;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
`

export const OfficeInfo = () => (
  <Container>
    <Info>
      <h1>Ufficio</h1>
      <span>info@lazzerinirappresentanze.it</span>
      <span>Tel. 0575 742154</span>
      <span>Fax. 0575 742154</span>
    </Info>

    <Info>
      <h1>Orario</h1>
      <b>Lunedì - Venerdì</b>

      <span>9:00-13:00 14:00-18:00</span>
      <span>Via del Prucino 2/L - 52037</span>
      <span>Sansepolcro (AR) - Italy</span>
    </Info>
  </Container>
)
