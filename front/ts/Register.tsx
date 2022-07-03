import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

const Register = ({ }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log('Registerの9行目のnameは' + name)
    console.log('Registerの10行目のemailは' + email)
    console.log('Registerの12行目のpasswordは' + password)
  })

  async function registerUser() {
    await axios.post('http://localhost:3000/register', { name, email, password }).then((response) => {
      console.log('Registerの18行目のresponseは' + JSON.stringify(response, null, 2))
    })
  }

  return (
    <>
      <Link to={`/`}>戻る</Link>
      <input type="text" placeholder="名前" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="yamada.tarou@gmail.com" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={registerUser}>新規登録する</button>
    </>
  )
}

export default Register
