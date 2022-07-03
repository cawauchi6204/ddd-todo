import React from "react"
import axios from "axios"
import { useEffect } from "react"

const Register = ({ }) => {
  useEffect(() => {
    console.log('useEffect開始');
    // axios.get()
  }, [])

  return (
    <>
      <input type="text" placeholder="名前" />
    </>
  )
}

export default Register
