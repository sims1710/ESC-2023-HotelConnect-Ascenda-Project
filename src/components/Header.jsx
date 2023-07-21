import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faPlane, faTaxi, faBed, faPerson } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faCompass } from "@fortawesome/free-regular-svg-icons";
import { DateRange } from "react-date-range";
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export const Header = ({type}) => {
    //to change number of adults/children/rooms
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    });

    const handleOption = (name, operation) => {
        setOptions(prev => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };



    //to prevent calender for check in and out from showing when not pressed
    const [openDate, setOpenDate] = useState(false);
    //for check-in and check-out dates
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    //for destination
    const [destination,setDestination] = useState("");



    //when search btn is pressed in homepage
    const navigate = useNavigate();
    const handleSearch = () =>{
        navigate("/hotels",{state:{destination,date,options}});
    };


    return (
        <div className="header">
            <div className="headercontainer">
                <div className="headerList">
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car Rental</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Taxi</span>
                    </div>
                </div>
                {type!=="list" && (<>
                <h1 className="headerTitle">DISCOVER</h1>
                <p className="headerDesc">Popular Destinations</p>
                <button className="headerBtn1">Explore now</button>
                <div className="headerSearchbar">
                    <div className="headerSearchbarItem">
                        <FontAwesomeIcon icon={faCompass} className="headerIcon" />
                        <input type="text"
                            placeholder="Search for destination"
                            className="Headersearchinput"
                            onChange={e=>setDestination(e.target.value)}
                        />
                    </div>
                    <div className="headerSearchbarItem">
                        <FontAwesomeIcon icon={faCalendar} className="headerIcon" />
                        <span onClick={() => setOpenDate(!openDate)} className="HeaderSearchText">
                            {`${format(date[0].startDate, "dd/MM/yyyy")} to
                            ${format(date[0].endDate, "dd/MM/yyyy")} `}
                        </span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="date"
                        />}
                    </div>
                    <div className="headerSearchbarItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                        <span onClick={() => setOpenOptions(!openOptions)} className="HeaderSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room `}</span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">adult</span>
                                <div className="optionCounter">
                                    <button className="optionCounterbtn" onClick={() => handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                                    <span className="opttionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterbtn" onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">children</span>
                                <div className="optionCounter">
                                    <button className="optionCounterbtn" onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                                    <span className="opttionCounterNumber">{options.children}</span>
                                    <button className="optionCounterbtn" onClick={() => handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">room</span>
                                <div className="optionCounter">
                                    <button className="optionCounterbtn" onClick={() => handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                                    <span className="opttionCounterNumber">{options.room}</span>
                                    <button className="optionCounterbtn" onClick={() => handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchbarItem">
                        <button className="headerBtn2" onClick={handleSearch}>Search</button>
                    </div>
                </div>
                </>)}
            </div>
        </div>

    )
}

export default Header;