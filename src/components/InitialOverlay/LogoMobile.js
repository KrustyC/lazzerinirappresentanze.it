import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = styled(Img)`
  min-height: 80px !important;
`

const LogoMobile = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logo-long-mobile.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Image fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default LogoMobile
