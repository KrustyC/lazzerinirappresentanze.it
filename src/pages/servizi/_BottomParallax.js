import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"

const StyledImaged = styled(BackgroundImage)`
  width: 100vw;
  height: 500px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

export const BottomParallax = () => {
  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "kegs.jpg" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const imageData = data.desktop.childImageSharp.fluid
  return <StyledImaged Tag="div" fluid={imageData} backgroundColor="#040e18" />
}
