import React from "react"
import styled, { css } from "styled-components"
import SEO from "../../components/seo"
import { TopParallax } from "./_TopParallax"
import { MidParallax } from "./_MidParallax"
import { BottomParallax } from "./_BottomParallax"
import { ParallaxItem } from "./_ParallaxItem"
import services from "./_services"

const Wrapper = styled.div`
  min-height: 2600px;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: ${left ? "flex-end" : "flex-start"};
    box-shadow: ${`${left ? "" : "-"}6px`} 7px 6px -2px rgba(217, 217, 217, 1);

    margin-top: 100px;

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

        <h1>DIO MERDA</h1>
      </Wrapper>
    </>
  )
}

export default Servizi
