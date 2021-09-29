import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { auth, registerWithEmailAndPassword } from "../../services/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { notify } from '../../utils/index'

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

  const handleSubmit = () => {
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
    if (password.length < 6) {
      notify('error', '!Hola, por favor valida que tu contraseña tenga 6 o más carácteres!', 'error_pwd')
    } else if (!email.match(regexp)) {
      notify('error', '!Hola, por favor escribe un correo válido!', 'error_pwd')
    } else if (name.length < 1) {
      notify('error', '!Hola, por favor escribe tu nombre completo!', 'error_name')
    } else {
      registerWithEmailAndPassword(name, email, password)
    }
  }

  return (
    <div className="register">
      <h1>Pokemon Test</h1>
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
          onClick={() => handleSubmit()}
        >
          Register
        </button>
        <span>
          Already have an account? <Link to="/">Login</Link> now.
        </span>
      </div>
    </div>
  )
}
export default Register