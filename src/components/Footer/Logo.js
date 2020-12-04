import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledLogo = styled(Img)`
  width: 100px;
`

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "visual_identity_bcolour_white_stage02.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return <StyledLogo fixed={data.placeholderImage.childImageSharp.fixed} />
}

export default Logo
