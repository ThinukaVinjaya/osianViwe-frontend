import axios from "axios";
import { ThemeProvider } from "react-bootstrap";

export const api = axios.create({
    baseURL: "http://localhost:9192"
})


/*  This function add a new room to the database  */
/*export async function addRoom(photo, roomType, roomPrice) {

    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)


    const response = await api.post("/rooms/add/new-room", formData);
    if (response.status === 201) {
        return true
    } else {
        return false
    }

    

}*/

export async function addRoom(photo, roomType, roomPrice) {
    try {
        const formData = new FormData()
        formData.append("photo", photo)
        formData.append("roomType", roomType)
        formData.append("roomPrice", roomPrice)

        const response = await api.post("/rooms/add/new-room", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        console.log("Response from server:", response);

        return response.status === 201;
    } catch (error) {
        console.error("Failed to add room:", error);
        return false;
    }
}

/* This function gets all room types from the database  */
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        console.error("Error fetching room types");
        
    }

}

/* this function get all rooms from the database */
export async function getAllRooms(){
    try {
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

/* this function delete a room by Id */
export async function deleteRooom(roomId) {
    try {
        const result  = await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
    
}

/*This funtion update a room */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("photo", roomData.photo)
    const response = await api.put(`http://localhost:9192/rooms/update/${roomId}`, formData)
    return response 
    
}

/* This function get a romm by the id */
/*export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/room/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}*/

export const getRoomById = async (roomId) => {
  try {
    const response = await fetch(`http://localhost:9192/rooms/room/${roomId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch room");
    }

    const result = await response.json(); // ✅ This line is essential
    return result; // ✅ Return the parsed JSON
  } catch (error) {
    console.error("Error fetching room", error);
    throw error; // Re-throw so it can be caught in EditRoom.jsx
  }
}

/* This function saves a new booking to the database */
export async function bookRoom(roomId, booking){
    try{
        const response =  await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    }catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}


/* This function gets all bookings from the database */
export async function getAllBookings(){
    try{
        const result = await api.get("/bookings/all-bookings")
        return result.data
    }catch(error){
        throw new Error(`Error fetching booking : ${error.message}`)
    }
}

/* This function get booking by the confirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
    try{
       const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
       return result.data
    }catch(error){
       if(error.response && error.response.data){
        //throw new Error(error.response.data)
        throw new Error("No booking found for the confirmation code you entered.")
       }else{
        //throw new Error(`Error find booking : ${error.message}`)
        throw new Error("No booking found for the confirmation code you entered.")
       }
    }
}

/* This function cancels booking  */
export async function cancelBooking(bookingId) {
    try{
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    }catch(error){
        throw new Error(`Error cancelling booking : ${error.message}`)
    }
    
}