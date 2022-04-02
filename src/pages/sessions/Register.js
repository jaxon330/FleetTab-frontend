import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'

function Register({users, addUser, setUsers}) {
     const [newUser, setNewUser] = useState({
         username: '',
         password: '',
         verifyPassword: ''
     }) 

     const navigate = useNavigate()
     const goToTrucklistPage = () => navigate('/trucklist')

    let handleSubmit = async (e) => {
        e.preventDefault()
        
        let userData = await fetch('http://localhost:4000/sessions/register', {
            method: 'POST',
            body: JSON.stringify({
                username: newUser.username,
                password: newUser.password,
                verifyPassword: newUser.verifyPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }

            
        })
        let createdUser = await userData.json()
        console.log('FrontEnd '+createdUser);
        setUsers(createdUser)
        goToTrucklistPage()
    }

    let handleChange = (event) => {
        setNewUser({...newUser, [event.target.name]:event.target.value})
    }
    console.log(newUser);


  return (
    <div className=' sessionsContainer d-flex justify-content-center align-items-center'>
        <div className='row'>
        <div className='col '>
                <h1 style={{color: 'aliceblue', fontSize: '4rem'}}>FleetTab</h1>
                <p style={{color: '#FFF5EE', fontSize: '1.5rem'}}>Trucking Dispatch Solution</p>
                <p style={{color: '#FFF5EE', fontSize: '1.5rem'}}>Track and Control your fleets with FleetTab</p>
            </div>
        <div className='sessions col'>
        <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name='username' onChange={handleChange} />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicVerifyPassword">
                <Form.Label>Re-type Password</Form.Label>
                <Form.Control type="password" placeholder="Re-type Password" name='verifyPassword' onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
            <Link to='/login' style={{color: 'black', marginLeft: '30px'}}>Login</Link>
            </Form>
        </div>
        </div>
    </div>
  )
}

export default Register