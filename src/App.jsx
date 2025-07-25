import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import AddRoom from './components/room/AddRoom'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import ExistingRoom from './components/room/ExistingRoom.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EditRoom from './components/room/EditRoom.jsx'
import Home from './components/home/Home.jsx'
import NavBar from './components/layout/NavBar.jsx'
import Footer from './components/layout/Footer.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import RoomListing from './components/room/RoomListing.jsx'
import Admin from './components/admin/Admin.jsx'
import Checkout from './components/bookings/Checkout.jsx'
import BookingSuccess from './components/bookings/BookingSuccess.jsx'
import Bookings from './components/bookings/Bookings.jsx'
import FindBooking from './components/bookings/FindBooking.jsx'
import Login from './components/auth/Login.jsx'
import Registration from './components/auth/Registration.jsx'
import Profile from './components/auth/Profile.jsx'
import Logout from './components/auth/Logout.jsx'
import { AuthProvider } from './components/auth/AuthProvider.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'

function App() {
  return (
    <AuthProvider>
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/edit-room/:roomId" element={<EditRoom/>} />
          <Route path="/existing-rooms" element={<ExistingRoom/>} />
          <Route path="/add-room" element={<AddRoom/>} />
          <Route
							path="/book-room/:roomId"
							element={
								<RequireAuth>
									<Checkout />
								</RequireAuth>
							}
						/>
          <Route path="/book-room/:roomId" element={<Checkout/>} />
          <Route path="/browse-all-rooms" element={<RoomListing/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/booking-success" element={<BookingSuccess/>} />
          <Route path="/existing-bookings" element={<Bookings />} />
          <Route path="/find-booking" element={<FindBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />

        </Routes>
      </Router>
      <Footer/>
    </main>
    </AuthProvider>
  )
}

export default App
