import React, { useEffect, useState } from 'react'
import { Select, Tabs } from 'antd';
import axios from 'axios';
import { Order } from '../../../Components/Shared/Order';
import { Error } from '../../../Components/Messages/messages';
import { SellerLayout } from '../../../Components/Layouts/SellerLayout';

const { TabPane } = Tabs;
const { Option } = Select;


export const SellerOrdersManagement = () => {
    const [orders, setOrders] = useState([]);
    const [sort, setSort] = useState("6");

    const getAllOrders = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/seller/all-orders`, {
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            if (res.status === 200) {
                setOrders(res.data);
            }
            else {
                Error(res.data.errorMessage)
            }
        })
    }

    useEffect(() => {
        getAllOrders();
        return () => {

        }
    }, []);

    return (
        <SellerLayout sidebar>
            <div className='orders admin-orders pt-5'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="All" key="1">
                    ترتيب الطلبات                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Sort Orders"
                            allowClear
                            treeDefaultExpandAll
                            value={sort}
                            onChange={(val) => setSort(val)}
                            className='mb-3'
                        >
                            <Option value={"6"}>الجميع</Option>
                            <Option value={"1"}>قيد الانتظار</Option>
                            <Option value={"2"}>مؤكد</Option>
                            <Option value={"3"}>Prepared</Option>
                            <Option value={"4"}>مُعد</Option>
                            <Option value={"5"}>مكتمل</Option>
                            <Option value={"0"}>ألغيت</Option>
                        </Select>
                        <Order orders={sort === "6" ? orders : orders?.filter(order => order?.status === sort)} />
                    </TabPane>
                    <TabPane tab="Active" key="2">
                        <Order orders={orders?.filter(order => order?.status !== "5" && order?.status !== "0")} />
                    </TabPane>
                    <TabPane tab="Completed" key="3">
                        <Order orders={orders?.filter(order => order?.status === "5")} status={"5"} />
                    </TabPane>
                    <TabPane tab="Cancelled" key="4">
                        <Order orders={orders?.filter(order => order?.status === "0")} status={"0"} />
                    </TabPane>
                </Tabs>
            </div>
        </SellerLayout>
    )
}
