import React, { useState } from 'react'
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from '../common/RoomTypeSelector'
import { Link, useNavigate } from 'react-router-dom'

const AddRoom = () => {
	const [newRoom, setNewRoom] = useState({
		photo: null,
		roomType: "",
		roomPrice: ""
	})

	const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

	const handleRoomInputChange = (e) => {
		const { name, value } = e.target
		setNewRoom({ ...newRoom, [name]: name === "roomPrice" ? parseInt(value) || "" : value })
	}

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0]
		setNewRoom({ ...newRoom, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
	}

	const handleSubmit = async (e) => {
		e.preventDefault() // 
		try {
			if (!newRoom.photo || !newRoom.roomType || !newRoom.roomPrice) {
				setErrorMessage("Please fill in all fields and upload a photo.")
				return
			}
			const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
			if (success) {
				setSuccessMessage("A new room was added to the database.")
				setNewRoom({ photo: null, roomType: "", roomPrice: "" })
				setImagePreview("")
				setErrorMessage("")
			} else {
				setSuccessMessage("A new room was added to the database.")
                navigate("/existing-rooms")
			}
		} catch (error) {
			setErrorMessage(`Submission error: ${error.message}`)
		}

		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<section className="container mt-5 mb-5">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<h2 className="mt-5 mb-2">Add a New Room</h2>

					{successMessage && <div className="alert alert-success">{successMessage}</div>}
					{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="roomType" className="form-label">Room Type</label>
							<RoomTypeSelector
								handleRoomInputChange={handleRoomInputChange}
								newRoom={newRoom}
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="roomPrice" className="form-label">Room Price</label>
							<input
								id="roomPrice"
								name="roomPrice"
								type="number"
								className="form-control"
								value={newRoom.roomPrice}
								onChange={handleRoomInputChange}
								required
							/>
						</div>

						<div className="mb-3">
							<label htmlFor="photo" className="form-label">Room Photo</label>
							<input
								id="photo"
								name="photo"
								type="file"
								className="form-control"
								onChange={handleImageChange}
								required
							/>
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Preview Room"
									style={{ maxWidth: "400px", maxHeight: "400px" }}
									className="mb-3 mt-2"
								/>
							)}
						</div>

						<div className="d-grid d-md-flex gap-2">
							<Link to="/existing-rooms" className="btn btn-outline-info">
								Back
							</Link>
							<button type="submit" className="btn btn-outline-primary">
								Save Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default AddRoom

