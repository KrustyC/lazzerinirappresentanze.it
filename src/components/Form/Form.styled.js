import styled, { css } from "styled-components"

export const StyledForm = styled.form``

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div:first-of-type {
    margin-right: 50px;
  }
`

export const InputGroup = styled.div`
  display: block;
  flex: 1;
  margin-bottom: 30px;
`

export const Input = styled.input`
  background: ${({ theme }) => theme.colors.primary};
  height: 50px;
  border-radius: 50px;
  border: none;
  width: 100%;

  padding-left: 20px;
  font-weight: bold;
  color: white;
  ::placeholder {
    opacity: 0.9;
  }
`

export const Textarea = styled.textarea`
  ${({ theme }) => css`
    background: white;
    border: 2px solid ${theme.colors.primary};
    border-radius: 20px;
    width: 100%;
    resize: none;

    padding-top: 10px;
    padding-left: 20px;
    color: black;
    ::placeholder {
      font-weight: bold;
      opacity: 1;
    }
  `}
`

export const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const PolicyRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  span {
    margin-left: 10px;
    font-weight: bold;
    a {
      color: black;
    }
  }
`

export const Button = styled.button`
  background: black;
  color: white;
  font-weight: bold;
  width: 100px;
  height: 50px;
  border-radius: 50px;

  :disabled {
    opacity: 0.5;
  }
`
