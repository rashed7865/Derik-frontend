import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../Auth/auth'
import './Sidebar.css'


export const ProfileSideBar = () => {
    return ( 
        <div className='profile-sidebar' style={{ borderRight: '1px solid #d4d5d9', paddingRight: '2px' }}>
            <div>
                <div className='prof-div'>
                 
                    
                    <NavLink activeClassName='profile-sidebar-links' to='/orders'>الطلبات</NavLink>
                    {/* <div className='pt-2'>
                        <NavLink activeClassName='profile-sidebar-links' to='/completed-orders'>Completed</NavLink>
                    </div> */}
                </div>
                <div className='prof-div'>
                    
                    <div>
                        <NavLink activeClassName='profile-sidebar-links' to='/profile'>حسابي</NavLink>
                    </div>
                </div>
                <div className='prof-div'>
                 
                    <div className="text-left">
  <a href='/login' onClick={() => { logout(() => { }) }} style={{ fontSize: '11px' }}>
    تسجيل خروج
  </a>
</div>

                </div>
            </div>
        </div>
    )
}
