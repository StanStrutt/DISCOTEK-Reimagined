import { useState } from "react"


export default function Login() {

    const [loginVisible, setLoginVisible] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loginCorrect, setLoginCorrect] = useState<boolean>(false) 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setUsername("")
        setPassword("")
        setLoginCorrect(true)
    }

    return (
        <>
            <button onClick={() => setLoginVisible(true)}>Login</button>
            {
                loginVisible &&(
                    <div className="login-form">
                        <form onSubmit={handleSubmit}>
                            <button onClick={() => setLoginVisible(false)}>X</button>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                )
            }
        </>
    )
}