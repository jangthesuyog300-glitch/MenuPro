// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { Routes, Route } from "react-router-dom";

import Homepage from "./Homepage/Homepage.jsx";
import Navbar from "./Homepage/Navbar.jsx";
import Footer from "./Homepage/Footer.jsx";
import RestaurantDetails from "./Homepage/CardForHotels/RestaurantDetails/RestaurantDetails.jsx";
import BookTablePage from "./Homepage/CardForHotels/RestaurantDetails/BookTablePage.jsx";
import './StylesH/App1.css';

export default function App(){
    return(<>
    <div className="app-container">
      <Navbar />

      {/* <main className="content">
        <Homepage />
      </main> */}
    <main className="content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/restaurant/:id/book" element={<BookTablePage />} />
      </Routes>
      </main>


      <Footer />
    </div>
    
    </>)
} 