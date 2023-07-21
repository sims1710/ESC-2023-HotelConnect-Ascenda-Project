import "./hotelpage.css"
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MailList from "../components/MailList";
import Footer from "../components/Footer";

export const Hotelpage = () => {
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className="hotelcontainer">
        <div className="hotelwrapper">
        <button className="booknow">book now!</button>

          <h1 className="hoteltitle">hotel</h1>
          <div className="hoteladd">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>address Lorem ipsum dolor sit amet, consectetur adipiscing elit </span>
          </div>
          <span className="hoteldist">dist Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
          <span className="hotelprice">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
          <div className="hotelimgs">
            <div className="hotelimgwrapper">
              <img src="./images/room2.jpg" alt="" className="hotelimg"/>
              <img src="./images/room2.jpg" alt="" className="hotelimg"/>
              <img src="./images/room2.jpg" alt="" className="hotelimg"/>
              <img src="./images/room2.jpg" alt="" className="hotelimg"/>
              <img src="./images/room2.jpg" alt="" className="hotelimg"/>
            </div>
          </div>
          <div className="hoteldetails">
            <div className="hoteldetailtxt">
              <h1 className="hotelTitle">hotel</h1>
              <p className="hoteldesc">
            ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
             rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt expli
             cabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolor
             es eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
             adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim a
             d minima veniam, quis nostrum exercitationem ullam corporis suscipit laborios
             </p>
            </div>
            <div className="price">
              <h1>enim ipsam voluptatem quia</h1>
              <span>enim ipsam voluptatem quia</span>
              <h2>
                <b>$$$$</b>
                enim ipsam voluptatem quia</h2>
                <button>book now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Hotelpage;