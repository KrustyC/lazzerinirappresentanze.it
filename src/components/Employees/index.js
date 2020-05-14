import React from "react"
import { useStaticQuery } from "gatsby"
import { EmployeesContainer, Employee } from "./Employees.styled"

export const Employees = () => {
  const data = useStaticQuery(graphql`
    query GetEmployees {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/employees/" } }
      ) {
        edges {
          node {
            frontmatter {
              name
              job
              picture
            }
          }
        }
      }
    }
  `)

  const employees = data.allMarkdownRemark.edges.map(
    ({ node: { frontmatter } }) => frontmatter
  )

  return (
    <EmployeesContainer>
      {employees.map(({ name, job, picture }) => (
        <Employee key={name}>
          <Employee.Container>
            <Employee.Pic>
              <Employee.Pic.Image urlSrc={picture} />
            </Employee.Pic>
            <Employee.Name>{name}</Employee.Name>
            <Employee.Job>{job}</Employee.Job>
          </Employee.Container>
        </Employee>
      ))}
    </EmployeesContainer>
  )
}
