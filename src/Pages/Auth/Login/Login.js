import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setAuthentication } from '../../../Components/Auth/auth';
import '../Auth.css';
import { Error, Success } from '../../../Components/Messages/messages';
import Loading from '../../../Components/Loading/Loading';

export const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = userData;

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  }


  const submitHandler = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, { email, password }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        setAuthentication(res.data, res.data.token);
        Success(res.data.successMessage);
        props.history.push('/');
        document.location.reload();
      }
      else {
        Error(res.data.errorMessage);
      }
    })
  };


  return (
    <>
      <div className='auth'>
        <div className="auth-inner-bubble-container">
          <h2>تسجيل الدخول</h2>
          <p>تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور</p>
          {
            loading
              ?
              <Loading />
              :
              <form onSubmit={submitHandler}>
                <div className='item'>
                  <label>Email البريد الإلكتروني</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-regular fa-envelope"></i></span>
                    <input required name='email' type="text" className="form-control" placeholder="Email" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div className='item'>
                  <label>Password كلمة المرور</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                    <input required name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} aria-label="Username" aria-describedby="basic-addon1" />
                  </div>
                </div>
                <button className='btn' type="submit">تسجيل الدخول
</button>
              </form>
          }
             

              <div className='not-have-account'>
        ليس لديك حساب؟
      </div>


      <Link to="/signup">
        <button className='btn' type="submit">إنشاء حساب</button>
      </Link>
          <div className='end-text'>
        
          </div>
        </div>
      </div>
    </ >

  );
}
