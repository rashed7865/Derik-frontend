import React from 'react'
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { NavLink, useLocation } from 'react-router-dom';
import { logout } from '../Auth/auth';

export const AdminSideBar = () => {
    const location = useLocation();
    return (
        <div className='sidebar adminSidebar'>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                }}
            >
                {/* <div><Link to='/' className='logo'>Dêrik-online-shop</Link></div> */}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/admin/dashboard']} selectedKeys={[location.pathname]}>
                    <Menu.Item key="/admin/users">
                        <div className='sidebar-links'>
                            <div>
                                <i className="fas fa-store"></i>
                            </div>
                            <div>
                                <NavLink to='/admin/users'> المستخدمين </NavLink>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="/admin/sellers">
                        <div className='sidebar-links'>
                            <div>
                                <i className="fas fa-store"></i>
                            </div>
                            <div>
                                <NavLink to='/admin/sellers'> البائعين </NavLink>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="/admin/all-categories">
                        <div className='sidebar-links'>
                            <div>
                                <i className="fas fa-th-list"></i>
                            </div>
                            <div>
                                <NavLink to='/admin/all-categories'>قائمة الفئات</NavLink>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="/admin/products"><div className='sidebar-links'>
                        <div>
                            <i className="fas fa-chart-pie"></i>
                        </div>
                        <div>
                            <NavLink to='/admin/products'>منتجات</NavLink>
                        </div>
                    </div>
                    </Menu.Item>
                    <Menu.Item key="/admin/orders">
                        <div className='sidebar-links'>
                            <div>
                                <i className="fas fa-shopping-cart"></i>
                            </div>
                            <div>
                                <NavLink to='/admin/orders'> إدارة الطلبات</NavLink>
                            </div>
                        </div>
                    </Menu.Item>
                    <Menu.Item key="/admin/logout">
                        <div className='sidebar-links'>
                            <div>
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <div>
                                <a href='/login' onClick={() => {  logout(() => { }) }} style={{ fontSize: '11px' }}>
                                تسجيل خروج
                                </a>
                            </div>
                        </div>
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    )
}
