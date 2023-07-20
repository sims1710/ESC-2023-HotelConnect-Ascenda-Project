import "./content.css";

export const Content = () => {
  return (
    <div className="content">
        <div className="contentItem">
            <img src="./images/hotel-room-toronto.jpg" alt="" className="contentimg"/>
            <div className="contentdetails">
                <h1>Toronto hotel</h1>
                <h2>From $200/Night</h2>
                <button>Book now</button>
            </div>
        </div>
        <div className="contentItem">
            <img src="./images/marinabay.jpg" alt="" className="contentimg"/>
            <div className="contentdetails">
                <h1>Marina Bay Sands hotel</h1>
                <h2>From $500/Night</h2>
                <button>Book now ...</button>
            </div>
        </div>
        <div className="contentItem">
            <img src="./images/lemeridien.webp" alt="" className="contentimg"/>
            <div className="contentdetails">
                <h1>Le Meridien hotel</h1>
                <h2>From $300/Night</h2>
                <button>Book now</button>
            </div>
        </div>
    </div>
  )
}

export default Content;
