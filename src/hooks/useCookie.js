import { useState, useEffect } from "react"

function useCookie(cookieName, path) {
  const [isMounted, setIsMounted] = useState(false)
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  const allowCookie = () => {
    localStorage.setItem(cookieName, true)
    setShowCookieBanner(false)
  }

  const forbidCookie = () => {
    localStorage.setItem(cookieName, false)
    setShowCookieBanner(false)
  }

  useEffect(() => {
    const cookie = localStorage.getItem(cookieName)
    if (!cookie) {
      setShowCookieBanner(true)
    }

    // If the cookie is set, then there is no need to display the banner
    if (cookie === "true" || cookie === "false") {
      setShowCookieBanner(false)
    }

    setIsMounted(true)
  }, [cookieName])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(cookieName, true)
      setShowCookieBanner(false)
    }
  }, [path, cookieName, isMounted])

  return [showCookieBanner, allowCookie, forbidCookie]
}

export default useCookie
