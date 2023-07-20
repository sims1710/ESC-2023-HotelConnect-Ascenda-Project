import "./homepage.css"
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Content from "../components/Content";

export const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Content/>
      </div>
    </div>
  )
}

export default Homepage;