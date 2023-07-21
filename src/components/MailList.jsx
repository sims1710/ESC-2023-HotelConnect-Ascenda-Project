import "./maillist.css"

export const MailList = () => {
  return (  
    <div className="mail">
        <div className="mailTitle">Contact us</div>
        <span>for any troubles or information</span>
        <div className="mailInputContainer">
            <div className="inputcontainer">
            <input type="text" placeholder="Enter your email" />
            <input type="text" placeholder="Enter your message" />
            </div>
            <button>Send</button>
        </div>
    </div>

    )
}

export default MailList;
