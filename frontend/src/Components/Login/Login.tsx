import { useEffect } from "react"

import "./Login.css"

interface LoginProps {
    loginVisible: boolean
    setLoginVisible: React.Dispatch<React.SetStateAction<boolean>>
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword: React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => Promise<void>
}

export default function Login({ 
    loginVisible,
    setLoginVisible,
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit
}: LoginProps) {

    useEffect(() => {
        if (loginVisible) {
            document.body.style.overflow = "hidden"
            document.body.style.pointerEvents = "none"
        } else {
            document.body.style.overflow = "unset"
            document.body.style.pointerEvents = "all"
        }
    }, [loginVisible])

    const loginClicked = () => {
        setUsername("")
        setPassword("")
        setLoginVisible(true)
    }

    return (
        <div className="login-holder">
          <a className="login-button" onClick={() => loginClicked()}>Login</a>
            {
                loginVisible &&(
                    <div className="login-form-holder">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <button className="close-login" onClick={() => setLoginVisible(false)}>X</button>
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
                            <button className="login-submit" type="submit">Login</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}