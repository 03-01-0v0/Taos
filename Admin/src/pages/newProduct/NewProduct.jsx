import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { productInputs } from "../../formSource";
import productApi from '../../components/api/productApi';
import uploadApi from '../../components/api/uploadApi';
import Swal from 'sweetalert2';

const NewProduct = () => {
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({isSell: 'false'});
    const [rooms, setRooms] = useState([]);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    console.log(files)

    const handleClick = async (e) => {
    e.preventDefault();
    try {
        const list = [];
        const data = new FormData();
        Object.values(files).map(file => {
            data.append("picture", file);
            list.push(file.name.split('.')[0]);
        })
        const params = {
        ...info,
        img: list,
        };
        const resUpload = await uploadApi.upload(data);
        const resData = await productApi.createdProduct(params);
        console.log(resData);
        if (resData.data.message === 'CREATED' && resUpload.data.message === 'OK') {
            Swal.fire(
                'Created',
                'You have add 1 new product!',
                'success'
            )
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    } catch (err) {console.log(err)}
    };
    return (
    <div className="new">
        <Sidebar />
        <div className="newContainer">
        <Navbar />
        <div className="top">
            <h1>Add New Product</h1>
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

                {productInputs.map((input) => (
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
                <label>Is Sell</label>
                <select id="isSell" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                </div>
                <div className="selectRooms">
                <label>Description</label>
                <textarea id="description" onChange={handleChange} rows={5}>

                </textarea>
                </div>
                <button onClick={handleClick}>Send</button>
            </form>
            </div>
        </div>
        </div>
    </div>
    );
};

export default NewProduct;
