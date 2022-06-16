import {Link, useNavigate} from 'react-router-dom'

const Header = ({ setIsAuth }) => {
    let navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        
        window.localStorage.removeItem("calendar_token")
        window.localStorage.removeItem("calendar_user")
        
        setIsAuth(false)
        navigate("/login")
      };

    return (
        <header >
            <div className="header-links">
            <Link className="header-link" to="/home">HOME</Link>
            <Link className="header-link" to="/all_events">ALL EVENTS</Link>
            <Link className="header-link" to="/profile">PROFILE</Link>
            </div>
            <div className="logout-button-container">
            <button className="btn btn-logout" onClick={handleLogout}> LOGOUT </button>
            </div>
        </header>
    )
}

export default Header;