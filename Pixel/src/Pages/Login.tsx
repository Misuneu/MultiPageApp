import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Login() {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [message, setMessage] = useState("")
        const navigate = useNavigate()
        
        const login = async (e:React.SubmitEvent) => {
            
            e.preventDefault()
    
            const res = await fetch("https://masekmi22.sps-prosek.cz/_Web/API_Pixel/login.php",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json()
            console.log(data)
            setMessage(data.message)
            if (data.success === true) {
                localStorage.setItem("token", data.token)
                navigate("/LeaderboardPage")
            }
        }
    
        return (
            <>
                <form onSubmit={login}>
                    <h1>Login</h1>           
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <button>Login</button>
                    {message && <p>{message}</p>}
                    <p>Create a account? <Link to="/Register">Login</Link></p>
                </form>
            </>
        )
}