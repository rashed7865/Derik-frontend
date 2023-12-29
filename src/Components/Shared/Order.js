import { CheckCircleOutlined, CloseCircleFilled, CloseOutlined,DeleteOutlined, DeleteFilled } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { Error, Success } from '../Messages/messages';

const { Option } = Select;

export const Order = (props) => {
    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [orderStatus, setOrderStatus] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    /************************************************** Modal ***********************************************/
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    function handleChange(value) {
        setOrderStatus(value);
    }


    const orderStatusHandler = async (orderId) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders/set/status`, { status: orderStatus, orderId, updateTime: moment().format("dddd, MMMM Do YYYY, h:mm:ss a") }, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                Success(res.data.successMessage);
                props.update && props.update();
            } else {
                Error(res.data.errorMessage)
            }
        })
    }


    /************************************************** Cancel Orders ***********************************************/
    const deleteHandler = async (orderId) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/orders/order/delete/${orderId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                Success(res.data.successMessage);
                props.update && props.update();
            }
            else {
                Error(res.data.errorMessage)
            }
        })
    }
    const removeOrder = async (orderId) => {
        console.log(orderId)
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/orders/order/remove/${orderId}`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                Success(res.data.successMessage);
                props.update && props.update();
            }
            else {
                Error(res.data.errorMessage)
            }
        })
    }


    function cancel(e) {
        Error('Request Cancelled!')
    }

    return (
        <div>
            <div>{props.orders?.length} طلبات</div>
            {
                props.orders && props.orders.length > 0 && props.orders.map((order, index) => {
                    return (
                        <div className='table-container'>
                            <table className="table table-borderless">
                                <tbody>
                                    <tr className='bg-secondary text-white'>
                                        <th>
                                            طلبات #{index + 1}

                                        </th>
                                        <th>
                                            رقم الطلب  : {order?._id}
                                        </th>
                                        <th>
                                            السعر الكلي : {order?.totalPrice}$
                                        </th>
                                        <th>
                                            <button className='text-white' onClick={() => { showModal(); setUser(order?.user); setData(order?.data) }}>Customer</button>
                                        </th>
                                        <th>
                                            <div className='text-white border p-1'>تاجر:  {order?.seller?.firstName} {order?.seller?.lastName}</div>
                                        </th>
                                        <th>
                                            <span>Status : &nbsp;
                                                {order?.status === "1" && 'Just Placed'}
                                                {order?.status === "2" && 'Confirmed'}
                                                {order?.status === "3" && 'Prepared'}
                                                {order?.status === "4" && 'Delivered'}
                                                {order?.status === "5" && <CheckCircleOutlined className='fs-5 text-success bg-white rounded-circle' style={{ marginTop: '-10px' }} />}
                                                {order?.status === "0" && <CloseCircleFilled className='fs-5 text-danger bg-white rounded-circle' style={{ marginTop: '-10px' }} />}
                                            </span>
                                        </th>

                                        {
                                            order.status !== "5" && order.status !== "0" &&
                                            <>
                                                <th>
                                                    <div className='d-flex align-items-center'>
                                                        <div>
                                                            <Select style={{ width: "100px" }} defaultValue={order?.status} onChange={handleChange}>
                                                                <Option value={1}>وضعت للتو</Option>
                                                                <Option value={2}>مؤكد</Option>
                                                                <Option value={3}>Prepared</Option>
                                                                <Option value={4}>تم التوصيل</Option>
                                                                <Option value={5}>مكتمل</Option>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Button onClick={() => orderStatusHandler(order?._id)}>Set</Button>
                                                        </div>
                                                    </div>
                                                </th>
                                                <th>
                                                    <Popconfirm
                                                        title="Are you sure to cancel the order?"
                                                        onConfirm={() => deleteHandler(order?._id)}
                                                        onCancel={cancel}
                                                        placement='topLeft'
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <span className='text-danger fs-4' style={{ cursor: "pointer" }}><CloseOutlined /></span>
                                                    </Popconfirm>

                                                </th>
                                            </>
                                        }
                                        <th style={{ cursor: "pointer" }}><DeleteFilled  className='text-danger fs-4' onClick={() => removeOrder(order?._id)}/></th>
                                    </tr>
                                    <div className='text-center mb-4' style={{ width: '100%', position: 'relative' }}>
                                        <th style={{ position: 'absolute', left: '200%', top: '0px', width: '100vw', maxWidth: "500px" }}>
                                            <span>وضعت في: {order?.placed}</span>
                                        </th>
                                    </div>
                                    {
                                        order?.products?.map(product => {
                                            return (
                                                <tr>
                                                    <th>
                                                        <img src={product && product.image?.url} height='71' width='64' alt='order' />
                                                    </th>
                                                    <th>
                                                        {product && product.name}

                                                    </th>
                                                    <th>الكمية{product && product.qty}</th>
                                                    <th>{product && product.price * product.qty}$</th>
                                                    
                                                    {product && product.sizes &&  <th>Size: {product.sizes}</th>}

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }

            <Modal footer={false} width={800} title="User Info" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="row">
                    <div className="col-md-6 my-4">
                        <h6>الاسم الكامل:</h6>
                        <b>{user.name}</b>
                    </div>
                    <div className="col-md-6 my-4">
                        <h6>Email:</h6>
                        <b>{user.email}</b>
                    </div>
                </div>
                {
                    data && data.id ?
                        <div className="row">
                            <h2>معلومات الدفع:</h2>
                            <div className="col-md-6 my-4">
                                <h6>مدفوع:</h6>
                                <b><span>True</span></b>
                            </div>
                            <div className="col-md-6 my-4">
                                <h6>صاحب الدفع:</h6>
                                <b>{data?.payer?.payer_id}</b>
                            </div>
                            <div className="col-md-6 my-4">
                                <h6>معرف الدفع:</h6>
                                <b>{data?.id} </b>
                            </div>
                            <div className="col-md-6 my-4">
                                <h6>المبلغ المدفوع:</h6>
                                <b>{data?.purchase_units[0]?.amount?.value}$</b>
                            </div>
                            <div className="col-md-6 my-4">
                                <h6>Email:</h6>
                                <b>{data?.payer?.email_address}</b>
                            </div>
                        </div>
                        :
                        <div>
                            <h6>نوع الدفع:</h6>
                            <b>الدفع عند الاستلام</b>
                        </div>
                }
            </Modal>
        </div >
    )
}
