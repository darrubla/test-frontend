import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useHistory } from "react-router"
import { auth, db, logout } from "../../services/firebase"

import "./Home.scss"

function Home() {
  const [user, loading, error] = useAuthState(auth)
  const [name, setName] = useState("")
  const [data, setData] = useState(null)
  const history = useHistory()
  console.log(data);
  const fetchUserName = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get()
      const data = await query.docs[0].data()
      setName(data.name)
      setData(data)
    } catch (err) {
      console.error(err)
      // alert("An error occured while fetching user data")
    }
  }
  useEffect(() => {
    if (loading) return
    if (!user) return history.replace("/")
    fetchUserName()
  }, [user, loading])
  return (
    <div className="home">
      <div className="home__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="home__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default Home