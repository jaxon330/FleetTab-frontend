import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLineChart, faTruck, faList, faFileInvoice, faIdCard, faUser, faHeadset, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import '../css/styles.css'
function SidebarMenu({setUsers}) {

    const navigate = useNavigate()
    const goToLoginPage = () => navigate('/login')

    let signOut = async () => {
        let userData = await fetch('http://localhost:4000/sessions/logout')
        let json = await userData.json()
        if(json) {
            setUsers(json)
            goToLoginPage()
        }
      }

  return (
    <>
        <SideNav className='sidebar'
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="dashboard">
                <NavItem eventKey="dashboard" >
                   
                    <NavIcon>
                    <Link to='/dashboard'>
                        <FontAwesomeIcon icon={faLineChart} style={{ fontSize: '1.5em' }} />
                        </Link>
                    </NavIcon>
                    <NavText>
                    <Link to='/dashboard'>Dashboard</Link>
                    </NavText>
                    
                </NavItem>
                <NavItem eventKey="trucklist">
                    <NavIcon>
                    <Link to='/trucklist'><FontAwesomeIcon icon={faTruck} style={{ fontSize: '1.5em' }} /></Link>
                    </NavIcon>
                    <NavText>
                         <Link to='/trucklist'>Truck List</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="history">
                    <NavIcon>
                    <Link to='/history'><FontAwesomeIcon icon={faList} style={{ fontSize: '1.5em' }} /></Link>
                    </NavIcon>
                    <NavText>
                    <Link to='/history'>History</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="payments">
                    <NavIcon>
                        <FontAwesomeIcon icon={faFileInvoice} style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                    <Link to='/payment'>Payments</Link>
                    </NavText>
                </NavItem>
                <NavItem eventKey="drivers">
                    <NavIcon>
                    <Link to='/drivers'><FontAwesomeIcon icon={faIdCard} style={{ fontSize: '1.5em' }} /></Link>
                    </NavIcon>
                    <NavText>
                    <Link to='/drivers'>Drivers</Link>
                    </NavText>
                </NavItem>

                {/* user profile */}
                {/* <NavItem style={{position: 'absolute', bottom: 100}} eventKey="userProfile">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.5em' }} />
                    </NavIcon>
                    <NavText>
                        User Profile
                    </NavText>
                </NavItem>
                <NavItem style={{position: 'absolute', bottom: 50}}  eventKey="contactCenter">
                    <NavIcon>
                        <FontAwesomeIcon icon={faHeadset} style={{ fontSize: '1.5em' }} />
                    </NavIcon>
                    <NavText>
                        Contact Center
                    </NavText>
                </NavItem> */}
                <NavItem style={{position: 'absolute', bottom: 0}}  eventKey="signOut">
                    <NavIcon>
                       <Link onClick={signOut} to='/login'> <FontAwesomeIcon  icon={faArrowRightFromBracket} style={{ fontSize: '1.5em' }} /></Link>
                    </NavIcon>
                    <NavText>
                        <Link to='/login'>Sign Out</Link>
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    </>
  )
}

export default SidebarMenu
