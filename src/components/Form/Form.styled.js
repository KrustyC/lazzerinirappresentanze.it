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
`

export const Textarea = styled.textarea`
  ${({ theme }) => css`
    background: white;
    border: 2px solid ${theme.colors.primary};
    border-radius: 20px;
    /* border: none; */
    width: 100%;
    resize: none;
  `}
`

export const Button = styled.button`
  background: black;
  color: white;
  font-weight: bold;
  width: 100px;
  height: 50px;
  border-radius: 50px;
`
