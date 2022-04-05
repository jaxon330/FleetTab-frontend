import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../css/styles.css'


function AddALoad(
    {
      addALoadForm,
       closeAddALoadForm,
        showAddALoadForm, 
        truckInfo,
         drivers,
          loads, 
          setLoads, 
          addLoad,
          setDrivers,
          truckID
    }) {
  
      const status = ['Ready', 'On Duty', 'In Transit', 'Off Duty']
      const fleetType = ['PO', 'VAN', 'PO/VAN', 'Reefer']
      const [extraStop, setExtraStop] = useState([{stop:'', date:''}])
      const [pickupInfo, setPickupInfo] = useState({pickLocation:'', pickDate: ''})
      const [file, setFile] = useState('')
      const [newLoad, setNewLoad] = useState({
        driverInfo: truckID,
        invoiceNumber: '',
        loadNumber: '',
        companyName: '',
        rate: '',
        emptyMilage: '',
        loadedMilage: '',
        comment: '',
        loadStatus: 'open',
        rateConfirmation: '',
        proofeOfDelivery: '',
        pickup: pickupInfo,
        stops: extraStop
  
      })

      useEffect(() => {

      })
  

      let handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch('http://localhost:4000/loads', {
          method: 'POST',
          body: JSON.stringify({
            driverInfo: truckID,
            invoiceNumber: newLoad.invoiceNumber,
            loadNumber: newLoad.loadNumber,
            companyName: newLoad.companyName,
            rate: newLoad.rate,
            emptyMilage: newLoad.emptyMilage,
            loadedMilage: newLoad.loadedMilage,
            comment: newLoad.comment,
            loadStatus: 'open',
            rateConfirmation: file,
            proofeOfDelivery: newLoad.proofeOfDelivery,
            pickup: pickupInfo,
            stops: newLoad.stops
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let changeDriverStatus = await fetch('http://localhost:4000/drivers/edit/'+ truckID, {
            method: 'PUT',
            body: JSON.stringify({
                driver1: {
                    firstName: truckInfo.driver1.firstName,
                    lastName: truckInfo.driver1.lastName,
                    phoneNumber: truckInfo.driver1.phoneNumber,
                    homeAddress: truckInfo.driver1.homeAddress
                },
                driver2: {
                    driver2FirstName: truckInfo.driver2.driver2FirstName,
                    driver2LastName: truckInfo.driver2.driver2LastName,
                    driver2PhoneNumber: truckInfo.driver2.driver2PhoneNumber,
                    driver2HomeAddress: truckInfo.driver2.driver2HomeAddress
                },
                truckNumber: truckInfo.truckNumber,
                trailerNumber: truckInfo.trailerNumber,
                currentLocation: truckInfo.currentLocation,
                type: truckInfo.type,
                status: 'On Duty',
                note: truckInfo.note
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
       

        let createdLoad = await response.json()
        console.log(createdLoad);
        addLoad(createdLoad)
       

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
        closeAddALoadForm()
        window.location.reload(true);
        // setNewLoad({
        //   driverInfo: truckID,
        //   invoiceNumber: '',
        //   loadNumber: '',
        //   companyName: '',
        //   rate: '',
        //   emptyMilage: '',
        //   loadedMilage: '',
        //   comment: '',
        //   loadStatus: '',
        //   rateConfirmation: '',
        //   proofeOfDelivery: '',
        //   pickup: pickupInfo,
        //   stops: extraStop
        // })
        // setPickupInfo({stop:'', date:''})
        // setPickupInfo({pickLocation:'', pickDate: ''})
      }
  

    
    const handleChange = (event) => {
        setNewLoad({...newLoad, [event.target.name]:event.target.value})
    }

    const attacheFIle = (e) => {
      setFile({[e.target.name]: e.target.files[0]})
    }

    const handlePickupChange = (e) => {
      setPickupInfo({...pickupInfo, [e.target.name]:e.target.value})
    }

    const handleChangeExtra = (e, index) => {
      const { name, value } = e.target
      const list = [...extraStop]
      list[index][name] = value
      setExtraStop(list)
    }
    const handleExtraStop = () => {
      setExtraStop([...extraStop, {stop:'', date:''}])
    }

    const handleExtraRemove = (index) => {
      const list = [...extraStop]
      list.splice(index, 1)
      setExtraStop(list)
    }

    console.log(truckID);
    console.log(truckInfo);

  return (
    <>

      <Modal show={addALoadForm} onHide={closeAddALoadForm} >
      <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="order-food">New Order</Modal.Title>
          </Modal.Header>
          <Modal.Body >

          {/* Driver / Current Location */}
            <div className='row'>

              {/* <Form.Group className='mb-3 col'>
              <Form.Label>Driver</Form.Label>
              
                <Form.Select aria-label="Default select example" name='driver' onChange={handleChange} value={newLoad.driver}>
                  <option value={null}>Select a Driver</option>
                  {drivers.map((driver, index) => {
                    if(driver.truckNumber === truckInfo?truckInfo.truckNumber:'null' ) 
                    return (
                      <option key={driver._id} value={driver._id}>{driver.driver1.firstName} {driver.driver1.lastName}</option>
                    )
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 col" controlId="formBasicLocation">
                <Form.Label>Current Location</Form.Label>
                <Form.Control type="text" name='location' placeholder="Enter Current Location" onChange={handleChange} value={newLoad.location}    required />
              </Form.Group> */}
            </div>

        {/* Status / Type ------------------- */}
            <div className='row'>
              {/* <Form.Group className='col mb-3'>  
              <Form.Label className=''>Status</Form.Label>
                <Form.Select className='' aria-label="Default select example" name='driverStatus' onChange={handleChange} value={newLoad.driverStatus} required>
                <option value={null}>Select a Status</option>
                  {status.map((sts, index) => (
                    <option key={index} value={sts}>{sts}</option>
                  ))}
                  
                </Form.Select>
              </Form.Group>

              <Form.Group className='col mb-3'>  
              <Form.Label >Type</Form.Label>
                <Form.Select  name='type' onChange={handleChange} value={newLoad.type} required>
                <option value={null}>Select Type</option>
                  {fleetType.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}

                </Form.Select>
              </Form.Group> */}
            </div>

            <div className='row mb-3'>
              <h4>Driver: {truckInfo?`${truckInfo.driver1.firstName} ${truckInfo.driver1.lastName}`:'null'}</h4>
              <h5>Truck#: {truckInfo?`${truckInfo.truckNumber}`:'null'}</h5>
              <hr/>


            </div>

            <div className='row'>
             
            <Form.Group className="mb-3 col" controlId="formBasicloadNumber">
                <Form.Label>Order Number</Form.Label>
                <Form.Control type="text" name='loadNumber' placeholder="Enter order's number" onChange={handleChange} value={newLoad.loadNumber}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicCompanyName">
                <Form.Label>Broker Company</Form.Label>
                <Form.Control type="text" name='companyName' placeholder="Company name" onChange={handleChange} value={newLoad.companyName}   />
              </Form.Group>

            </div>

            <div className='row'>
            <Form.Group className="mb-3 col" controlId="formBasicrate">
                <Form.Label>Rate</Form.Label>
                <Form.Control type="Number" name='rate' placeholder="$" onChange={handleChange} value={newLoad.rate}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicLoadedMilage">
                <Form.Label>Milage</Form.Label>
                <Form.Control type="number" name='loadedMilage' placeholder="" onChange={handleChange} value={newLoad.loadedMilage}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicrate">
                <Form.Label>Empty Milage</Form.Label>
                <Form.Control type="Number" name='emptyMilage' placeholder="" onChange={handleChange} value={newLoad.emptyMilage}   />
              </Form.Group>
            </div>
            
        {/* Final Stop /  Delivery Date ------------------*/}
            <div className='row'>
              <Form.Group className="mb-3 col" controlId="formBasicpickup">
                <Form.Label>PU</Form.Label>
                <Form.Control type="text" name='pickLocation' placeholder="City, State, ZipCode" onChange={handlePickupChange} value={pickupInfo.pickLocation}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicPickupDate">
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control type="datetime-local" name='pickDate' onChange={handlePickupChange} value={pickupInfo.pickDate}   />
              </Form.Group>
            </div>
            
            {extraStop.map((destination, index) => (
            <div className='row' key={index}>
              <Form.Group className="mb-3 col" controlId="formBasicDelivery">
                <Form.Label>Del</Form.Label>
                <Form.Control type="text" name='stop' placeholder="City, State, ZipCode" onChange={(e)=> handleChangeExtra(e, index)} value={extraStop.stop}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicDelivery">
                <Form.Label>Delivery Date</Form.Label>
                <Form.Control type="datetime-local" name='date' onChange={(e)=> handleChangeExtra(e, index)} value={extraStop.date}   />
                {extraStop.length > 1 && (
                  <div className='text-right '><Button className='text-right' variant="warning" onClick={() => handleExtraRemove(index)}>Remove</Button></div>
                )}
              </Form.Group>

            </div>
            ))}
            <Form.Group className="mb-3 col" controlId="formBasicAddAfile">
                <Form.Label>Add a file</Form.Label>
                <Form.Control type="file" name='rateConfirmation' onChange={attacheFIle}    />
              </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="textarea" name='comment' placeholder="Leave a comment here" onChange={handleChange} value={newLoad.comment}  />
              
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
          <Button variant="info" onClick={handleExtraStop}>
              Add a Stop
            </Button>
            <Button variant="secondary" onClick={closeAddALoadForm}>
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

export default AddALoad