import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

const Header = () => {
    return (
        <>
            <Nav> 
                    <NavLink href='/users' style={{margin: '1%'}}>
                        Users
                    </NavLink>
                    <NavLink href='/login' style={{margin: '1%'}}>
                        Login
                    </NavLink>   
                    <NavLink href='/register' style={{margin: '1%'}}>
                        Register
                    </NavLink>               
            </Nav>
        </>
    )
}

export default Header;