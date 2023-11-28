import axios from 'axios';
import React, { useState } from 'react'
import { Drawer } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Error, Success } from '../../../Messages/messages';
import "./Drawer.css"


export const UserDrawer = ({ update }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirm: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        phone: ''
    });

    // const { firstName, lastName, username, email, password, confirm, city, country, zipCode, phone } = userData;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirm) {
            Error("Passwords don't match");
        } else {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, userData).then(res => {
                setLoading(false);
                if (res.status === 200) {
                    Success("User added successfully");
                    update();
                }
                else {
                    Error(res.data.errorMessage);
                }
            })
        }
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    return (
        <>
            <button className='text-white p-2' onClick={showDrawer}>
                <UserAddOutlined /> إضافة مستخدمين
            </button>
            <Drawer
                width={640}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                className="usersDrawer"
            >
                <div className='¥'>
                    <div className="auth-inner-bubble-container">
                        <h2 className='text-center'>إضافة مستخدمين</h2>
                        <form onSubmit={submitHandler}>
                            <div className='item'>
                                <label>الاسم الأول</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='firstName' type="text" className="form-control" placeholder="First Name" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>اسم العائلة</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='lastName' type="text" className="form-control" placeholder="Last Name" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>بريد إلكتروني</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='email' type="text" className="form-control" placeholder="Email" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>كلمة المرور</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>أعد إدخال كلمة السر</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input name='confirm' type="password" className="form-control" placeholder="Retype Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>مدينة</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='city' type="text" className="form-control" placeholder="City" onChange={handleChange} aria-label="City" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>العنوان الكامل</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='state' type="text" className="form-control" placeholder="الرجاء اداخل العنوان الصحيح" onChange={handleChange} aria-label="State" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                           
                         
                           
                            <div className='item'>
                                <label>Phone</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input name='phone' type="text" className="form-control" placeholder="Phone" onChange={handleChange} aria-label="Phone" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <button className='btn btn-dark w-100 mt-4' type="submit">أضف</button>
                        </form>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
