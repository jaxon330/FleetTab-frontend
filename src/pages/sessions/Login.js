import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../../css/styles.css'

function Login({users, setUsers}) {
    const [userLoggedIn, setUserLoggedIn] = useState({
        username: '',
        password: ''
    }) 

    let errorMessage = ''
    const navigate = useNavigate()
    const goToTrucklistPage = () => navigate('/trucklist')

   let handleSubmit = async (e) => {
       e.preventDefault()
       console.log('hit');
       let userData = await fetch('http://localhost:4000/sessions/login', {
           method: 'POST',
           body: JSON.stringify({
               username: userLoggedIn.username,
               password: userLoggedIn.password
           }),
           headers: {
               'Content-Type': 'application/json'
           }

           
       })
    //    let userToLogin = await userData.json()
    //    console.log(userData);
    //    console.log('FrontEnd '+ userToLogin);
    //    setUsers(userToLogin)
    
    if (userData.status === 200) {
        navigate('/trucklist')
    } else {
        errorMessage = 'Invalid username or password'
    }
   }

   let handleChange = (event) => {
    setUserLoggedIn({...userLoggedIn, [event.target.name]:event.target.value})
   }
   console.log(userLoggedIn);
  return (
    <div className=' sessionsContainer d-flex justify-content-center align-items-center' >
       <div className='row'>
        <div className='col '>
                <h1 style={{color: 'aliceblue', fontSize: '4rem'}}>FleetTab</h1>
                <p style={{color: '#FFF5EE', fontSize: '1.5rem'}}>Trucking Dispatch Solution</p>
                <p style={{color: '#FFF5EE', fontSize: '1.5rem'}}>Track and Control your fleets with FleetTab</p>
            </div>
        <div className='sessions col'>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <p>{errorMessage}</p>
                <Form.Control type="text" placeholder="Enter username" name='username' onChange={handleChange} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type='submit' >
                Login
            </Button>
            <Link to='/register' style={{color: 'black', marginLeft: '30px'}}>Register</Link>
        </Form>
    </div>
       </div>
    </div>
  )
}

export default Login