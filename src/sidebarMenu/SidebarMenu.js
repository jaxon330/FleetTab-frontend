import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faLineChart, faTruck, faList, faFileInvoice, faIdCard, faUser, faHeadset, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
function SidebarMenu() {
  return (
    <div  style={{height: '100vh'}} >
        <Nav>
            jlkjwrwr
        </Nav>
        <SideNav 
        style={{backgroundColor: '#4B6587'}}
            onSelect={(selected) => {
                // Add your code here
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="dashboard">
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <FontAwesomeIcon icon={faLineChart} style={{ fontSize: '1.5em' }} />
                    </NavIcon>
                    <NavText>
                        Dashboard
                    </NavText>
                </NavItem>
                <NavItem eventKey="trucklist">
                    <NavIcon>
                        <FontAwesomeIcon icon={faTruck} style={{ fontSize: '1.5em' }} />
                    </NavIcon>
                    <NavText>
                        Truck List
                    </NavText>
                </NavItem>
                <NavItem eventKey="history">
                    <NavIcon>
                        <FontAwesomeIcon icon={faList} style={{ fontSize: '1.5em' }} />
                    </NavIcon>
                    <NavText>
                        History
                    </NavText>
                </NavItem>
                <NavItem eventKey="payments">
                    <NavIcon>
                        <FontAwesomeIcon icon={faFileInvoice} style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Payments
                    </NavText>
                </NavItem>
                <NavItem eventKey="drivers">
                    <NavIcon>
                        <FontAwesomeIcon icon={faIdCard} style={{ fontSize: '1.5em' }} />
                    </NavIcon>
                    <NavText>
                        Drivers
                    </NavText>
                </NavItem>

                {/* user profile */}
                <NavItem style={{position: 'absolute', bottom: 100}} eventKey="userProfile">
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
                </NavItem>
                <NavItem style={{position: 'absolute', bottom: 0}}  eventKey="signOut">
                    <NavIcon>
                        <FontAwesomeIcon  icon={faArrowRightFromBracket} style={{ fontSize: '1.5em' }} />
                    </NavIcon>
                    <NavText>
                        Sign Out
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    </div>
  )
}

export default SidebarMenu
