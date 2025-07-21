import moment from 'moment'
import React, { useState } from 'react'
import { getAvailableRooms } from '../utils/ApiFunctions'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import RoomTypeSelector from './RoomTypeSelector'
import RoomSearchResult from './RoomSearchResult'

const RoomSearch = () => {
    const [searchQuery, setSearchQuery] = useState({
        checkInDate: "",
        checkOutDate: "",
        roomType: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [availableRooms, setAvailableRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault();
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        if (!checkIn.isValid() || !checkOut.isValid()) {
            setErrorMessage("Please, enter valid date range")
            return
        }
        if (!checkOut.isSameOrAfter(checkIn)) {
            setErrorMessage("Check-In Date must come before check-Out date")
            return
        }
        setIsLoading(true)
        getAvailableRooms(searchQuery.checkInDate,
            searchQuery.checkOutDate, searchQuery.roomType).then((response) => {
                setAvailableRooms(response.data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 2000)
            }).catch((error) => {
                console.error(error)
            }).finally(() => {
                setIsLoading(false)
            })

    }

    /*const handleInputChange = (e) =>{
        const{ name, value} = e.target
        const checkIn = moment(searchQuery.checkInDate)
        const checkOut = moment(searchQuery.checkOutDate)
        if(checkIn.isValid() && checkOut.isValid()){
            setErrorMessage("")
        }
    }*/

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSearchQuery((prevQuery) => ({
            ...prevQuery,
            [name]: value
        }));

        // Clear error message while typing if both dates are valid
        const checkIn = moment(name === 'checkInDate' ? value : searchQuery.checkInDate);
        const checkOut = moment(name === 'checkOutDate' ? value : searchQuery.checkOutDate);
        if (checkIn.isValid() && checkOut.isValid()) {
            setErrorMessage('');
        }
    };

    const ClearSearch = () => {
        setSearchQuery({
            checkInDate: "",
            checkOutDate: "",
            roomType: ""
        });
        setAvailableRooms([]);
        setErrorMessage("");
    }





    return (
        <>
            <Container className='mt-5 mb-5 py-5 shadow'>
                <Form onSubmit={handleSearch}>
                    <Row className="justify-content-center">

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkInDate'>
                                <Form.Label>
                                    Check-in date
                                </Form.Label>
                                <Form.Control
                                    type='date'
                                    name='checkInDate'
                                    value={searchQuery.checkInDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='checkOutDate'>
                                <Form.Label>
                                    Check-out date
                                </Form.Label>
                                <Form.Control
                                    type='date'
                                    name='checkOutDate'
                                    value={searchQuery.checkOutDate}
                                    onChange={handleInputChange}
                                    min={moment().format("YYYY-MM-DD")}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group controlId='roomType'>
                                <Form.Label>
                                    Room Type
                                </Form.Label>
                                <div className='d-flex'>
                                    <RoomTypeSelector
                                        handleRoomInputChange={handleInputChange}
                                        newRoom={searchQuery} />
                                    <Button variant='secondary' type='submit' disabled={isLoading}>
                                        {isLoading ? 'Searching...' : 'Search'}
                                    </Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>


                {isLoading ? (
                    <p>finding available rooms ......</p>
                ) : availableRooms ? (
                    <RoomSearchResult
                        results={availableRooms}
                        onClearSearch={ClearSearch}
                    />
                ) : (
                    <p>No rooms available for the selected date and room type</p>
                )}
                {errorMessage && <p className='text-danger'>{errorMessage}</p>}

            </Container>

        </>
    )
}

export default RoomSearch

/*import moment from 'moment';
import React, { useState } from 'react';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import RoomTypeSelector from './RoomTypeSelector';
import RoomSearchResult from './RoomSearchResult';

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: '',
    checkOutDate: '',
    roomType: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);

    if (!checkIn.isValid() || !checkOut.isValid()) {
      setErrorMessage('Please enter a valid date range');
      return;
    }

    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMessage('Check-In date must be before or equal to Check-Out date');
      return;
    }

    setIsLoading(true);

    getAvailableRooms(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response?.data || []);
        if ((response?.data || []).length === 0) {
          setErrorMessage('No rooms found for the selected date and type.');
        } else {
          setErrorMessage('');
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to fetch available rooms');
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 1000);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value
    }));

    // Clear error message while typing if both dates are valid
    const checkIn = moment(name === 'checkInDate' ? value : searchQuery.checkInDate);
    const checkOut = moment(name === 'checkOutDate' ? value : searchQuery.checkOutDate);
    if (checkIn.isValid() && checkOut.isValid()) {
      setErrorMessage('');
    }
  };

  const clearSearch = () => {
    setSearchQuery({
      checkInDate: '',
      checkOutDate: '',
      roomType: ''
    });
    setAvailableRooms([]);
    setErrorMessage('');
  };

  return (
    <Container className="mt-5 mb-5 py-5 shadow">
      <Form onSubmit={handleSearch}>
        <Row className="justify-content-center">
          <Col xs={12} md={3}>
            <Form.Group controlId="checkInDate">
              <Form.Label>Check-in date</Form.Label>
              <Form.Control
                type="date"
                name="checkInDate"
                value={searchQuery.checkInDate}
                onChange={handleInputChange}
                min={moment().format('YYYY-MM-DD')}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={3}>
            <Form.Group controlId="checkOutDate">
              <Form.Label>Check-out date</Form.Label>
              <Form.Control
                type="date"
                name="checkOutDate"
                value={searchQuery.checkOutDate}
                onChange={handleInputChange}
                min={moment().format('YYYY-MM-DD')}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={3}>
            <Form.Group controlId="roomType">
              <Form.Label>Room Type</Form.Label>
              <div className="d-flex">
                <RoomTypeSelector
                  handleRoomInputChange={handleInputChange}
                  newRoom={searchQuery}
                />
                <Button
                  variant="secondary"
                  type="submit"
                  className="ms-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {setIsLoading ? (
        <div className="text-center mt-3">
          <span className="spinner-border spinner-border-sm me-2" />
          Finding available rooms...
        </div>
      ) : availableRooms.length > 0 ? (
        <RoomSearchResult results={availableRooms} onClearSearch={clearSearch} />
      ) : (
        !isLoading &&
        !errorMessage && (
          <p className="text-muted mt-3">No rooms available for the selected date and room type.</p>
        )
      )}

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
    </Container>
  );
};

export default RoomSearch; */



