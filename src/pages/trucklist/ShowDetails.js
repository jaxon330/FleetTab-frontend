import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/esm/Table';

function ShowDetails({truckInfo, loadInfo, loads, setLoads, drivers, setDrivers}) {

            // Deleter route
  let deleteOrder = async () => {
      if(loadInfo.driverInfo){
            let changeDriverStatus = await fetch('http://localhost:4000/drivers/edit/'+ loadInfo.driverInfo._id, {
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
        }

    let data = await fetch('http://localhost:4000/loads/' + loadInfo._id , {
        method: 'DELETE',
        body: null,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log('data => '+data);
    let deletedOrder = await data.json()
    console.log('deletedOrder => '+ deletedOrder);
        if(deletedOrder) {
            let data = loads.filter((load) => (load._id !== deletedOrder._id))
            setLoads(data)
        }
    
  }


    function pickupTime(d) {
        let date = new Date(d)
        date = date.toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})
        return date
    }

  return (
      
    <div className='details'>
        <h4>Driver Info:</h4>
        <hr />
        <Table>
        {truckInfo ?(
            <tbody>
                <tr><td>Driver: </td><td>{truckInfo.driver1.firstName} {truckInfo.driver1.lastName}</td></tr>
                <tr><td>Driver2: </td><td>{truckInfo.driver2.driver2FirstName} {truckInfo.driver2.driver2LastName}</td></tr>
                <tr><td>Phone#: </td><td>{truckInfo.driver1.phoneNumber}</td></tr>
                <tr><td>Phone# 2: </td><td>{truckInfo.driver2.driver2PhoneNumber}</td></tr>
                <tr><td>Truck#: </td><td>{truckInfo.truckNumber}</td></tr>
                <tr><td>Trailer#: </td><td>{truckInfo.trailerNumber}</td></tr>
                <tr><td>Current Location: </td><td>{truckInfo.currentLocation}</td></tr>
                <tr><td>Note :</td><td>{truckInfo.note}</td></tr>
            </tbody>
            ): null}
        </Table>
        <hr />
        <h4>Order Info:</h4>
        <hr />
        <Table>
        {loadInfo ? (
            <tbody>
                <tr><td>Broker Company </td><td>{loadInfo.companyName}</td></tr>
                <tr><td>Broker Load#</td><td>{loadInfo.loadNumber}</td></tr>
                <tr><td>Rate:</td><td>${loadInfo.rate}</td></tr>
                <tr><td>Empty mile:</td><td>{loadInfo.emptyMilage}</td></tr>
                <tr><td>Loaded mile:</td><td>{loadInfo.loadedMilage}</td></tr>
                <tr><td>Note :</td><td>{loadInfo.comment}</td></tr>
                <tr><td>Pickup:</td><td>{loadInfo.pickup && loadInfo.pickup.pickLocation}</td><td>{pickupTime(loadInfo.pickup && loadInfo.pickup.pickDate)}</td></tr>
                {loadInfo.stops && loadInfo.stops.map((s) => {
                    const deliveryDate = new Date(s.date)
                    return (
                        <tr key={s._id}><td>Delivery:</td><td>{s.stop}</td><td>{deliveryDate.toLocaleDateString('us-US',{hour: 'numeric', minute: 'numeric'})}</td></tr>
                    )
                })}
                
            </tbody>
        ): null}
        </Table>

        <div className='text-center' style={{display: 'grid', gridAutoFlow: 'column', gridColumnGap: '10px'}}>
            <button>Edit</button>
            <button type='button' onClick={deleteOrder}>Delete</button>
            <button>Edit Truck</button>
        </div>

    </div>
  )
}

export default ShowDetails