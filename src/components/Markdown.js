import React from "react"
import styled from "styled-components"
import ReactMarkdown from "react-markdown"

const StyledMarkdown = styled(ReactMarkdown)`
  font-size: 26px;
  font-weight: 300;
`

export const Markdown = ({ md }) => <StyledMarkdown source={md} />
