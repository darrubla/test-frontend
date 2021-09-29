import React, { useEffect } from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import { useHistory } from "react-router"
import { auth } from "../services/firebase"

const IsLogged = () => {
  const [user, loading, error] = useAuthState(auth)
  const history = useHistory()

  useEffect(() => {
    if (loading) return
    if (!user) return history.replace("/")
  }, [user, loading])

  return [user, loading]
}

export default IsLogged