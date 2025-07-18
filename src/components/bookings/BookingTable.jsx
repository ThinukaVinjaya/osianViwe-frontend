import React, { useEffect, useState } from 'react'
import { parseISO } from 'date-fns'
import DateSlider from '../common/DateSlider'

const BookingTable = ({bookingInfo, handleBookingCancellation}) => {
    const[filteredBookings, setFilteredBookings] = useState(bookingInfo)

    const filterBookings = (startDate, endDate) => {
        let filtered = bookingInfo
        if(startDate && endDate){
            filtered = bookingInfo.filter((booking) => {
                const bookingStartDate = parseISO(booking.checkInDate)
                const bookingEndDate = parseISO(booking.checkOutDate)
                return bookingStartDate >= startDate && bookingEndDate 
                <= endDate && bookingEndDate > startDate
            })
        }
        setFilteredBookings(filtered)
    }

    useEffect(() =>{
        setFilteredBookings(bookingInfo)
    }, [bookingInfo])

  return (
    <section className='p-4'>
        <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings}/>
        <table>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Booking ID</th>
                    <th>Room Id</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guest</th>
                    <th>Confirmation Code</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {filteredBookings.map((booking, index) =>(
                    <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.id}</td>
                        <td>{booking.room.id}</td>
                        <td>{booking.checkInDate}</td>
                        <td>{booking.checkOutDate}</td>
                        <td>{booking.guestName}</td>
                        <td>{booking.guestEmail}</td>
                        <td>{booking.numOfAdults}</td>
                        <td>{booking.numOfChildren}</td>
                        <td>{booking.totalNumOfGuests}</td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td>
                            <button
                            className='btn-danger btn-sm'
                            onClick={() => handleBookingCancellation(booking.id)}
                            >
                             Cancel
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      
    </section >
  )
}

export default BookingTable
