import { useEffect, useState } from "react"

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    onoffline = () => {
      setIsOnline(false)
    }

    ononline = () => {
      setIsOnline(true)
    }
  }, [])
  return isOnline
}

export { useOnlineStatus }
