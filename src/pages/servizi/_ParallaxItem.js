import React, { useRef, useState, useLayoutEffect } from "react"
import styled from "styled-components"
import {
  useViewportScroll,
  useTransform,
  useSpring,
  motion,
} from "framer-motion"

const Div = styled.div`
  align-self: ${({ left }) => (left ? "flex-start" : "flex-end")};
`

const calculateMinHeight = (height, range) => {
  return height + height * range
}

const rand = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (+max - +min)) + +min
}

export const ParallaxItem = ({ left, children }) => {
  const range = 0.2
  const { scrollY } = useViewportScroll()
  const ref = useRef()
  const [offsetTop, setOffsetTop] = useState(0)
  const [minHeight, setMinHeight] = useState("200px")
  const springConfig = {
    damping: 300,
    stiffness: 200,
    mass: rand(1, 3),
  }

  useLayoutEffect(() => {
    if (!ref.current) return null
    const onResize = () => {
      setOffsetTop(ref.current.offsetTop)
      setMinHeight(calculateMinHeight(ref.current.offsetHeight, range))
    }

    onResize()
    window.addEventListener("resize", onResize)

    return () => window.removeEventListener("resize", onResize)
  }, [ref])

  const y = useSpring(
    useTransform(
      scrollY,
      [offsetTop - 500, offsetTop + 500],
      ["0%", `${range * 500}%`]
    ),
    springConfig
  )

  return (
    <Div style={{ minHeight }} left={left}>
      <motion.div ref={ref} initial={{ y: 0 }} style={{ y }}>
        {children}
      </motion.div>
    </Div>
  )
}
