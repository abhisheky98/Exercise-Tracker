import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogOut } from '../hooks/useLogOut'



const Navbar = ()=>{
    const {logout} = useLogOut()
    const {user} = useAuthContext()

    const handleClick=()=>{
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to = "/">
                    <h1>Lift Tracker</h1>
                </Link>
            <nav>
                {user &&(
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>log out</button>
                </div>
                )}
                {!user && (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>

                </div>
                )}
            </nav>

            </div>
        </header>
    )
}

export default Navbar