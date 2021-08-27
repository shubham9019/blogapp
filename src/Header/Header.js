import { Avatar } from '@material-ui/core'
import { Link } from "react-router-dom";
import './Header.css'
import React from "react";


 const Header = () => {
    return (
        <div className='header'>
            <div className='header__left'>
                <a to='/'>Blog Post App</a>
            </div>

            <div className='header__right'>
                <div className='header__icons'>
                    <a href ='/'>
                        <i className='fas fa-home'></i>{' '}
                    </a>
                    <a to ='/'>
                        <i className='fas fa-search'></i>{' '}
                    </a>
                    
                    
                    <a href ='https://www.google.com'>
                        <i class='fas fa-power-off' alt='Sign Out'></i>
                    </a>
                    <Avatar className='header__avatar'></Avatar>
                </div>
            </div>
        </div>
    )
}

export default Header
