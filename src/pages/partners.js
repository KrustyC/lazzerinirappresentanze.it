import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Partner = () => (
  <Layout>
    <SEO title="Partners" />
    <h1>Hi from the partners</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

// export const pageQuery = graphql`
//   query GetAllPartners {
//     allContent {
//       edges {
//         node {
//           nome
//         }
//       }
//     }
//   }
// `

export default Partner
