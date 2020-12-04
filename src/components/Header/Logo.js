import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledLogo = styled(Img)`
  /* margin-top: 10px; */
  width: 160px !important;
  height: 150px !important;
`

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "visual_identity_colour_stage02.png" }) {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return <StyledLogo fixed={data.placeholderImage.childImageSharp.fixed} />
}

export default Logo
