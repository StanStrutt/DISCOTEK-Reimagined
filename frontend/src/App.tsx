import { useState } from "react"

import axios from "axios"

import "./App.css"

import Header from "./components/Header"
import Featured from "./components/Featured"
import Login from "./components/Login"
import List from "./components/List"
import Footer from "./components/Footer"


export default function App() {

    const VITE_URL = import.meta.env.VITE_API_URL

    const [loginCorrect, setLoginCorrect] = useState<boolean>(false) 
    const [loginVisible, setLoginVisible] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errMessage, setErrMessage] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${VITE_URL}/login2`, {username, password}, {
                headers: { "Content-Type": "application/json" },
            })

            setErrMessage(response.data.message)
            if (response.data.status === "ok") {
                setLoginCorrect(true)
            } else {
                setLoginCorrect(false)
            }
        } catch (err) {
            if (err instanceof Error) {
                setErrMessage(err.message)
            } else {
                setErrMessage("Something went wrong")
            }
        }
        setLoginVisible(false)
    }

    console.log(errMessage)

	return (
		<>	
      		<Header/>
      		<Featured/>
			<Login 
				loginVisible={loginVisible}
                setLoginVisible={setLoginVisible}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
			/>
			<List loginCorrect={loginCorrect}/>
      		<Footer/>
    	</>
  	)
}
