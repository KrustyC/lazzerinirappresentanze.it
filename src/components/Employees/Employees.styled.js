import styled, { css } from "styled-components"

const EmployeesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vw;
  margin: 100px auto;
`

const Employee = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EmployeeContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
`

const EmployeePicContainer = styled.div`
  ${({ theme }) => css`
    width: 250px;
    height: 250px;
    border-radius: 10px;

    :hover {
      box-shadow: 0px 0px 0px 6px ${theme.colors.primary};
    }
  `}
`

const EmployeePic = styled.div`
  ${({ theme, urlSrc }) => css`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-size: cover;
    background-image: url(${urlSrc});
    background-position: 50% 50%;
    filter: grayscale(100%);
  `}
`

const EmployeeName = styled.h4`
  font-size: 22px;
  font-weight: bold;
  margin: 15px 0px 5px 0px;
`

const EmployeeJob = styled.h5`
  font-size: 18px;
  font-weight: 300;
  margin: 0;
`

EmployeePicContainer.Image = EmployeePic

Employee.Container = EmployeeContainer
Employee.Pic = EmployeePicContainer
Employee.Name = EmployeeName
Employee.Job = EmployeeJob

export { EmployeesContainer, Employee }
