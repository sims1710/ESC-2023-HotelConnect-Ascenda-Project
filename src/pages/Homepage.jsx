import "./homepage.css"
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Content from "../components/Content";
import RoomList from "../components/RoomList";
import MailList from "../components/MailList";
import Footer from "../components/Footer";

export const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Content />
        <h1 className="hometitle">Browse by room-type</h1>
        <RoomList />
        <div className="Promo">
          <div className="Promoitem">
            <img src="./images/hotel.jpg" alt="" className="Pimg" />
            <div className="PromoT">
              <h1>DISCOUNTS OF UP TO 30%!!</h1>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Homepage;