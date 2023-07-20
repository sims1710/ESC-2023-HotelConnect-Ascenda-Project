// import logo from './logo.svg';
// import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import List from "./pages/List";
import Hotelpage from "./pages/Hotelpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotelpage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
