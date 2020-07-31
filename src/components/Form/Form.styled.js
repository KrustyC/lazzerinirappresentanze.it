import styled, { css } from "styled-components"

export const StyledForm = styled.form`
  margin-bottom: 100px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div:first-of-type {
    margin-right: 50px;
  }

  @media (max-width: 728px) {
    flex-direction: column;

    > div {
      margin-right: 0 !important;
    }
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
  color: white !important;
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
    height: 350px;
    resize: none;

    padding-top: 10px;
    padding-left: 20px;
    color: black;
    ::placeholder {
      color: ${theme.colors.primary};

      font-weight: bold;
      opacity: 1;
    }
  `}
`

export const BottomRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 728px) {
    flex-direction: column;
  }
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
  color: white !important;

  :disabled {
    opacity: 0.6;
  }

  @media (max-width: 728px) {
    margin-top: 30px;
    width: 100%;
  }
`

export const Status = styled.div`
  border: 2px solid ${({ error }) => (error ? "#E51B18" : "#12BB0A")};
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`
