import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Delivered({deliveredModal, closeDeliveredModal, loadInfo, truckInfo, setLoads, setDrivers, drivers, loads, backendURL}) {

  const [file, setFile] = useState('')
  const [comment, setComment] = useState('')

  let orderDelivered = async (e) => {
    e.preventDefault()
    let orderInfo = await fetch(backendURL + 'loads/edit/' + loadInfo._id, {
      method: 'PUT',
      body: JSON.stringify({
        driverInfo: loadInfo.driverInfo,
        invoiceNumber: loadInfo.invoiceNumber,
        loadNumber: loadInfo.loadNumber,
        companyName: loadInfo.companyName,
        rate: loadInfo.rate,
        emptyMilage: loadInfo.emptyMilage,
        loadedMilage: loadInfo.loadedMilage,
        comment: comment,
        loadStatus: 'closed',
        rateConfirmation: loadInfo.rateConfirmation,
        proofeOfDelivery: file,
        pickup: loadInfo.pickup,
        stops: loadInfo.stops
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let changeDriverStatus = await fetch(backendURL + 'drivers/edit/'+ loadInfo.driverInfo._id, {
      method: 'PUT',
      body: JSON.stringify({
          driver1: {
              firstName: loadInfo.driverInfo.driver1.firstName,
              lastName: loadInfo.driverInfo.driver1.lastName,
              phoneNumber: loadInfo.driverInfo.driver1.phoneNumber,
              homeAddress: loadInfo.driverInfo.driver1.homeAddress
          },
          driver2: {
              driver2FirstName: loadInfo.driverInfo.driver2.driver2FirstName,
              driver2LastName: loadInfo.driverInfo.driver2.driver2LastName,
              driver2PhoneNumber: loadInfo.driverInfo.driver2.driver2PhoneNumber,
              driver2HomeAddress: loadInfo.driverInfo.driver2.driver2HomeAddress
          },
          truckNumber: loadInfo.driverInfo.truckNumber,
          trailerNumber: loadInfo.driverInfo.trailerNumber,
          currentLocation: loadInfo.driverInfo.currentLocation,
          type: loadInfo.driverInfo.type,
          status: 'Ready',
          note: loadInfo.driverInfo.note
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })

  let updatedDriver = await changeDriverStatus.json()
  if (updatedDriver) {
      let data = drivers.map((driver) => {
          if (driver._id === updatedDriver._id) {
              return updatedDriver
          }
          return driver
      })
      setDrivers(data)
  }

  let createdLoad = await orderInfo.json()
  if (createdLoad) {
    let data = loads.map((load) => {
      if(load._id === createdLoad._id){
        return createdLoad
      }
      return load
    })
    setLoads(data)
  }
 



  closeDeliveredModal()
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  console.log(comment);

  const attacheFIle = (e) => {
    setFile({[e.target.name]: e.target.files[0]})
  }
  console.log(file);

  return (
    <div>
    <Modal show={deliveredModal} onHide={closeDeliveredModal}>
      <Form onSubmit={orderDelivered} >
          <Modal.Header closeButton>
            <Modal.Title id="order-food">Order Delivered</Modal.Title>
          </Modal.Header>
          <Modal.Body >

            <Form.Group className="mb-3 col" controlId="formBasicAddAfile">
                <Form.Label>Add a file</Form.Label>
                <Form.Control type="file" name='rateConfirmation' onChange={attacheFIle}  />
              </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="textarea" name='comment' placeholder="Leave a comment here" onChange={handleChange}  />
              
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeliveredModal} >
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}

export default Delivered