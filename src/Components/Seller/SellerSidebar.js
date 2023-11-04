import React from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { NavLink, useLocation } from 'react-router-dom';

export const SellerSidebar = () => {
  const location = useLocation();

  const adminEmail = 'rashedecomm728@gmail.com'; 

  const handleContactAdmin = () => {
    window.location.href = `mailto:${adminEmail}`;
  };

  return (
    <div className='sidebar adminSidebar'>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/seller/products']} selectedKeys={[location.pathname]}>
          <Menu.Item key="/seller/products">
            <div className='sidebar-links'>
              <div>
                <i className="fas fa-chart-pie"></i>
              </div>
              <div>
                <NavLink to='/seller/products'>Products</NavLink>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="/seller/orders">
            <div className='sidebar-links'>
              <div>
                <i className="fas fa-shopping-cart"></i>
              </div>
              <div>
                <NavLink to='/seller/orders'>Order Management</NavLink>
              </div>
            </div>
          </Menu.Item>
          <Menu.Item key="/seller/contact-admin">
            <div className='sidebar-links'>
              <div>
                <i className="fas fa-envelope"></i> 
              </div>
              <div>
                <button onClick={handleContactAdmin}>Kontakt Admin</button>
              </div>
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};
