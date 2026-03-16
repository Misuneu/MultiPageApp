import { Link, useNavigate } from "react-router-dom"

export function Navbar () {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <nav>
            <Link to="/">
                <button>Home</button>
            </Link>
            {!token && (
                <>
                    <Link to="/Login">
                        <button>Login</button>
                    </Link>
                    <Link to="/Register">
                        <button>Register</button>
                    </Link>
                </>
            )}
            {token && (
                <>
                    <Link to="/LeaderboardPage">
                        <button>Leaderboard</button>
                    </Link>
                    <Link to="/game">
                        <button>Aim Trainer</button>
                    </Link>
                     <Link to="/SurvivalPage">
                        <button>Survival</button>
                    </Link>
                    <button onClick={logout}>Logout</button>
                </>
            )}
            
            
        </nav>
    )
}