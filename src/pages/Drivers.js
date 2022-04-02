import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import CreateDriver from './drivers/CreateDriver'
import EditDriver from './drivers/EditDriver'
import SidebarMenu from '../sidebarMenu/SidebarMenu'

function Drivers({addDriver, drivers, setDrivers}) {

    // Driver id
    const [driverID, setDriverID] = useState()

    // let getDrivers = async () => {
    //     let driversData = await fetch('http://localhost:4000/drivers')
    //     let json = await driversData.json()
    //     if(json) {
    //       console.log(json);
    //       setDrivers(json)
    //     }
    //   }

    //   useEffect(() => {
    //     getDrivers()
    //   }, [])
    
    // Modal
    const [show, setShow] = useState(false);

    // Edit a driver modal window
    const [editWindow, setEditWindow] = useState(false)
    const closeEditWindow = () => setEditWindow(false);

    const showEditWindow = () => setEditWindow(true)
        
    
    const getDriverID = (id) => {
        setDriverID(id)
        showEditWindow()
    }
    // useEffect(() => {
        
    // }, [driverID])

    // Create driver modal window
    const handleClose = () => setShow(false);
    const handleShow = (id) => setShow(true);


        // Deleter route
  let deleteDriver = async (id) => {
    let data = await fetch('http://localhost:4000/drivers/' + id , {
        method: 'DELETE',
        body: null,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let deletedDriver = await data.json()
    if(deletedDriver) {
        let data = drivers.filter((driver) => (driver._id !== deletedDriver._id))
        setDrivers(data)
    }
    
        }


  return (
    <div>
        <div className='mx-0'>
            <SidebarMenu  />
        </div>

        <div style={{marginLeft: '70px'}}>
            <h1>Drivers</h1>
            <div>
                <input type='search' name='search' />
                <Button variant="primary" onClick={handleShow}>
                    Add a Driver
                </Button>
                <CreateDriver 
                    handleClose={handleClose} 
                    handleShow={handleShow} 
                    show={show}
                    setShow={setShow}
                    addDriver={addDriver}
                 />
                 {driverID === undefined ? null : 
                 <EditDriver 
                     editWindow={editWindow}
                     setEditWindow={setEditWindow}
                     closeEditWindow={closeEditWindow}
                    //  showEditWindow={showEditWindow}
                     driverID={driverID}
                     setDrivers={setDrivers}
                     drivers={drivers}
                 />
                }
            </div>
            {drivers?(
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th className="align-middle">#</th>
                        <th className="align-middle">Driver</th>
                        <th className="align-middle">Phone Number</th>
                        <th className="align-middle">Truck Number</th>
                        <th className="align-middle">Trailer Number</th>
                        <th className="align-middle">Status</th>
                        <th className="align-middle">Type</th>
                        <th className="align-middle">Current Location</th>
                        <th className="align-middle">Home Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((item, index) => {
                            return (
                                <tr key={item._id} className="align-middle">
                                <td className="align-middle">{index}</td>
                                <td className="align-middle" >
                                    {item.driver1.firstName} {item.driver1.lastName} <br />
                                    {item.driver2 ? item.driver2.driver2FirstName+ ' ' + item.driver2.driver2LastName : ''}
                                </td>
                                <td className="align-middle">
                                    {item.driver1.phoneNumber} <br />
                                    {item.driver2 ? item.driver2.driver2PhoneNumber : ''}
                                </td>
                                <td className="align-middle">{item.truckNumber}</td>
                                <td className="align-middle">{item.trailerNumber}</td>
                                <td className="align-middle">{item.status}</td>
                                <td className="align-middle">{item.type}</td>
                                <td className="align-middle">{item.currentLocation}</td>
                                <td className="align-middle">
                                    {item.driver1.homeAddress} <br />
                                    {item.driver2 ? item.driver2.driver2HomeAddress : ''}
                                </td>
                                <td className="align-middle">
                                    <FontAwesomeIcon
                                        id={item._id} 
                                        icon={faPenToSquare} 
                                        style={{ fontSize: '1.5em', marginRight: '30px', cursor: 'pointer' }} 
                                        onClick={() => getDriverID(item._id)} 
                                   
                                    />
                                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.5em', cursor: 'pointer' }} onClick={() => deleteDriver(item._id)} />
                                    </td>
                                </tr>
                            )

                        })}

                    </tbody>
                </Table>
            ): null}
            </div>
    </div>
  )
}

export default Drivers