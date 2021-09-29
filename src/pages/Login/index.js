import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { notify } from '../../utils/index'

import "./Login.scss"

function Login() {
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

  const handleSubmit = () => {
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
    if (password.length < 6) {
      notify('error', '!Hola, por favor valida que tu contraseña tenga 6 o más carácteres!', 'error_pwd')
    }else if (!email.match(regexp)) {
      notify('error', '!Hola, por favor escribe un correo válido!', 'error_pwd')
    } else {
      signInWithEmailAndPassword(email, password)
    }
  }

  return (
    <div className="login">
      <h1>Pokemon Test</h1>
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => handleSubmit()}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <span>
          Don't have an account? <Link to="/register">Register</Link> now.
        </span>
      </div>
    </div>
  )
}
export default Login