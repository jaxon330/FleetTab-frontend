import React from 'react'
import Table from 'react-bootstrap/esm/Table';

function ShowDetails({truckInfo}) {
    console.log(truckInfo);

  return (
      
    <div className='details'>
        <h4>Driver Info:</h4>
        <hr />
        <Table>
        {truckInfo?(
            <tbody>
                <tr><td>Driver: </td><td>{truckInfo.driver.firstName} {truckInfo.driver.lastName}</td></tr>
                <tr><td>Phone#: </td><td>{truckInfo.driver.phoneNumber}</td></tr>
                <tr><td>Truck#: </td><td>{truckInfo.driver.truckNumber}</td></tr>
                <tr><td>Trailer#: </td><td>{truckInfo.driver.trailerNumber}</td></tr>
                <tr><td>Current Location: </td><td>{truckInfo.location}</td></tr>
                <tr><td>Note :</td><td>{truckInfo.note}</td></tr>
            </tbody>
            ): null}
        </Table>
        <hr />
        <h4>Load Info:</h4>
        <hr />
        <Table>
        {truckInfo?(
            <tbody>
            
                <tr><td>Broker Company </td><td>{truckInfo.driver.firstName} {truckInfo.driver.lastName}</td></tr>
                <tr><td>Broker Load#</td><td>{truckInfo.driver.phoneNumber}</td></tr>
                <tr><td>Rate:</td><td>${truckInfo.driver.truckNumber}</td></tr>
                <tr><td>Empty mile:</td><td>{truckInfo.driver.trailerNumber}</td></tr>
                <tr><td>Loaded mile:</td><td>{truckInfo.location}</td></tr>
                <tr><td>Note :</td><td>{truckInfo.note}</td></tr>
                
            </tbody>
            ): null}
        </Table>

        <div className='text-center' style={{display: 'grid', gridAutoFlow: 'column', gridColumnGap: '10px'}}>
            <button>Edit</button>
            <button>Delete</button>
            <button>Edit Truck</button>
        </div>

    </div>
  )
}

export default ShowDetails