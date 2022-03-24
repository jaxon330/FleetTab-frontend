import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/esm/Table'
import Button from 'react-bootstrap/Button'

import CreateATruck from './trucklist/CreateATruck'
import ShowDetails from './trucklist/ShowDetails'
import AddALoad from './trucklist/AddAload'

function TruckList(
    {
        addATruck, trucklist, setTrucklist, drivers, loads, setLoads, addLoad
    }) {
     
    // Current date for header
    const dateToday = new Date()

    // Show Truck Info
    const [truckInfo, setTruckInfo] = useState()

    const [truckID, setTruckID] = useState()

    let getTruckList = async () => {
        let trucklistData = await fetch('http://localhost:4000')
        let json = await trucklistData.json()
        if (json) {
          setTrucklist(json)
        }
      }
  
      useEffect(() => {
        getTruckList()
      }, [])

    let getTruckInfo = (truck) => {
        setTruckInfo(truck)
    }

    console.log(truckID)
    // Add a Truck modal window
    const [createTruckForm, setCreateTruckForm] = useState(false)
    const showCreateTruckForm = () => setCreateTruckForm(true)
    const closeCreateTruckForm = () => setCreateTruckForm(false)

    // Add a Load modal window
    const [addALoadForm, setAddALoadForm] = useState(false)
    const showAddALoadForm = () => setAddALoadForm(true)
    const closeAddALoadForm = () => setAddALoadForm(false)


    let getTruckID = (truck) => {
        setTruckID(truck)
        showAddALoadForm()

    }

 
  return (
    <div className='mx-0'>
        <CreateATruck 
            createTruckForm={createTruckForm} 
            showCreateTruckForm={showCreateTruckForm} 
            closeCreateTruckForm={closeCreateTruckForm} 
            addATruck={addATruck}
            drivers={drivers}
        />

        <AddALoad 
            addALoadForm={addALoadForm} 
            showAddALoadForm={showAddALoadForm} 
            closeAddALoadForm={closeAddALoadForm} 
            addATruck={addATruck}
            drivers={drivers}
            loads={loads}
            setLoads={setLoads}
            addLoad={addLoad}
            truckInfo={truckInfo}
        />

        
        {trucklist?(
        <div className='mx-0 px-0 row'>
            <div>
                <h1 className='todayDate'>{dateToday.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: '2-digit', year: 'numeric'})}</h1>
            </div>

            <div className='col d-inline'>
            <section className='coveredTrucks'>
                <div className='mx-0' style={{backgroundColor: 'orange'}}>
                    <h3 className='d-inline mx-4'>Covered Trucks</h3>
                    <button onClick={showCreateTruckForm}>Add a Truck</button>
                </div>
                <Table  bordered hover>
                    <thead>
                        <tr>
                        <th>Load#</th>
                        <th>Truck#</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Current Location</th>
                        <th>Final Stop</th>
                        <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td colSpan={2} >
                            <button variant="outline-primary" className='mx-4'>Add Load</button>
                            <button variant="outline-success">Delivered</button>
                        </td>
                        
                        </tr>
                    </tbody>
                </Table >
            </section>

            {/* Ready Trucks */}
            <section className='coveredTrucks'>
                <div className='mx-0' style={{backgroundColor: 'red'}}>
                    <h3 className='d-inline mx-4'>Ready Trucks</h3>
                    <button onClick={showCreateTruckForm} >Add a Truck</button>
                </div>
                <Table  bordered hover >
                    <thead>
                        <tr>
                        <th>Load#</th>
                        <th>Truck#</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Current Location</th>
                        <th>Final Stop</th>
                        <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trucklist.map((truck, index) => {
                            // const deliveryDate = new Date(truck.order.stops[1].date)
                            // const deliveryAddress = truck.order.stops[1].stop
                            if (truck.driverStatus === 'Ready') {
                                return ( 
                                    <tr key={truck._id} onClick={() => getTruckInfo(truck)}>
                                    <td>{index}</td>
                                    <td>{truck.driver ? truck.driver.truckNumber : ''}</td>
                                    <td>{truck.driver ? truck.driver.firstName : ''}</td>
                                    <td>{truck.driverStatus}</td>
                                    <td>{truck.type}</td>
                                    <td>{truck.location}</td>
                                    <td>
                                        {/* {truck.order ? deliveryAddress : null} */}
                                        </td>
                                    <td>
                                        {/* {truck.order ? deliveryDate.toLocaleDateString() : null} */}
                                        </td>
                                    <td colSpan={2} >
                                        <button variant="outline-primary" className='mx-4' id={truck._id} onClick={showAddALoadForm}>Add Load</button>
                                        <button variant="outline-success">Delivered</button>
                                    </td>
                                    
                                    </tr>
                               )
                            } 
                            // else {
                            //     return (
                            //         <tr>
                            //         <td>1</td>
                            //         <td>Mark</td>
                            //         <td>Otto</td>
                            //         <td>@mdo</td>
                            //         <td colSpan={2} >
                            //             <button variant="outline-primary" className='mx-4'>Add Load</button>
                            //             <button variant="outline-success">Delivered</button>
                            //         </td>
                                    
                            //         </tr>
                            //     )

                            // }
                        })}
                    </tbody>
                </Table>
            </section>

            {/* In Transit */}
            <section className='coveredTrucks'>
                <div className='mx-0' style={{backgroundColor: 'green'}}>
                    <h3 className='d-inline mx-4'>In Transit</h3>
                    <button onClick={showCreateTruckForm} >Add a Truck</button>
                </div>
                <Table  bordered hover>
                    <thead>
                        <tr>
                        <th>Load#</th>
                        <th>Truck#</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Current Location</th>
                        <th>Final Stop</th>
                        <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td colSpan={2} >
                            <button variant="outline-primary" className='mx-4'>Add Load</button>
                            <button variant="outline-success">Delivered</button>
                        </td>
                        
                        </tr>
                    </tbody>
                </Table>
            </section>

            {/* Off Duty */}
            <section className='coveredTrucks'>
                <div className='mx-0' style={{backgroundColor: 'darksalmon'}}>
                    <h3 className='d-inline mx-4'>Off Duty</h3>
                    <button onClick={showCreateTruckForm} >Add a Truck</button>
                </div>
                <Table  bordered hover>
                    <thead>
                        <tr>
                        <th>Load#</th>
                        <th>Truck#</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Current Location</th>
                        <th>Final Stop</th>
                        <th>Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td colSpan={2} >
                            <button variant="outline-primary" className='mx-4'>Add Load</button>
                            <button variant="outline-success">Delivered</button>
                        </td>
                        
                        </tr>
                    </tbody>
                </Table>
            </section>
            </div>

             <div className='col-lg-3 col-md-6 col-sm-3 d-inline'>
                <div className='bg-dark'> hello</div>
    
            <ShowDetails truckInfo={truckInfo}/>
  
            </div> 
        </div>
        ): null}
    </div>
  )
}

export default TruckList