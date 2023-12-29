import React, { useState } from 'react';
import axios from 'axios';
import '../Auth.css';
import Loading from '../../../Components/Loading/Loading';
import { Error, Success } from '../../../Components/Messages/messages';
import { Link } from 'react-router-dom';

export const ForgetPassword = (props) => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!userData.email) {
            Error("Something wrong with email address");
        } 
        else {
            setLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/forget-password`, userData).then(res => {
                console.log(res);
                setLoading(false);
                if (res.status === 200) {
                    Success("Reset Link is sent to your email");
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
                <div className="auth-inner">
                        <h2>Forget Password</h2>
                        <form onSubmit={submitHandler}>
                            <div className='item'>
                                <label>Email بريد إلكتروني</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                                    <input required name='email' type="text" className="form-control" placeholder="Email" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <button className='btn' type="submit">تسجيل</button>
                        </form>
                    </div>
                </div>
            </>
    );
};
