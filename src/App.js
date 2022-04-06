import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SidebarMenu from './sidebarMenu/SidebarMenu';
import TruckList from './pages/TruckList';
import Drivers from './pages/Drivers';
import Register from './pages/sessions/Register';
import Login from './pages/sessions/Login';
import History from './pages/History';


function App() {
  const [drivers, setDrivers] = useState([])
  const [trucklist, setTrucklist] = useState([])
  const [loads, setLoads] = useState([])
  const [users, setUsers] = useState([])


  const backendURL = process.env.REACT_APP_ENV === 'production' ? 'https://fleettab-backend.herokuapp.com/' : 'http://localhost:4000/'

  // ------------------- Drivers routes -----------------------

  console.log(backendURL);
  let getDrivers = async () => {

    let driversData = await fetch(backendURL + 'drivers')
    let json = await driversData.json()
    if(json) {
      setDrivers(json)
    }
  }

      useEffect(() => {
        getDrivers()
    }, [])


  let addDriver = (driver) => {
    setDrivers([...drivers, driver ])
  }

  // ----------------- Truck list ----------------------------

    // let getTruckList = async () => {
    //   let trucklistData = await fetch('http://localhost:4000')
    //   let json = await trucklistData.json()
    //   if (json) {
    //     setTrucklist(json)
    //   }
    // }

    let addATruck = (truck) => {
      setTrucklist([...trucklist, truck])
    }

  // ---------------- Add a Load -----------------------


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


    let addLoad = (load) => {
      setLoads([...loads, load])
    }



    let addUser = (user) => {
      setUsers([...user, users])
    }

  return (
    <div >
      <Routes>
        {/* <Route path='/dashboard' element={<SidebarMenu />} /> */}

        <Route 
          path='/trucklist' 
          element={<TruckList 
            addATruck={addATruck} 
            trucklist={trucklist} 
            setTrucklist={setTrucklist} 
            drivers={drivers}
            setDrivers={setDrivers}
            addLoad={addLoad}
            loads={loads}
            setLoads={setLoads}
            setUsers={setUsers}
            />} 
        />

        <Route 
          path='/drivers' 
          element={<Drivers 
            addDriver={addDriver} 
            drivers={drivers} 
            setDrivers={setDrivers}
          />} 
        />

        <Route path='/history' element={<History drivers={drivers} loads={loads} backendURL={backendURL} />} />

        <Route path='/register' element={<Register users={users} addUser={addUser} setUsers={setUsers} backendURL={backendURL}  />} />
        <Route path='/login' element={<Login users={users} addUser={addUser} setUsers={setUsers} backendURL={backendURL}  />} />
      </Routes>
    </div>
  );
}

export default App;
