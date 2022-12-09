import './newOrderBill.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import {orderBillInputs} from '../../formSource';
import orderBillApi from '../../components/api/orderBillApi';
import Swal from 'sweetalert2';

const NewOrderBill = () => {
    const [info, setInfo] = useState({paymentId: 1});
    const handleChange = (e) => {
        e.preventDefault();
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const params = {
            ...info,
            };
            const resData = await orderBillApi.createdOrder(params);
            if (resData.data.message === 'CREATED') {
                Swal.fire(
                    'Created',
                    'You have add 1 new order bill!',
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                <h1>Add New Order Bill</h1>
                </div>
                <div className="bottom">
                <div className="right">
                    <form>

                    {orderBillInputs.map((input) => (
                        <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                            onChange={handleChange}
                            type={input.type}
                            placeholder={input.placeholder}
                            id={input.id}
                        />
                        </div>
                    ))}
                    <div className="formInput">
                    <label>Payment Id</label>
                    <select id="paymentId" onChange={handleChange}>
                        <option value={1}>Thanh toán khi nhận hàng</option>
                        <option value={2}>Thanh toán qua MoMo</option>
                        <option value={2}>Thanh toán qua VN pay</option>
                    </select>
                    </div>
                    <button onClick={handleClick}>Send</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NewOrderBill;