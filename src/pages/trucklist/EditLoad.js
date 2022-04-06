import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import '../../css/styles.css'


function EditLoad(
    {
      editLoadForm,
       closeEditLoadForm,
        showEditLoadForm, 
        truckInfo,
         drivers,
          loads, 
          setLoads, 
          addLoad,
          setDrivers,
          loadInfo,
          backendURL

    }) {
  
      const status = ['Ready', 'On Duty', 'In Transit', 'Off Duty']
      const fleetType = ['PO', 'VAN', 'PO/VAN', 'Reefer']
      const [extraStop, setExtraStop] = useState([{stop:loadInfo.stops.stop, date:loadInfo.stops.date}])
      const [pickupInfo, setPickupInfo] = useState({pickLocation:loadInfo.pickup.pickLocation, pickDate: loadInfo.pickup.pickDate})
      const [editLoad, setEditLoad] = useState({
        driverInfo: loadInfo.driverInfo._id,
        invoiceNumber: loadInfo.invoiceNumber,
        loadNumber: loadInfo.loadNumber,
        companyName: loadInfo.companyName,
        rate: loadInfo.rate,
        emptyMilage: loadInfo.emptyMilage,
        loadedMilage: loadInfo.loadedMilage,
        comment: loadInfo.comment,
        loadStatus: loadInfo.loadStatus,
        rateConfirmation: loadInfo.rateConfirmation,
        proofeOfDelivery: loadInfo.proofeOfDelivery,
        pickup: pickupInfo,
        stops: extraStop
  
      })

  

      let handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch(backendURL+ 'loads/edit/' + loadInfo._id, {
          method: 'PUT',
          body: JSON.stringify({
            driverInfo: editLoad.driverInfo,
            invoiceNumber: editLoad.invoiceNumber,
            loadNumber: editLoad.loadNumber,
            companyName: editLoad.companyName,
            rate: editLoad.rate,
            emptyMilage: editLoad.emptyMilage,
            loadedMilage: editLoad.loadedMilage,
            comment: editLoad.comment,
            loadStatus: 'open',
            rateConfirmation: editLoad.rateConfirmation,
            proofeOfDelivery: editLoad.proofeOfDelivery,
            pickup: editLoad.pickup,
            stops: editLoad.stops
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // if(truckInfo){
        let changeDriverStatus = await fetch(backendURL + 'drivers/edit/'+ truckInfo._id, {
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
                status: 'On Duty',
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
       
      // }
      let createdLoad = await response.json()
      if (createdLoad) {
        let data = loads.map((load) => {
          if(load._id === createdLoad._id){
            return createdLoad
          }
          return load
        })
        setLoads(data)
      }

        closeEditLoadForm()
      }
  

    
    const handleChange = (event) => {
        setEditLoad({...editLoad, [event.target.name]:event.target.value})
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


  return (
    <>

      <Modal show={editLoadForm} onHide={closeEditLoadForm} >
      <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="order-food">Edit Order</Modal.Title>
          </Modal.Header>
          <Modal.Body >

          {/* Driver / Current Location */}
            {/* <div className='row'>

              <Form.Group className='mb-3 col'>
              <Form.Label>Driver</Form.Label>
              
                <Form.Select aria-label="Default select example" name='driver' onChange={handleChange} value={editLoad.driver}>
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
                <Form.Control type="text" name='location' placeholder="Enter Current Location" onChange={handleChange} value={editLoad.location}    required />
              </Form.Group>
            </div> */}

        {/* Status / Type ------------------- */}
            <div className='row'>
              {/* <Form.Group className='col mb-3'>  
              <Form.Label className=''>Status</Form.Label>
                <Form.Select className='' aria-label="Default select example" name='driverStatus' onChange={handleChange} value={editLoad.driverStatus} required>
                <option value={null}>Select a Status</option>
                  {status.map((sts, index) => (
                    <option key={index} value={sts}>{sts}</option>
                  ))}
                  
                </Form.Select>
              </Form.Group>

              <Form.Group className='col mb-3'>  
              <Form.Label >Type</Form.Label>
                <Form.Select  name='type' onChange={handleChange} value={editLoad.type} required>
                <option value={null}>Select Type</option>
                  {fleetType.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}

                </Form.Select>
              </Form.Group> */}
            </div>

            <div className='row mb-3'>
              <h4>Driver: {loadInfo.driverInfo?`${loadInfo.driverInfo.driver1.firstName} ${loadInfo.driverInfo.driver1.lastName}`:'null'}</h4>
              <h5>Truck#: {loadInfo.driverInfo?`${loadInfo.driverInfo.truckNumber}`:'null'}</h5>
              <hr/>


            </div>

            <div className='row'>
             
            <Form.Group className="mb-3 col" controlId="formBasicloadNumber">
                <Form.Label>Order Number</Form.Label>
                <Form.Control type="text" name='loadNumber' placeholder="Enter order's number" onChange={handleChange} value={editLoad.loadNumber}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicCompanyName">
                <Form.Label>Broker Company</Form.Label>
                <Form.Control type="text" name='companyName' placeholder="Company name" onChange={handleChange} value={editLoad.companyName}   />
              </Form.Group>

            </div>

            <div className='row'>
            <Form.Group className="mb-3 col" controlId="formBasicrate">
                <Form.Label>Rate</Form.Label>
                <Form.Control type="Number" name='rate' placeholder="$" onChange={handleChange} value={editLoad.rate}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicLoadedMilage">
                <Form.Label>Milage</Form.Label>
                <Form.Control type="number" name='loadedMilage' placeholder="" onChange={handleChange} value={editLoad.loadedMilage}   />
              </Form.Group>
              <Form.Group className="mb-3 col" controlId="formBasicrate">
                <Form.Label>Empty Milage</Form.Label>
                <Form.Control type="Number" name='emptyMilage' placeholder="" onChange={handleChange} value={editLoad.emptyMilage}   />
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
                <Form.Control type="file" name='rateConfirmation' onChange={handleChange} value={editLoad.rateConfirmation}   />
              </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control type="textarea" name='comment' placeholder="Leave a comment here" onChange={handleChange} value={editLoad.comment}  />
              
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" onClick={handleExtraStop}>
              Add a Stop
            </Button>
            <Button variant="secondary" onClick={closeEditLoadForm}>
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

export default EditLoad