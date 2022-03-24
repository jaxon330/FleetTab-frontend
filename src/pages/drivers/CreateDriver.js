import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function CreateDriver({handleClose, handleShow, show, setShow, addDriver}) {
    const [newDriver, setNewDriver] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        truckNumber: '',
        trailerNumber: ''
    })

    const navigate = useNavigate()
    const goToDriversPage = () => navigate('/drivers')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let responce = await fetch('http://localhost:4000/drivers', {
            method: 'POST',
            body: JSON.stringify({
                firstName: newDriver.firstName,
                lastName: newDriver.lastName,
                phoneNumber: newDriver.phoneNumber,
                truckNumber: newDriver.truckNumber,
                trailerNumber: newDriver.trailerNumber
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let createDriver = await responce.json()
        addDriver(createDriver)
        handleClose()
        goToDriversPage()

    }
    const handleChange = (event) => {
        setNewDriver({...newDriver, [event.target.name]:event.target.value})
    }


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="order-food">New Driver</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name='firstName' placeholder="First Name" onChange={handleChange} value={newDriver.firstName} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name='lastName' placeholder="Last Name" onChange={handleChange} value={newDriver.lastName}  required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="number" name='phoneNumber' placeholder="Phone Number" onChange={handleChange} value={newDriver.phoneNumber}  required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTruckNumber">
              <Form.Label>Truck Number</Form.Label>
              <Form.Control type="number" name='truckNumber' placeholder="Truck Number" onChange={handleChange} value={newDriver.truckNumber}  required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTrailerNumber">
              <Form.Label>Trailer Number</Form.Label>
              <Form.Control type="number" name='trailerNumber' placeholder="Trailer Number" onChange={handleChange} value={newDriver.trailerNumber}  required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default CreateDriver