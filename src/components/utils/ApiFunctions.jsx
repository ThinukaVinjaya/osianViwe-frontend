import axios from "axios";

// Create base API instance
export const api = axios.create({
    baseURL: "http://localhost:9192"
});

// Function to get headers with token
export const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    };
};

// Add new room with photo upload
export async function addRoom(photo, roomType, roomPrice) {
    try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("roomType", roomType);
        formData.append("roomPrice", roomPrice);

        const response = await api.post("/rooms/add/new-room", formData, {
            headers: {
                ...getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });

        return response.status === 201;
    } catch (error) {
        console.error("Failed to add room:", error);
        return false;
    }
}

// Get all room types
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types");
        return response.data;
    } catch (error) {
        console.error("Error fetching room types:", error.message);
        throw error;
    }
}

// Get all rooms
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

// Delete a room by ID
export async function deleteRooom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting room: ${error.message}`);
    }
}

// Update a room by ID
export async function updateRoom(roomId, roomData) {
    try {
        const formData = new FormData();
        formData.append("roomType", roomData.roomType);
        formData.append("roomPrice", roomData.roomPrice);
        formData.append("photo", roomData.photo);

        const response = await api.put(`/rooms/update/${roomId}`, formData, {
            headers: {
                ...getHeader(),
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    } catch (error) {
        throw new Error(`Error updating room: ${error.message}`);
    }
}

// Get room by ID
export const getRoomById = async (roomId) => {
    try {
        const response = await api.get(`/rooms/room/${roomId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching room:", error.message);
        throw error;
    }
};

// Book a room
export async function bookRoom(roomId, booking) {
    const token = localStorage.getItem("token");
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error booking room: ${error.message}`);
        }
    }
}

// Get all bookings
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error.message}`);
    }
}

// Get booking by confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error("No booking found for the confirmation code you entered.");
    }
}

// Cancel booking by ID
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
            headers: getHeader()
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`);
    }
}

// Get available rooms by date and type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(
        `/rooms/available-rooms?checkInDate=${encodeURIComponent(checkInDate)}&checkOutDate=${encodeURIComponent(checkOutDate)}&roomType=${encodeURIComponent(roomType)}`
    );
    return result.data;
}

// Register user
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || `User registration error: ${error.message}`);
    }
}

// Login user
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login);
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
}

// Get user profile by ID
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`/users/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Delete user by ID
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}

// Get single user by ID
export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userEmail, token) {
	try {
		if (!token) {
			console.error("No token provided");
			throw new Error("Authorization token missing");
		}

		const response = await api.get(`/bookings/user/${userEmail}/bookings`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		if (error.response?.status === 401) {
			console.error("Unauthorized: Invalid or expired token");
		} else {
			console.error("Error fetching bookings:", error.message);
		}
		throw new Error("Failed to fetch bookings");
	}
}



