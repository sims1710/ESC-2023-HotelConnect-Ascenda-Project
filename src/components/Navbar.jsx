import "./navbar.css"

export const Navbar = () => {
  return (
    <div className="navbar">
        <div className="Navcontainer">
            <span className="logo">Hotel Connect</span>
            <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar;

