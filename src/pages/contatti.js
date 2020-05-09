import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import { CenteredColumn } from "../components/CenteredColumn"
import { Form } from "../components/Form"
import { Map } from "../components/Map"
import { OfficeInfo } from "../components/OfficeInfo"

const Contact = ({ data }) => {
  // const { title, address } = data.markdownRemark.frontmatter
  return (
    <>
      <SEO title="Contatti" />
      <CenteredColumn>
        <h1>Mettiti in contatto con noi</h1>
      </CenteredColumn>

      <Map />
      <OfficeInfo />
      <br />
      <br />
      <Form />
    </>
  )
}

export const pageQuery = graphql`
  query GetContacts {
    markdownRemark(fileAbsolutePath: { regex: "/contacts/" }) {
      frontmatter {
        title
        address
      }
    }
  }
`

export default Contact
