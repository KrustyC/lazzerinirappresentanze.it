import React from "react"
import styled, { css } from "styled-components"
import SEO from "../../components/seo"
import { TopParallax } from "./_TopParallax"
import { MidParallax } from "./_MidParallax"
import { BottomParallax } from "./_BottomParallax"
import { ParallaxItem } from "./_ParallaxItem"
import services from "./_services"

const Wrapper = styled.div`
  min-height: 2150px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 728px) {
    min-height: 2850px;
  }
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Foreground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 50px;
  transform-origin: 0;
  display: flex;
  flex-direction: column;
`

const FirstBox = styled.div`
  width: 70vw;
  height: 200px;
  margin-top: 100px;
  margin-bottom: 80px;
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

  @media (max-width: 728px) {
    height: 400px;
    width: 100vw;
  }
`

const ServiceBox = styled.div`
  ${({ theme, left }) => css`
    width: 70vw;
    height: 160px;
    background: ${theme.colors.primary};
    z-index: 100;
    /* padding: 0 20px; */
    display: flex;
    align-items: center;
    justify-content: ${left ? "flex-end" : "flex-start"};
    box-shadow: ${`${left ? "" : "-"}6px`} 7px 6px -2px rgba(0, 0, 0, 0.5);

    margin-top: 70px;

    * {
      color: white !important;
    }

    > div {
      display: flex;
      align-items: center;
      height: 100%;

      width: 56%;
      width: 40vw;

      padding: 30px 20px;
    }

    @media (max-width: 728px) {
      height: 200px;
      width: 100vw;

      > div {
        display: flex;
        align-items: flex-start;
        flex-direction: row;
        height: 100%;
        width: 100vw;
        padding: 30px 20px;
      }
    }
  `}
`

const Number = styled.h1`
  margin: 0;
  margin-right: 30px;
  font-size: 90px;
  font-weight: bold;
  height: 100%;

  @media (max-width: 728px) {
    font-size: 50px;
    margin-right: 0;
    margin-bottom: 0;
  }
`
const Text = styled.span`
  margin: 0;
  margin-top: -3px;
  font-weight: bold;
  font-size: 20px;

  @media (max-width: 728px) {
    height: auto;
    font-size: 16px;
    margin-left: 25px;
  }
`

const Servizi = () => {
  return (
    <>
      <SEO title="Servizi" />
      <Wrapper>
        <Background>
          <TopParallax />
          <MidParallax />
          <BottomParallax />
        </Background>

        <Foreground>
          <ParallaxItem left>
            <FirstBox>
              <h1>“I nostri servizi diventano veri punti di forza”</h1>
              La nostra società oltre alla principale attività di rappresentanza
              offre i seguenti servizi necessari per garantire all’aziende la
              giusta distribuzione nel territorio
            </FirstBox>
          </ParallaxItem>
          {services.map(({ id, text }, i) => (
            <ParallaxItem key={id} left={i % 2 !== 0}>
              <ServiceBox left={i % 2 !== 0}>
                <div>
                  <Number>0{id}</Number>
                  <Text>{text()}</Text>
                </div>
              </ServiceBox>
            </ParallaxItem>
          ))}
        </Foreground>
      </Wrapper>
    </>
  )
}

export default Servizi
