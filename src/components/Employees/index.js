import React from "react"
import { EmployeesContainer, Employee } from "./Employees.styled"

const employees = [
  {
    name: "Maria Rossi",
    job: "Assistant Sales Manager",
    picture:
      "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
  },
  {
    name: "Luca Lazzerini",
    job: "Sales Manager",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFGxEA_sP1TrD6MGIDHAza-VAP1qYdB46ERfTxnd7vTJ9ey0Us&usqp=CAU",
  },
  {
    name: "John Doe",
    job: "Sales Manager",
    picture:
      "https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/6R0kusgfZmQv1jNcHSL9GU/f4c9517962f99704c3a0df849061b380/linkedIN-profile-FB.jpg",
  },
]

export const Employees = () => (
  <EmployeesContainer>
    {employees.map(({ name, job, picture }) => (
      <Employee>
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
