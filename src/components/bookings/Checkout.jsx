import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import { getRoomById } from '../utils/ApiFunctions'
import { useParams } from 'react-router-dom'
import {
  FaWifi, FaTv, FaUtensils, FaWineGlassAlt,
  FaCar, FaParking, FaTshirt
} from 'react-icons/fa'
import RoomCard from '../room/RoomCard'
import RoomCarousel from '../common/RoomCarousel'

const Checkout = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: ""
  })

  const { roomId } = useParams()

  useEffect(() => {
    getRoomById(roomId)
      .then((response) => {
        console.log("Room info response:", response) 
        setRoomInfo(response)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error.message || "Error loading room data")
        setIsLoading(false)
      },2000)
  }, [roomId]);

  // Utility to get correct image source
  const getImageSrc = () => {
    if (!roomInfo.photo) return "/placeholder.jpg" 
    return roomInfo.photo.startsWith("data:image")
      ? roomInfo.photo
      : `data:image/png;base64,${roomInfo.photo}`
  }

  return (
    <div>
      <section className='container'>
        <div className='row flex-column flex-md-row align-items-center'>
          <div className='col-md-4 mt-5 mb-5'>
            {isLoading ? (
              <p>Loading room information...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <div className='room-info'>
                <img
                  src={getImageSrc()}
                  alt="Room"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <table className='table mt-3'>
                  <tbody>
                    <tr>
                      <th>Room Type:</th>
                      <td>{roomInfo.roomType}</td>
                    </tr>
                    <tr>
                      <th>Room Price:</th>
                      <td>{roomInfo.roomPrice}</td>
                    </tr>
                    <tr>
                      <th>Room Service:</th>
                      <td colSpan="2">
                        <ul className='list-unstyled mt-3'>
                          <li><FaWifi /> WiFi</li>
                          <li><FaTv /> Netflix Premium</li>
                          <li><FaUtensils /> Breakfast</li>
                          <li><FaWineGlassAlt /> Mini bar refreshment</li>
                          <li><FaCar /> Car Service</li>
                          <li><FaParking /> Parking Space</li>
                          <li><FaTshirt /> Laundry</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='col-md-7'>
            <BookingForm />
          </div>
        </div>
      </section>
      <div className='container'>
          <RoomCarousel/>
      </div>
    </div>
  )
}

export default Checkout
