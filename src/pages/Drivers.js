import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import CreateDriver from './drivers/CreateDriver'
import EditDriver from './drivers/EditDriver'

function Drivers({addDriver, drivers, setDrivers}) {

    // Driver id
    const [driverID, setDriverID] = useState()

    let getDrivers = async () => {
        let driversData = await fetch('http://localhost:4000/drivers')
        let json = await driversData.json()
        if(json) {
          console.log(json);
          setDrivers(json)
        }
      }

      useEffect(() => {
        getDrivers()
      }, [])
    
    // Modal
    const [show, setShow] = useState(false);

    // Edit a driver modal window
    const [editWindow, setEditWindow] = useState(false)
    const closeEditWindow = () => setEditWindow(false);

    const showEditWindow = () => setEditWindow(true)
        
    

    useEffect(() => {
        showEditWindow()
    }, [driverID])

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
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Truck Number</th>
                        <th>Trailer Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((item, index) => {
                            return (
                                <tr key={item._id}>
                                <td>{index}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.truckNumber}</td>
                                <td>{item.trailerNumber}</td>
                                <td>
                                    <FontAwesomeIcon
                                        id={item._id} 
                                        icon={faPenToSquare} 
                                        style={{ fontSize: '1.5em', marginRight: '30px', cursor: 'pointer' }} 
                                        onClick={() => setDriverID(item._id)} 
                                   
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
  )
}

export default Drivers