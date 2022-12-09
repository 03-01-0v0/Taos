import './newWarehouseExport.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import {warehouseExport} from '../../formSource';
import warehouseExportApi from '../../components/api/warehouseExportApi';
import Swal from 'sweetalert2';

const NewWarehouseExport = () => {
    const [info, setInfo] = useState({});
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
            const resData = await warehouseExportApi.createdWarehouse(params);
            if (resData.data.message === 'CREATED') {
                Swal.fire(
                    'Created',
                    'You have add 1 new warehouse Export!',
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
                <h1>Add New Warehouse Export</h1>
                </div>
                <div className="bottom">
                <div className="right">
                    <form>

                    {warehouseExport.map((input) => (
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
                    <button onClick={handleClick}>Send</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

export default NewWarehouseExport;