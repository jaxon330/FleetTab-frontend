import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function CreateDriver({handleClose, handleShow, show, setShow, addDriver}) {
    const [newDriver, setNewDriver] = useState({
        driver1: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            homeAddress: ''
        },
        driver2: {
            driver2FirstName: '',
            driver2LastName: '',
            driver2PhoneNumber: '',
            driver2HomeAddress: ''
        },
        truckNumber: '',
        trailerNumber: '',
        currentLocation: '',
        type: '',
        status: '',
        note: ''
    })

    const status = ['Ready', 'On Duty', 'In Transit', 'Off Duty']
    const fleetType = ['PO', 'VAN', 'PO/VAN', 'Reefer']

    const navigate = useNavigate()
    const goToDriversPage = () => navigate('/drivers')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let responce = await fetch('http://localhost:4000/drivers', {
            method: 'POST',
            body: JSON.stringify({
                driver1: {
                    firstName: newDriver.driver1.firstName,
                    lastName: newDriver.driver1.lastName,
                    phoneNumber: newDriver.driver1.phoneNumber,
                    homeAddress: newDriver.driver1.homeAddress
                },
                driver2: {
                    driver2FirstName: newDriver.driver2.driver2FirstName,
                    driver2LastName: newDriver.driver2.driver2LastName,
                    driver2PhoneNumber: newDriver.driver2.driver2PhoneNumber,
                    driver2HomeAddress: newDriver.driver2.driver2HomeAddress
                },
                truckNumber: newDriver.truckNumber,
                trailerNumber: newDriver.trailerNumber,
                currentLocation: newDriver.currentLocation,
                type: newDriver.type,
                status: newDriver.status,
                note: newDriver.note
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let createDriver = await responce.json()
        console.log(createDriver);
        addDriver(createDriver)
        handleClose()
        goToDriversPage()

    }
    const handleChange = (event) => {

        setNewDriver({...newDriver, [event.target.name]:event.target.value})
    }

    const handleChangeDriver1 = (event) => {
        console.log(newDriver);
        setNewDriver({ ...newDriver, driver1: {...newDriver.driver1, [event.target.name]:event.target.value}})
    }

    const handleChangeDriver2 = (event) => {
        console.log(newDriver);
        setNewDriver({ ...newDriver, driver2: {...newDriver.driver2, [event.target.name]:event.target.value}})
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
              <div className='row'>          
                <Form.Group className="col mb-3" controlId="formBasicName">
                    <Form.Label>Driver-1 </Form.Label>
                    <Form.Control className='mb-2' type="text" name='firstName' placeholder="First Name" onChange={handleChangeDriver1} value={newDriver.driver1.firstName} required />
                    <Form.Control className='mb-2' type="text" name='lastName' placeholder="Last Name" onChange={handleChangeDriver1} value={newDriver.driver1.lastName}  required />
                    <Form.Control className='mb-2' type="number" name='phoneNumber' placeholder="Phone Number" onChange={handleChangeDriver1} value={newDriver.driver1.phoneNumber}  required />
                    <Form.Control className='mb-2' type="text" name='homeAddress' placeholder="Home Address" onChange={handleChangeDriver1} value={newDriver.driver1.homeAddress} required />
                </Form.Group>

                <Form.Group className="col mb-3" controlId="formBasicLastName">
                    <Form.Label>Driver-2</Form.Label>
                    <Form.Control className='mb-2' type="text" name='driver2FirstName' placeholder="First Name" onChange={handleChangeDriver2} value={newDriver.driver2.firstName} />
                    <Form.Control className='mb-2' type="text" name='driver2LastName' placeholder="Last Name" onChange={handleChangeDriver2} value={newDriver.driver2.lastName}  />
                    <Form.Control className='mb-2' type="number" name='driver2PhoneNumber' placeholder="Phone Number" onChange={handleChangeDriver2} value={newDriver.driver2.phoneNumber}  />
                    <Form.Control className='mb-2' type="text" name='driver2HomeAddress' placeholder="Home Address" onChange={handleChangeDriver2} value={newDriver.driver2.homeAddress}  />
                </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Current location</Form.Label>
              <Form.Control className='mb-2' type="text" name='currentLocation' placeholder="City State, Zipcode" onChange={handleChange} value={newDriver.currentLocation}  />
            </Form.Group>
            <div className='row'>
                <Form.Group className="col mb-3" controlId="formBasicTruckNumber">
                <Form.Label>Truck Number</Form.Label>
                <Form.Control type="number" name='truckNumber' placeholder="Enter a Truck Number" onChange={handleChange} value={newDriver.truckNumber}  required />
                </Form.Group>
                <Form.Group className="col mb-3" controlId="formBasicTrailerNumber">
                <Form.Label>Trailer Number</Form.Label>
                <Form.Control type="number" name='trailerNumber' placeholder="Enter a Trailer Number" onChange={handleChange} value={newDriver.trailerNumber}  required />
                </Form.Group>
            </div>

                    {/* Status / Type ------------------- */}
                    <div className='row'>
              <Form.Group className='col mb-3'>  
                <Form.Select  name='status' onChange={handleChange} value={newDriver.status} required>
                <option value={null}>Select a Status</option>
                  {status.map((sts, index) => (
                    <option key={index} value={sts}>{sts}</option>
                  ))}
                  
                </Form.Select>
              </Form.Group>

              <Form.Group className='col mb-3'>  
                <Form.Select  name='type' onChange={handleChange} value={newDriver.type} required>
                <option value={null}>Select Type</option>
                  {fleetType.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}

                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="formBasicComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="textarea" name='note' placeholder="Leave a comment here" onChange={handleChange} value={newDriver.note}  />
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