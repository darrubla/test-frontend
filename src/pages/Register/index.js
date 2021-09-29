import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { auth, registerWithEmailAndPassword } from "../../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

import "./Register.scss"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading, error] = useAuthState(auth)
  const history = useHistory()

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) history.push("/home")
  }, [user, loading])

  return (
    <div className="register">
      <div className="register__container">
      <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={({target}) => setName(target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={({target}) => setEmail(target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={({target}) => setPassword(target.value)}
          placeholder="Password"
        />
        <button
          className="register__btn"
          onClick={() => registerWithEmailAndPassword(name, email, password)}
        >
          Register
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  )
}
export default Register