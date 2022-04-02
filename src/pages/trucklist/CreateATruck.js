import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function CreateATruck(
  {
    addATruck, closeCreateTruckForm, createTruckForm, drivers, loads, setLoads, addLoad
  }) {

    const status = ['Ready', 'On Duty', 'In Transit', 'Off Duty']
    const fleetType = ['PO', 'VAN', 'PO/VAN', 'Reefer']

    const [newTruck, setNewTruck] = useState({
      driver: '',
      order: null,
      location: '',
      finalStop: '',
      dateTime: '',
      driverStatus: '',
      type: '',
      proofeOfDelivery: '',
      dispatch: '',
      note: ''
    })

    const navigate = useNavigate()
    const goToDriversPage = () => navigate('/')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let responce = await fetch('http://localhost:4000', {
            method: 'POST',
            body: JSON.stringify({
                driver: newTruck.driver,
                order: newTruck.order,
                location: newTruck.location,
                finalStop: newTruck.finalStop,
                dateTime: newTruck.dateTime,
                driverStatus: newTruck.driverStatus,
                type: newTruck.type,
                proofeOfDelivery: newTruck.proofeOfDelivery,
                dispatch: newTruck.dispatch,
                note: newTruck.note
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let createTruck = await responce.json()
        addATruck(createTruck)
        closeCreateTruckForm()

    }
    const handleChange = (event) => {
        setNewTruck({...newTruck, [event.target.name]:event.target.value})
    }



  return (
    <>

      <Modal show={createTruckForm} onHide={closeCreateTruckForm}>
      <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="order-food">Add A Truck</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          {/* Driver / Current Location */}
            <div className='row'>
              <Form.Group className='mb-3 col'>
              <Form.Label>Driver</Form.Label>
                <Form.Select aria-label="Default select example" name='driver' onChange={handleChange} value={newTruck.driver}>
                  <option value={null}>Select a Driver</option>
                  {drivers.map((driver, index) => {
                    return (
                      <option key={driver._id} value={driver._id}>{driver.firstName} {driver.lastName}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 col" controlId="formBasicLocation">
                <Form.Label>Current Location</Form.Label>
                <Form.Control type="text" name='location' placeholder="Enter Current Location" onChange={handleChange} value={newTruck.location}    required />
              </Form.Group>
            </div>

        {/* Status / Type ------------------- */}
            <div className='row'>
              <Form.Group className='col mb-3'>  
              <Form.Label className=''>Status</Form.Label>
                <Form.Select className='' aria-label="Default select example" name='driverStatus' onChange={handleChange} value={newTruck.driverStatus} required>
                <option value={null}>Select a Status</option>
                  {status.map((sts, index) => (
                    <option key={index} value={sts}>{sts}</option>
                  ))}
                  
                </Form.Select>
              </Form.Group>

              <Form.Group className='col mb-3'>  
              <Form.Label >Type</Form.Label>
                <Form.Select  name='type' onChange={handleChange} value={newTruck.type} required>
                <option value={null}>Select Type</option>
                  {fleetType.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}

                </Form.Select>
              </Form.Group>
            </div>
            
        {/* Final Stop /  Delivery Date ------------------*/}
            <div className='row'>
              <Form.Group className="mb-3 col" controlId="formBasicfinalStop">
                <Form.Label>Final Stop</Form.Label>
                <Form.Control type="text" name='finalStop' placeholder="City, State, ZipCode" onChange={handleChange} value={newTruck.finalStop}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicTrailerNumber">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control type="datetime-local" name='dateTime' onChange={handleChange} value={newTruck.dateTime}   />
              </Form.Group>
            </div>
            
            <Form.Group className="mb-3" controlId="formBasicComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="textarea" name='note' placeholder="Leave a comment here" onChange={handleChange} value={newTruck.note}  />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeCreateTruckForm}>
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

export default CreateATruck