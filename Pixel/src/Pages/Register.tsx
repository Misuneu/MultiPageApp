import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    
    const register = async (e:React.SubmitEvent) => {
        
        e.preventDefault()
        // https://www.youtube.com/watch?v=eDTJSty3QZc
        const res = await fetch("https://masekmi22.sps-prosek.cz/_Web/API_Pixel/register.php",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        })
        const data = await res.json()
        console.log(data)
        setMessage(data.message)
        if (data.success === true) {
            navigate("/Login")
        }
    }

    return (
        <>
            <form onSubmit={register}>
                <h1>Register</h1>       
                <input 
                    placeholder="Username"
                    required
                    onChange={e=>setUsername(e.target.value)}
                />
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
                <button>Create account</button>
                {message && <p>{message}</p>}
                <p>Aleready have a account? <Link to="/Login">Login</Link></p>
            </form>
        </>
    )
}