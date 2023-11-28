import React, { useState } from 'react';
import axios from 'axios';
import '../Auth.css';
import Loading from '../../../Components/Loading/Loading';
import { Error, Success } from '../../../Components/Messages/messages';
import { Link } from 'react-router-dom';

export const Signup = (props) => {
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
                console.log(res);
                setLoading(false);
                if (res.status === 200) {
                    Success(res.data.successMessage);
                    setTimeout(() => {
                        props.history.push('/login')
                    }, 2000);
                }
                else {
                    Error(res.data.errorMessage);
                }
            })
        }
    };

    return (
        loading
            ?
            <Loading />
            :
            <>
                <div className='auth'>
                    <div className="auth-inner-bubble-container">
                        <h2>إنشاء حساب</h2>
                        <form onSubmit={submitHandler}>
                            <div className='item'>
                                <label>الاسم الأول</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input required name='firstName' type="text" className="form-control" placeholder="First Name" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>اسم العائلة</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input required name='lastName' type="text" className="form-control" placeholder="Last Name" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Email بريد إلكتروني</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input required name='email' type="text" className="form-control" placeholder="Email" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>اسم المستخدم</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input required name='username' type="text" className="form-control" placeholder="Username" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>Passwordإنشاء كلمة المرور</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input required name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>أعد إدخال كلمة السر</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input required name='confirm' type="password" className="form-control" placeholder="Retype Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>City مدينة</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input required name='city' type="text" className="form-control" placeholder="City" onChange={handleChange} aria-label="City" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                          
                           
                            <div className='item'>
                                <label>Phone</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input required name='phone' type="text" className="form-control" placeholder="Phone" onChange={handleChange} aria-label="Phone" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <button className='btn' type="submit">إنشاء الحساب</button>
                        </form>
                        <div className='end-text'>  
                            <div>هل لديك حساب؟</div>
                           
                        </div>
                        <Link to="/login">
                            <button className='btn' type="submit">اذهب إلى حسابي
 </button>                            </Link>
                    </div>
                </div>
            </>
    );
};
