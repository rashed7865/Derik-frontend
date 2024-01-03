import React, { useState } from 'react';
import axios from 'axios';
import '../Auth.css';
import Loading from '../../../Components/Loading/Loading';
import { Error, Success } from '../../../Components/Messages/messages';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const ResetPassword = (props) => {
    const { id, token } = useParams();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        password: '',
        cpassword: ''
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (userData.email) {
            Error("Something wrong with email address");
        }
        else {
            try {
                setLoading(true);
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/reset-password/${id}/${token}`, userData);

                setLoading(false);

                if (response.status === 200) {
                    Success(response.data.successMessage);
                    setTimeout(() => {
                        props.history.push('/login');
                    }, 2000);
                } else {
                    Error(response.data.errorMessage);
                }
            } catch (error) {
                setLoading(false);

                if (error.response && error.response.status === 400) {
                    Error(error.response.data.errorMessage);
                } else {
                    console.error('An error occurred:', error.message);
                }
            }
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
                        <h2>Reset Password</h2>
                        <form onSubmit={submitHandler}>
                            <div className='item'>
                                <label>كلمة المرور</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input required name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <div className='item'>
                                <label>أعد إدخال كلمة السر</label>
                                <div className="input-group">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                                    <input required name='cpassword' type="password" className="form-control" placeholder="Retype Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                            <button className='btn' type="submit">تسجيل</button>
                        </form>
                    </div>
                </div>
            </>
    );
};
