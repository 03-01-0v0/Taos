import "./newAccount.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { accountInputs } from "../../formSource";
import axiosClient from '../../components/api/axiosClient';
import accountApi from '../../components/api/accountApi';
import uploadApi from '../../components/api/uploadApi';
import Swal from 'sweetalert2';

const NewAccount = () => {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    console.log(info)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            let img = '';
            Object.values(files).forEach(file => {
                data.append('picture', file);
                img = file.name.split('.')[0];
            })
            const resUpload = await uploadApi.upload(data);
            const params = {
            ...info,
            img,
            };
            const resData = await accountApi.createdAccount(params);
            if (resUpload.data.message === 'OK' && resData.data.message === 'CREATED') {
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
            setInfo({});
            setFiles("");
    } catch (err) {console.log(err)}
    };
return (
<div className="new">
    <Sidebar />
    <div className="newContainer">
    <Navbar />
    <div className="top">
        <h1>Add New Account</h1>
    </div>
    <div className="bottom">
        <div className="left">
        <img
            src={
            files
                ? URL.createObjectURL(files[0])
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
        />
        </div>
        <div className="right">
        <form>
            <div className="formInput">
            <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
                type="file"
                id="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                style={{ display: "none" }}
            />
            </div>

            {accountInputs.map((input) => (
            <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                id={input.id}
                onChange={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                />
            </div>
            ))}
            <div className="formInput">
            <label>Authorization</label>
            <select id="authorizationId" onChange={handleChange}>
                <option value={1}>User</option>
                <option value={2}>Admin</option>
                <option value={3}>Sale</option>
                <option value={4}>Warehouse Staff</option>
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

export default NewAccount;
