import "./navbar.css"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {


  const navigate = useNavigate();
  const handle = () =>{
      navigate("/");
  };

  return (
    <div className="navbar">
        <div className="Navcontainer">
            <span className="logo" onClick={handle}>Hotel Connect</span>
            <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar;

