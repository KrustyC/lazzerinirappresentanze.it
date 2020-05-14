import React from "react"
import styled, { css } from "styled-components"
import SEO from "../../components/seo"
import { TopParallax } from "./TopParallax"
import { MidParallax } from "./MidParallax"
import { BottomParallax } from "./BottomParallax"
import services from "./services"

const Wrapper = styled.div`
  height: 880px;
`

const ParallaxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  perspective: 8px;
  perspective-origin: 0%;
  display: flex;
  flex-direction: column;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateZ(0px);
`

const Foreground = styled.div`
  width: 100%;
  margin-bottom: 50px;
  transform-origin: 0;
  transform: translateZ(3px) scale(0.625);
  display: flex;
  flex-direction: column;

  /* background: green; */
`

const FirstBox = styled.div`
  width: 70vw;
  height: 200px;
  margin-top: 0;
  background: rgba(0, 0, 0, 0.5);
  * {
    color: white !important;
  }
  color: white !important;

  z-index: 100;
  align-self: flex-start;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const ServiceBox = styled.div`
  ${({ theme, left }) => css`
    width: 70vw;
    height: 200px;
    background: ${theme.colors.primary};
    z-index: 100;
    align-self: ${left ? "flex-start" : "flex-end"};
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: ${left ? "flex-end" : "flex-start"};
    box-shadow: ${`${left ? "" : "-"}6px`} 7px 6px -2px rgba(217, 217, 217, 1);

    margin-top: 150px;

    * {
      color: white !important;
    }

    > div {
      display: flex;
      height: 80px;

      width: 700px;
    }
  `}
`

const Number = styled.h1`
  margin: 0;
  margin-right: 30px;
  font-size: 90px;
  font-weight: bold;
`
const Text = styled.span`
  font-weight: bold;
  font-size: 24px;
`

const Servizi = () => {
  return (
    <>
      <SEO title="Servizi" />
      <Wrapper>
        <ParallaxContainer>
          <Background>
            <TopParallax />
            <MidParallax />
            <BottomParallax />
          </Background>

          <Foreground>
            <FirstBox>
              <h1>“I nostri servizi diventano veri punti di forza”</h1>
              La nostra società oltre alla principale attività di rappresentanza
              offre i seguenti servizi necessari per garantire all’aziende la
              giusta distribuzione nel territorio
            </FirstBox>
            {services.map(({ id, text }, i) => (
              <ServiceBox key={id} left={i % 2 !== 0}>
                <div>
                  <Number>0{id}</Number>
                  <Text>{text()}</Text>
                </div>
              </ServiceBox>
            ))}
          </Foreground>
        </ParallaxContainer>
      </Wrapper>
    </>
  )
}

export default Servizi
