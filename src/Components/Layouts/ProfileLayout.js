import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar';
import { ProfileSideBar } from '../Profile/ProfileSideBar';
import axios from 'axios';
import { isAuthenticated } from '../Auth/auth';

export const ProfLayout = (props) => {

  const [user, setUser] = useState({});

  const getUser = async() => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/get/${isAuthenticated()._id}`).then(res => {
        setUser(res.data);
      
      })
  }

  useEffect(() => {
      getUser();
      return () => {
          
      }
  }, []);
    return (
        <div style={{padding:"5% 20px"}}>
           {
               props.sidebar ? 
               <>
       
                <div> 
                <b className = 'mb-0 pb-0'>حساب</b>
                <p className = 'mb-3'>{user.firstName} {user.lastName}</p>
                </div> 
               <div className = 'row' style = {{borderBottom: '1px solid #d4d5d9'}}>
              <div className = 'col-md-3'>
                <ProfileSideBar/>
              </div>
              <div className = 'col-md-9'>
                {props.children}
              </div>
              </div>
              </>
            :
            props.children
           }
            
        </div>
    )
}
