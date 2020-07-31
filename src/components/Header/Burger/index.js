import React, { useState } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import Logo from "./Logo"
import { navbarLinks } from "../../../utils/links"

const Div = styled.div``

const Head = styled.div`
  height: 100px;

  align-self: flex-end;
  padding-right: 30px;
  padding-top: 30px;
`
const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 60px;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  width: 100vw;
  z-index: 100000;

  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`

const StyledA = styled.a`
  font-weight: bold;
  color: black;
  text-decoration: none;
`

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-left: 0;
  margin-top: 48px;
  padding-left: 0;
  font-size: 30px;
  text-align: left;
  width: 88vw;
`

const Li = styled.li`
  color: white;
  font-size: 26px;

  a {
    text-decoration: none;
    color: #ffffff !important;
  }
`

const NavIcon = styled.div`
  width: 30px;

  &:after,
  &:before,
  div {
    background-color: #000;
    border-radius: 3px;
    content: "";
    display: block;
    height: 5px;
    margin: 7px 0;
    transition: all 0.2s ease-in-out;
  }

  ${({ active }) =>
    active &&
    css`
      margin-top: 25px;

      div {
        background-color: transparent;
      }

      &:before {
        background-color: #fff;
        transform: translateY(12px) rotate(135deg);
      }

      &:after {
        background-color: #fff;
        transform: translateY(-12px) rotate(-135deg);
      }
    `}
`

export const Burger = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onToggle = () => setIsOpen(!isOpen)

  return (
    <Div>
      <NavIcon onClick={onToggle}>
        <div />
      </NavIcon>

      {isOpen && (
        <Overlay>
          <Head>
            <NavIcon active onClick={onToggle}>
              <div />
            </NavIcon>
          </Head>
          <Main>
            <Logo />
            <Ul>
              {navbarLinks.map(({ text, link, href }) => (
                <Li key={text}>
                  {!!link ? (
                    <Link activeClassName="active" link={link}>
                      {text}
                    </Link>
                  ) : (
                    <StyledA href={href}>{text}</StyledA>
                  )}
                </Li>
              ))}
            </Ul>
          </Main>
        </Overlay>
      )}
    </Div>
  )
}
