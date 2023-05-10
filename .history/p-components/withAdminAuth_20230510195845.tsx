import React, { useEffect } from "react"
import { useRouter } from "next/router"

const withAdminAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const RequiredAdminAuth: React.FC<P> = (props) => {
    const router = useRouter()

    useEffect(() => {
      const isAdminLoggedIn = sessionStorage.getItem("isAdminLoggedIn")
      if (!isAdminLoggedIn || isAdminLoggedIn !== "true") {
        router.push("adminLogin")
      }
    }, [])
    return <WrappedComponent {...props} />
  }
  return RequiredAdminAuth
}
export default withAdminAuth
