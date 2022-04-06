import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/esm/Table'
import Button from 'react-bootstrap/Button'

import CreateATruck from './trucklist/CreateATruck'
import ShowDetails from './trucklist/ShowDetails'
import AddALoad from './trucklist/AddAload'
import EditDriverOnList from './trucklist/EditDriverOnList'
import SidebarMenu from '../sidebarMenu/SidebarMenu'
import EditLoad from './trucklist/EditLoad'
import Delivered from './trucklist/Delivered'

function TruckList(
    {
        addATruck, trucklist, setTrucklist, drivers, loads, setLoads, addLoad, setDrivers, setUsers
    }) {
        const backendURL = process.env.REACT_APP_ENV === 'production' ? 'https://fleettab-backend.herokuapp.com/' : 'http://localhost:4000/'

    // Current date for header
    const dateToday = new Date()

    // Show Truck Info
    const [truckInfo, setTruckInfo] = useState()

    const [truckID, setTruckID] = useState()

    const [loadID, setLoadID] = useState()


    let getLoads = async () => {
        let loadsData = await fetch(backendURL + 'loads')
        let json = await loadsData.json()
        if (json) {
            setLoads(json)
        }
      }
  
      useEffect(() => {
        getLoads()
      }, [])

    let getTruckInfo = (...truck) => {
        setTruckInfo(truck[0])
        setTruckID(truck[1])
        // loads.map((load) => {
        //     if(truck[1] === load._id) {
        //         setLoadID(load) 
        //     } if(truck[1] !== load._id) {
        //         setLoadID('')
        //     }

        //     return loadID
        // })

        setLoadID('')
        // showAddALoadForm()
    }

    // get load id
    let getLoadInfo = (info) => {
        setLoadID(info)
        setTruckInfo('')
    }


    // Delivered Modal window
    const [deliveredModal, setDeliveredModal] = useState(false)
    const closeDeliveredModal = () => setDeliveredModal(false)
    const showDeliveredModal = (info) => {
        setLoadID(info)
        setDeliveredModal(true)
    }

    // Add a Load modal window
    const [addALoadForm, setAddALoadForm] = useState(false)
    const closeAddALoadForm = () => setAddALoadForm(false)
    const showAddALoadForm = () => {
        // setTruckInfo(info[0])
        // setTruckID(info[1])
        setAddALoadForm(true)
    }

    // Edit a driver modal window
    const [editWindow, setEditWindow] = useState(false)
    const closeEditWindow = () => setEditWindow(false);
    const showEditWindow = (...info) => {
        setTruckInfo(info[0])
        setTruckID(info[1])
        setEditWindow(true)
        setLoadID('')
    }
    // Edit a load modal window
    const [editLoadForm, setEditLoadForm] = useState(false)
    const closeEditLoadForm = () => setEditLoadForm(false)
    const showEditLoadForm = (info) => {
        setLoadID(info)
        setEditLoadForm(true)
    }

    // ? and : - is ternary operator
   
    function lastDelivery(truckNumber) {    
        let deliveryAddress= ''                                            
        if(loads) {
            loads.map((load) => {
                if(load.driverInfo && load.driverInfo.truckNumber === truckNumber && load.loadStatus === 'open'){
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
                if(load.driverInfo && load.driverInfo.truckNumber === truckNumber && load.loadStatus === 'open'){
                    let [lastStop] = load.stops.slice(-1)
                    deliveryDate= new Date(lastStop.date).toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})
                    
                } else return 'null'

                return deliveryDate;
            })

        } else return 'null'
        return deliveryDate;
    }

    function currentLoadNumber(truckNumber) {    
        let loadNumber= ''                                            
        if(loads) {
            loads.map((load) => {
                if(load.driverInfo && load.driverInfo.truckNumber === truckNumber && load.loadStatus === 'open'){
                    loadNumber = load.loadNumber
                   
                    
                } else return 'null'

                return loadNumber;
            })

        } else return 'null'
        return loadNumber;
    }

    // let getLoadId = (truck) => {
    //     setTruckInfo(truck)
    //     showAddALoadForm()

    // }

    function getLoadId(truckNumber) {    
        let loadId= ''                                            
        if(loads) {
            loads.map((load) => {
                if(load.driverInfo.truckNumber === truckNumber){
                    loadId = load._id
                    
                } else return 'null'

                return loadId;
            })

        } else return 'null'
        return loadId;
    }



 
  return (
    <div className='mx-0'>
{/*         
        <CreateATruck 
            createTruckForm={createTruckForm} 
            showCreateTruckForm={showCreateTruckForm} 
            closeCreateTruckForm={closeCreateTruckForm} 
            addATruck={addATruck}
            drivers={drivers}
        /> */}
        {truckInfo === undefined ? null :
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
            setDrivers={setDrivers}
            truckID={truckID}
            backendURL={backendURL}
        />
    }
        {truckInfo === undefined ? null :
        <EditDriverOnList 
                editWindow={editWindow}
                setEditWindow={setEditWindow}
                closeEditWindow={closeEditWindow}
            //  showEditWindow={showEditWindow}
                driverID={truckID}
                setDrivers={setDrivers}
                drivers={drivers}
                truckInfo={truckInfo}
                backendURL={backendURL}

            />
        }

        {loadID?(
        <EditLoad 
            editLoadForm={editLoadForm} 
            showEditLoadForm={showEditLoadForm} 
            closeEditLoadForm={closeEditLoadForm}
            addATruck={addATruck}
            drivers={drivers}
            loads={loads}
            setLoads={setLoads}
            addLoad={addLoad}
            truckInfo={truckInfo}
            setDrivers={setDrivers} 
            loadInfo={loadID}
            backendURL={backendURL}
        />
        ):null}
        <Delivered
            drivers={drivers}
            loads={loads}
            setLoads={setLoads}
            setDrivers={setDrivers}
            truckInfo={truckInfo}
            loadInfo={loadID} 
            deliveredModal={deliveredModal}
            closeDeliveredModal={closeDeliveredModal}
            backendURL={backendURL}
        />
     

        <div className='mx-0'>
            <SidebarMenu setUsers={setUsers} />
        </div>
        
        {loads?(
        <div className='mx-5 row'>
          
            
            <div style={{marginLeft: '15px'}}>
                <h1 className='todayDate'>{dateToday.toLocaleDateString('en-US', {weekday: 'long', month: 'long', day: '2-digit', year: 'numeric'})}</h1>
            </div>

            <div className='col d-inline'>

            {/* Loads */}
            <section className='coveredTrucks' style={{marginLeft: '15px'}}>
                <div className='mx-0' style={{backgroundColor: 'red'}}>
                    <h3 className='d-inline mx-4'>Orders</h3>
                    <button onClick={() => showAddALoadForm()} >Add New Order</button>
                </div>
                <Table  bordered hover >
                    <thead>
                        <tr>
                        <th>Load#</th>
                        <th>Truck#</th>
                        <th>Driver</th>
                        <th>Current Location</th>
                        <th>Origin</th>
                        <th>Pickup</th>
                        <th>Destination</th>
                        <th>Delivery</th>
                        <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loads.map((load, index) => {
                            if(load.loadStatus === 'open') {
                            const [lastStop] = load.stops.slice(-1)
                            const deliveryDate = new Date(lastStop.date)
                            const deliveryAddress = lastStop.stop   
                            const pickupDate = new Date(load.pickup.pickDate)  
                                return ( 
                                    <tr key={load._id} onClick={() => getLoadInfo(load)} style={load.driverInfo === null?{backgroundColor: '#D3D3D3'}:null}>
                                    <td>{load.loadNumber}</td>
                                    <td>{load.driverInfo ? load.driverInfo.truckNumber : ''}</td>
                                    <td>{load.driverInfo ? load.driverInfo.driver1.firstName + ' '+ load.driverInfo.driver1.lastName : ''}</td>
                                    <td>{load.driverInfo?load.driverInfo.currentLocation:''}</td>
                                    <td>{load.pickup.pickLocation}</td>
                                    <td>{pickupDate.toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})}</td>
                                    <td>{deliveryAddress}</td>
                                    <td>{deliveryDate.toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})}</td>  
                                    <td>{load.comment}</td>  
                                    <td colSpan={2} >
                                        <button variant="outline-primary" className='mx-4' id={load._id} onClick={() => showEditLoadForm(load._id)}>Edit Order</button>
                                        <button variant="outline-success" onClick={() => showDeliveredModal(load)}>Delivered</button>
                                    </td>                                  
                                    </tr>
                               )
                            }
                        })}

                        {loads.map((load, index) => {

                            if(load.driverInfo === '' && load.loadStatus === 'open') { 
                                const [lastStop] = load.stops.slice(-1)
                                const deliveryDate = new Date(lastStop.date)
                                const deliveryAddress = lastStop.stop 
                                const pickupDate = new Date(load.pickup.pickDate)
                                return ( 
                                    <tr key={load._id} onClick={() => getLoadInfo(load)} style={{backgroundColor: '#D3D3D3'}}>
                                    <td>{load.loadNumber}</td>
                                    <td>{load.driverInfo ? load.driverInfo.truckNumber : ''}</td>
                                    <td>{load.driverInfo ? load.driverInfo.driver1.firstName + ' '+ load.driverInfo.driver1.lastName : ''}</td>
                                    <td>{load.driverInfo.currentLocation}</td>
                                    <td>{load.pickup.pickLocation}</td>
                                    <td>{pickupDate.toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})}</td>
                                    <td>{deliveryAddress}</td>
                                    <td>{deliveryDate.toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})}</td>  
                                    <td>{load.comment}</td>  
                                    <td colSpan={2} >
                                        <button variant="outline-primary" className='mx-4' id={load._id} onClick={() => showEditLoadForm(load)}>Edit Order</button>
                                        <button variant="outline-success" onClick={() => showDeliveredModal(load)}>Delivered</button>
                                    </td>                                  
                                    </tr>
                               )
                            }   
                        })}

                        
                    </tbody>
                </Table>
            </section>

            {/* In Transit */}
            
            <section className='coveredTrucks' style={{marginLeft: '15px'}}>
                <div className='mx-0' style={{backgroundColor: 'green'}}>
                    <h3 className='d-inline mx-4'>Drivers</h3>

                </div>
                <Table  striped bordered hover>
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
                        <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver, index) => {
                            if (driver.status === 'Ready') {                     
                                return ( 
                                    <tr key={driver._id} onClick={() => getTruckInfo(driver, driver._id)}>
                                        <td>{currentLoadNumber(driver.truckNumber)}</td>
                                        <td>{driver.truckNumber}</td>
                                        <td>{driver.driver1.firstName} {driver.driver1.lastName}</td>
                                        <td style={{backgroundColor: '#c40606', color: 'white'}}>{driver.status}</td>
                                        <td>{driver.type}</td>
                                        <td>{driver.currentLocation}</td>                                    
                                        <td>{lastDelivery(driver.truckNumber)}</td>                                                                            
                                        <td>{lastDeliveryDate(driver.truckNumber)}</td>                                                                                                     
                                        <td>{driver.note}</td>
                                        <td colSpan={2} >
                                            <button variant="outline-primary" className='mx-4' id={driver._id} onClick={() => showEditWindow(driver, driver._id)}>Edit Truck</button>
                                            <button variant="outline-primary" className='mx-4' id={driver._id} onClick={showAddALoadForm}>New Order</button>
                                        </td>                                    
                                    </tr>
                               )
                            }                           
                        })}
                        {drivers.map((driver, index) => {
                            if (driver.status === 'On Duty') {                     
                                return ( 
                                    <tr key={driver._id} onClick={() => getTruckInfo(driver, driver._id)}>
                                        <td>{currentLoadNumber(driver.truckNumber)}</td>
                                        <td>{driver.truckNumber}</td>
                                        <td>{driver.driver1.firstName} {driver.driver1.lastName}</td>
                                        <td style={{backgroundColor: 'green', color: 'white'}}>{driver.status}</td>
                                        <td>{driver.type}</td>
                                        <td>{driver.currentLocation}</td>                                    
                                        <td>{lastDelivery(driver.truckNumber)}</td>                                                                            
                                        <td>{lastDeliveryDate(driver.truckNumber)}</td>                                                                                                     
                                        <td>{driver.note}</td>
                                        <td colSpan={2} >
                                            <button variant="outline-primary" className='mx-4' id={driver._id} onClick={() => showEditWindow(driver, driver._id)}>Edit Truck</button>
                                            {/* <button variant="outline-primary" className='mx-4' id={driver._id} onClick={() => getDriverID(driver)}>New Order</button> */}
                                            <button variant="outline-success">Delivered</button>
                                        </td>                                    
                                    </tr>
                               )
                            }                           
                        })}
                        {drivers.map((driver, index) => {
                            if (driver.status !== 'On Duty' && driver.status !== 'Ready') {                     
                                return ( 
                                    <tr key={driver._id} onClick={() => getTruckInfo(driver, driver._id)}>
                                        <td></td>
                                        <td>{driver.truckNumber}</td>
                                        <td>{driver.driver1.firstName} {driver.driver1.lastName}</td>
                                        <td style={{backgroundColor: '#E9967A'}}>{driver.status}</td>
                                        <td>{driver.type}</td>
                                        <td>{driver.currentLocation}</td>                                    
                                        <td>{lastDelivery(driver.truckNumber)}</td>                                                                            
                                        <td>{lastDeliveryDate(driver.truckNumber)}</td>                                                                                                     
                                        <td>{driver.note}</td>
                                        <td colSpan={2} >
                                            <button variant="outline-primary" className='mx-4' id={driver._id} onClick={() => showEditWindow(driver, driver._id)}>Edit Truck</button>
                                            <button variant="outline-primary" className='mx-4' id={driver._id} onClick={() => showAddALoadForm(driver, driver._id)}>New Order</button>

                                        </td>                                    
                                    </tr>
                               )
                            }                           
                        })}
                    </tbody>
                </Table>
            </section>
            </div>

            <div className='col-lg-3 col-md-6 col-sm-3 d-inline'>
                <div className='bg-dark'> hello</div>
                <ShowDetails 
                truckInfo={truckInfo} 
                loadInfo={loadID}
                loads={loads}
                setLoads={setLoads} 
                drivers={drivers}
                setDrivers={setDrivers}
                backendURL={backendURL}
                />
            </div> 
        </div>
        ): null}

    </div>
  )
}

export default TruckList