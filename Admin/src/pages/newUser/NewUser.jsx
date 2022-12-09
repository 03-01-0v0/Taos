import './newUser.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import {userInputs} from '../../formSource';
import userApi from '../../components/api/userApi';
import Swal from 'sweetalert2';

const NewUser = () => {
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
            console.log(params);
            const resData = await userApi.createdUser(params);
            if (resData.data.message === 'CREATED') {
                Swal.fire(
                    'Created',
                    'You have add 1 new account!',
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
                <h1>Add New User</h1>
                </div>
                <div className="bottom">
                <div className="right">
                    <form>

                    {userInputs.map((input) => (
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

export default NewUser;