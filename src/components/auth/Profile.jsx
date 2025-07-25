import React, { useEffect, useState } from "react";
import { deleteUser, getBookingsByUserId, getUser } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
	const [user, setUser] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [message, setMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");
	const token = localStorage.getItem("token");

	// Fetch user details first
	useEffect(() => {
		const fetchUser = async () => {
			try {
				if (!userId || !token) throw new Error("Missing credentials");
				const userData = await getUser(userId, token);
				setUser(userData);
			} catch (error) {
				console.error("Failed to fetch user:", error.message);
				setErrorMessage("Unable to load user data.");
			}
		};

		fetchUser();
	}, [userId, token]);

	// Fetch bookings only after user (and user.email) is loaded
	useEffect(() => {
		const fetchBookings = async () => {
			if (!user?.email || !token) return;

			try {
				const response = await getBookingsByUserId(user.email, token); // ✅ using email
				setBookings(response);
			} catch (error) {
				console.error("Error fetching bookings:", error.message);
				setErrorMessage("Unable to load bookings.");
			}
		};

		fetchBookings();
	}, [user, token]);

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
		if (!confirmed) return;

		try {
			await deleteUser(userId, token); // ✅ pass token
			setMessage("Account deleted successfully.");
			localStorage.clear();
			navigate("/");
			window.location.reload();
		} catch (error) {
			console.error("Delete failed:", error.message);
			setErrorMessage("Failed to delete account.");
		}
	};

	return (
		<div className="container">
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
			{message && <p className="text-success">{message}</p>}

			{user ? (
				<div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
					<h4 className="card-title text-center">User Information</h4>
					<div className="card-body">
						<div className="col-md-10 mx-auto">
							<div className="card mb-3 shadow">
								<div className="row g-0">
									<div className="col-md-2 d-flex justify-content-center align-items-center">
										<img
											src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
											alt="Profile"
											className="rounded-circle"
											style={{ width: "150px", height: "150px", objectFit: "cover" }}
										/>
									</div>
									<div className="col-md-10">
										<div className="card-body">
											<p><strong>ID:</strong> {user.id}</p>
											<p><strong>First Name:</strong> {user.firstName}</p>
											<p><strong>Last Name:</strong> {user.lastName}</p>
											<p><strong>Email:</strong> {user.email}</p>
											<p><strong>Roles:</strong> {user.roles.map(r => r.name).join(", ")}</p>
										</div>
									</div>
								</div>
							</div>

							<h4 className="card-title text-center">Booking History</h4>

							{bookings.length > 0 ? (
								<table className="table table-bordered table-hover shadow">
									<thead>
										<tr>
											<th>Booking ID</th>
											<th>Room ID</th>
											<th>Room Type</th>
											<th>Check In Date</th>
											<th>Check Out Date</th>
											<th>Confirmation Code</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{bookings.map((booking, index) => (
											<tr key={index}>
												<td>{booking.id}</td>
												<td>{booking.room?.id || "-"}</td>
												<td>{booking.room?.roomType || "-"}</td>
												<td>{moment(booking.checkInDate).format("MMM Do, YYYY")}</td>
												<td>{moment(booking.checkOutDate).format("MMM Do, YYYY")}</td>
												<td>{booking.bookingConfirmationCode}</td>
												<td className="text-success">On-going</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>You have not made any bookings yet.</p>
							)}

							<div className="d-flex justify-content-center mt-3">
								<button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
									Delete account
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<p>Loading user data...</p>
			)}
		</div>
	);
};

export default Profile;
