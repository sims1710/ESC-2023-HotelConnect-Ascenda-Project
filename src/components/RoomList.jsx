import "./roomlist.css"

export const RoomList = () => {
  return (
    <div className="RmList">
        <div className="RmlistItem">
            <img src="./images/room1.webp" alt="" className="Rmimg"/>
            <div className="RmListTitle">
                <h1>Hotel</h1>
                <h2>123 hotel</h2>
            </div>   
        </div>
        <div className="RmlistItem">
            <img src="./images/room2.jpg" alt="" className="Rmimg"/>
            <div className="RmListTitle">
                <h1>Hotel</h1>
                <h2>123 hotel</h2>
            </div>   
        </div>
        <div className="RmlistItem">
            <img src="./images/room3.png" alt="" className="Rmimg"/>
            <div className="RmListTitle">
                <h1>Hotel</h1>
                <h2>123 hotel</h2>
            </div>   
        </div>
        <div className="RmlistItem">
            <img src="./images/room4.jpg" alt="" className="Rmimg"/>
            <div className="RmListTitle">
                <h1>Hotel</h1>
                <h2>123 hotel</h2>
            </div>   
        </div>
    </div>
  )
}

export default RoomList;
