import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from '../sidebarMenu/SidebarMenu'

function History({drivers, loads}) {

    function lastDelivery(truckNumber) {    
        let deliveryAddress= ''                                            
        if(loads) {
            loads.map((load) => {
                if(load.driverInfo && load.driverInfo.truckNumber === truckNumber){
                    let [lastStop] = load.stops.slice(-1)
                     deliveryAddress= lastStop.stop
                    
                } else return 'null'

                return deliveryAddress;
            })

        } else return 'null'
        return deliveryAddress;
    }

       
    function lastDeliveryDate(truckNumber) {    
        let deliveryDate= ''                                            
        if(loads) {
            loads.map((load) => {
                if(load.driverInfo && load.driverInfo.truckNumber === truckNumber){
                    let [lastStop] = load.stops.slice(-1)
                    deliveryDate= new Date(lastStop.date).toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})
                    
                } else return 'null'

                return deliveryDate;
            })

        } else return 'null'
        return deliveryDate;
    }
  return (
    <div>
    <div className='mx-0'>
        <SidebarMenu  />
    </div>

    <div style={{marginLeft: '70px'}}>
        <h1>History</h1>
        <div>
            {/* <input type='search' name='search' />
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
            } */}
        </div>
        
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th className="align-middle">Load#</th>
                    <th className="align-middle">Truck#</th>
                    <th className="align-middle">Driver</th>
                    <th className="align-middle">Current Location</th>
                    <th className="align-middle">From</th>
                    <th className="align-middle">Date</th>
                    <th className="align-middle">To</th>
                    <th className="align-middle">Date</th>
                    <th className="align-middle">Empty Milage</th>
                    <th className="align-middle">Loaded Milage</th>
                    <th className="align-middle">Rate</th>
                    <th className="align-middle">Company</th>
                    <th className="align-middle">Dispatch</th>
                    </tr>
                </thead>
                <tbody>
                {loads?
                    loads.map((item, index) => {
                        return (
                            <tr key={item._id} className="align-middle">
                            <td className="align-middle">{item.loadNumber}</td>
                            <td className="align-middle">{item.driverInfo.truckNumber}</td>
                            <td className="align-middle" >
                                {item.driverInfo.driver1.firstName} {item.driverInfo.driver1.lastName} <br />
                                {item.driverInfo.driver2 ? item.driverInfo.driver2.driver2FirstName+ ' ' + item.driverInfo.driver2.driver2LastName : ''}
                            </td>
                            <td className="align-middle">{item.driverInfo.currentLocation}</td>
                            <td className="align-middle">{item.pickup.pickLocation}</td>
                            <td className="align-middle">{item.pickup.pickDate}</td>
                            <td className="align-middle">{lastDelivery(item.driverInfo.truckNumber)}</td>
                            <td className="align-middle">{lastDeliveryDate(item.driverInfo.truckNumber)}</td>
                            <td className="align-middle">{item.emptyMilage}</td>
                            <td className="align-middle">{item.loadedMilage}</td>
                            <td className="align-middle">{item.rate}</td>
                            <td className="align-middle">{item.companyName}</td>
                            <td className="align-middle">{item.dispatch}</td>
                            {/* <td className="align-middle">
                                <FontAwesomeIcon
                                    id={item._id} 
                                    icon={faPenToSquare} 
                                    style={{ fontSize: '1.5em', marginRight: '30px', cursor: 'pointer' }} 
                                    onClick={() => getDriverID(item._id)} 
                               
                                />
                                <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.5em', cursor: 'pointer' }} onClick={() => deleteDriver(item._id)} />
                                </td> */}
                            </tr>
                        )

                    }): null}
                    
                </tbody>
            </Table>
        
        </div>
</div>
  )
}

export default History