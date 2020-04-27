import React from "react"

function isClient() {
  return typeof document !== `undefined`
}

function usePortal(id) {
  const rootElemRef = React.useRef(null)

  React.useEffect(() => {
    const parentElem = isClient() ? document.querySelector(`#${id}`) : null

    if (parentElem) {
      parentElem.appendChild(rootElemRef.current)
    }

    return function removeElement() {
      if (rootElemRef.current) {
        rootElemRef.current.remove()
      }
    }
  }, [id])

  function getRootElem() {
    if (isClient() && !rootElemRef.current) {
      rootElemRef.current = document.createElement("div")
    }
    return rootElemRef.current
  }

  // Lazy initialization
  return getRootElem()
}

export default usePortal
