import React from "react"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"

const StyledMarkdown = styled(ReactMarkdown)`
  font-size: 20px;
  font-weight: 300;

  @media (max-width: 728px) {
    font-size: 16px;
  }
`

export const Markdown = ({ md }) => <StyledMarkdown source={md} />
