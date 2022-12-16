import './newOrderBill.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import {useEffect, useState} from 'react';
import {orderBillInputs} from '../../formSource';
import orderBillApi from '../../components/api/orderBillApi';
import Swal from 'sweetalert2';
import HashLoader from 'react-spinners/HashLoader';
import {useParams} from 'react-router-dom';

const UpdateOrderBill = () => {
    let {orderBillId} = useParams();
    const [info, setInfo] = useState({});
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const res = await orderBillApi.getOrderById(orderBillId);
        setList(res.data.data);
        const products = res.data.data[0].products.map((e) => {
            return `x${e.quantity} ${e.name.toLowerCase()} ${e.color} ${e.capacity}, `;
        });
        setInfo({
            id: res.data.data[0].id,
            name: res.data.data[0].name,
            email: res.data.data[0].email,
            address: res.data.data[0].address,
            note: res.data.data[0].note,
            products: products,
            statusId: res.data.data[0] || 2,
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleChange = (e) => {
        e.preventDefault();
        setInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const params = {
                id: orderBillId,
                ...info,
            };
            const resData = await orderBillApi.updateOrder(params);
            if (resData.data.success) {
                Swal.fire('Updated', 'Order bill has been updated!', 'success');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const cssOverride = {
        display: 'block',
        margin: '400px auto',
        verticalAlign: 'middle',
    };
    if (loading) return <HashLoader cssOverride={cssOverride} loading={loading} color='#6439FF' />;
    return (
        <div className='new'>
            <Sidebar />
            <div className='newContainer'>
                <Navbar />
                <div className='top'>
                    <h1>Update Order Bill</h1>
                </div>
                <div className='bottom'>
                    <div className='right'>
                        <form>
                            {orderBillInputs.map((input) => (
                                <div className='formInput' key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        onChange={handleChange}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                        value={info[input.id]}
                                    />
                                </div>
                            ))}
                            <div className='formInput'>
                                <label>Status Id</label>
                                <select value={info.statusId} id='statusId' onChange={handleChange}>
                                    <option value={1}>Xác nhận</option>
                                    <option value={2}>Chưa xác nhận</option>
                                </select>
                            </div>
                            <div className='formInput'>
                                <label>Payment Id</label>
                                <select id='paymentId' onChange={handleChange}>
                                    <option value={1}>Thanh toán khi nhận hàng</option>
                                    <option value={2}>Thanh toán qua MoMo</option>
                                    <option value={3}>Thanh toán qua VN pay</option>
                                </select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderBill;
