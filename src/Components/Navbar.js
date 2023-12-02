import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Redux/Redux';
import { isAuthenticated } from './Auth/auth';
import { ShoppingCartOutlined, ProfileOutlined, DashboardFilled, UserOutlined } from '@ant-design/icons';
import logo from "../assets/logo.png";
import bannerImage from "../assets/images/slider-img.png";
import bannerImage2 from "../assets/images/p2.png";

import lineImage from "../assets/images/line.png";




export const Navbar = () => {
  const productsList = useSelector(state => state.productsList);
  const { productsInCart } = productsList;
  const cart = productsInCart ? productsInCart.length : 0;
  const userId = isAuthenticated()?.user?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      dispatch(listProducts(userId));
    }


    return () => {

    }
  }, [userId]);

  return (
    <>
    {/* <div className='main-nav pb-5 mb-3' >
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white px-4" style={{ zIndex: "999" }}>
        <Link className="navbar-brand text-center" to="/">
          <img src={logo} alt="Logo" width="80px" />
          <h6 className='mt-2'>Dêrik-online-shop</h6>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto list-unstyle pt-3 mx-4 gap-4 gap-md-0" style={{ fontSize: '12px' }}>
            {
              isAuthenticated()?.role === 2 &&
              <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                <Link className="ant-dropdown-link" to={"/seller/products"}>
                  <DashboardFilled style={{ fontSize: '21px' }} />
                  <br />
                  <span style={{ fontSize: '14px' }}>Dashboard</span>
                </Link>
              </li>
            }
            {
              isAuthenticated()?.role === 1 &&
              <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                <Link className="ant-dropdown-link" to={"/admin/products"}>
                  <DashboardFilled style={{ fontSize: '21px' }} />
                  <br />
                  <span style={{ fontSize: '14px' }}>Dashboard</span>
                </Link>
              </li>
            }
            {
              isAuthenticated() ?
                <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                  <Link className="ant-dropdown-link" to="/profile">
                    <ProfileOutlined style={{ fontSize: '21px', }} />
                    <br />
                    <span style={{ fontSize: '14px' }}>Profile</span>
                  </Link>
                </li>
                :
                <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                  <Link className="ant-dropdown-link" to="/login">
                    <UserOutlined style={{ fontSize: '21px' }} />
                    <br />
                    <span style={{ fontSize: '14px' }}>Login</span>
                  </Link>
                </li>
            }
            <li className='ml-2 text-center'>
              <Badge count={isAuthenticated() && cart}>
                <Link to='/cart'><ShoppingCartOutlined style={{ fontSize: '24px', paddingBottom: '1px' }} /><br /><span style={{ fontSize: '14px' }}>
                  Bag
                </span>
                </Link>
              </Badge>
            </li>
          </ul>
        </div>
      </nav>
    </div> */}
<div className='hero_area'>
<header class="header_section">
<nav class="navbar navbar-expand-lg custom_nav-container ">              {}
       

<div className='container-fluid'>
<div className='row'>
<Link className="navbar-brand text-center col-md-4 col-lg-3 mx-3" to="/">                  
   <img src={logo} alt="Logo" width="100px" style={{ borderRadius: '10px' }}  />
        </Link>
        <div className='col-md-8 col-lg-9 d-flex align-items-center justify-content-end'>
        <span style={{ fontSize: '25px', fontWeight: 'bold', marginRight: '15px' }}>
                    Dêrik-online-shop
          </span>
          <ul className="navbar-nav list-unstyle d-flex gap-4 gap-md-0" style={{ fontSize: '12px', flexWrap: 'nowrap' }}>
                        {
              isAuthenticated()?.role === 2 &&
              <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                <Link className="ant-dropdown-link" to={"/seller/products"}>
                  <DashboardFilled style={{ fontSize: '21px' }} />
                  <br />
                  <span style={{ fontSize: '14px' }}>لوحة التحكم</span>
                </Link>
              </li>
            }
            {
              isAuthenticated()?.role === 1 &&
              <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                <Link className="ant-dropdown-link" to={"/admin/products"}>
                  <DashboardFilled style={{ fontSize: '21px' }} />
                  <br />
                  <span style={{ fontSize: '14px' }}>لوحةالتحكم</span>
                </Link>
              </li>
            }
            {
              isAuthenticated() ?
                <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                  <Link className="ant-dropdown-link" to="/profile">
                    <ProfileOutlined style={{ fontSize: '21px', }} />
                    <br />
                    <span style={{ fontSize: '14px' }}>حسابي </span>
                  </Link>
                </li>
                :
                <li className='nav-item profile text-center' style={{ fontWeight: 'normal' }}>
                  <Link className="ant-dropdown-link" to="/login">
                    <UserOutlined style={{ fontSize: '21px' }} />
                    <br />
                    <span style={{ fontSize: '14px' }}>تسجيل الدخول</span>

                  </Link>
                </li>
            }
            <li className='ml-2 text-center'>
              <Badge count={isAuthenticated() && cart}>
                <Link to='/cart'><ShoppingCartOutlined style={{ fontSize: '24px', paddingBottom: '4px' }} /><br /><span style={{ fontSize: '14px' }}>
                عربة التسوق</span>
                </Link>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</div>
 
</>
  );
};
