import "./list.css"
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Searchitem from "../components/Searchitem";


export const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);





  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listwrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in to Check-out date</label>
              <span
                className="checkindate"
                onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate, "dd/MM/yyyy")} to
                ${format(date[0].endDate, "dd/MM/yyyy")} `}
              </span>{openDate && <DateRange
                onChange={item => setDate([item.selection])}
                ranges={date}
                minDate={new Date()}
              />}

            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsoptions">
                <div className="lsOptionitem">
                  <span className="lsOptiontxt">min price <small>per night</small></span>
                  <input type="number" className="lsOptioninput" />
                </div>
                <div className="lsOptionitem">
                  <span className="lsOptiontxt">max price <small>per night</small></span>
                  <input type="number" className="lsOptioninput" />
                </div>
                <div className="lsOptionitem">
                  <span className="lsOptiontxt">adult</span>
                  <input type="number" className="lsOptioninput" min={1} placeholder={options.adult} />
                </div>
                <div className="lsOptionitem">
                  <span className="lsOptiontxt">children</span>
                  <input type="number" className="lsOptioninput" min={0} placeholder={options.children} />
                </div>
                <div className="lsOptionitem">
                  <span className="lsOptiontxt">room</span>
                  <input type="number" className="lsOptioninput" min={1} placeholder={options.room} />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <Searchitem/>
            <Searchitem/>
            <Searchitem/>
            <Searchitem/>
            <Searchitem/>
            <Searchitem/>
            <Searchitem/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default List;
