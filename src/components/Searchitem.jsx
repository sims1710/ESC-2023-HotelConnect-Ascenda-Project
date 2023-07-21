import "./searchitem.css"

export const Searchitem = () => {
  return (
    <div className="searchitem">
        <img src="./images/room1.webp" alt="" className="sIimg"/>
        <div className="sIdesc">
        <h1 className="sItitle">hotel</h1>
        <span className="sIdist">1000</span>
        <span className="sItaxi">free taxic</span>
        <span className="sItsub1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        <span className="sItsub2">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        <span className="sItsub3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
        </div>
        <div className="sIdetails">
            <div className="sIrating">
                <span>Excellent</span>
                <button>9.0</button>
            </div>
            <div className="sIdetailtxt">
                <span className="price">$239</span>
                <span className="tax">includes tax and fees</span>
                <button className="sIcheckbtn">see availability</button>
            </div>
        </div>
    </div>
  )
}


export default Searchitem;