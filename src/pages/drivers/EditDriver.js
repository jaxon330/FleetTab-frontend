import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function EditDriver({ editWindow, closeEditWindow, showEditWindow, setEditWindow, drivers, setDrivers, driverID}) {
    const [driver, setDriver] = useState(
        {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        truckNumber: '',
        trailerNumber: ''
    })

    const {id} = useParams()
    
    useEffect(() => {
        fetch('http://localhost:4000/drivers/'+ driverID)
        .then((res) => res.json())
        .then((resJson) => {
            console.log(resJson);
            setDriver(resJson)
        })
        .catch(error => console.error({'Error': error}))
    }, [driverID])

    const navigate = useNavigate()
    const goToDriversPage = () => navigate('/drivers')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let responce = await fetch('http://localhost:4000/drivers/edit/'+ driverID, {
            method: 'PUT',
            body: JSON.stringify({
                firstName: driver.firstName,
                lastName: driver.lastName,
                phoneNumber: driver.phoneNumber,
                truckNumber: driver.truckNumber,
                trailerNumber: driver.trailerNumber
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let updatedDriver = await responce.json()
        if (updatedDriver) {
            let data = drivers.map((driver) => {
                if (driver._id === updatedDriver._id) {
                    return updatedDriver
                }
                return driver
            })
            setDrivers(data)
            closeEditWindow()
        }
        


    }
    const handleChange = (event) => {
        setDriver({...driver, [event.target.name]:event.target.value})
    }


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={editWindow} onHide={closeEditWindow}>
      {/* {driverID !== null ? ( */}
      <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="order-food">Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name='firstName' placeholder="First Name" onChange={handleChange} value={driver.firstName} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name='lastName' placeholder="Last Name" onChange={handleChange} value={driver.lastName}  required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" name='phoneNumber' placeholder="Phone Number" onChange={handleChange} value={driver.phoneNumber}  required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTruckNumber">
              <Form.Label>Truck Number</Form.Label>
              <Form.Control type="number" name='truckNumber' placeholder="Truck Number" onChange={handleChange} value={driver.truckNumber}  required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTrailerNumber">
              <Form.Label>Trailer Number</Form.Label>
              <Form.Control type="number" name='trailerNumber' placeholder="Trailer Number" onChange={handleChange} value={driver.trailerNumber}  required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditWindow}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
        {/* ) : null} */}
      </Modal>
    </>
  )
}

export default EditDriver