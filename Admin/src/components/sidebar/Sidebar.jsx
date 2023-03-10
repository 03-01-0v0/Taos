import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import OrderBill from '@mui/icons-material/TextSnippet';
import Phone from '@mui/icons-material/Smartphone';
import Warehouse from '@mui/icons-material/Warehouse';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Link, useNavigate} from 'react-router-dom';
import {DarkModeContext} from '../../context/darkModeContext';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';
import axiosClient from '../api/axiosClient';

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext);

    const {loading, error, dispatcher} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClickLogout = async (e) => {
        const res = await axiosClient.post('/sign-out');
        dispatch({type: 'LOGOUT', payload: res.data.details});
        await localStorage.removeItem('token');
        await localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className='sidebar'>
            <div className='top'>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <span className='logo'>Taos admin</span>
                </Link>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <p className='title'>MAIN</p>
                    <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                    <p className='title'>LISTS</p>
                    <Link to='/users' style={{textDecoration: 'none'}}>
                        <li>
                            <PersonOutlineIcon className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to='/account' style={{textDecoration: 'none'}}>
                        <li>
                            <PersonOutlineIcon className='icon' />
                            <span>Accounts</span>
                        </li>
                    </Link>
                    <Link to='/product' style={{textDecoration: 'none'}}>
                        <li>
                            <Phone className='icon' />
                            <span>Products</span>
                        </li>
                    </Link>
                    <Link to='/order-bill' style={{textDecoration: 'none'}}>
                        <li>
                            <OrderBill className='icon' />
                            <span>Order Bill</span>
                        </li>
                    </Link>
                    <Link to='/warehouse-receipt' style={{textDecoration: 'none'}}>
                        <li>
                            <Warehouse className='icon' />
                            <span>Warehouse Receipt</span>
                        </li>
                    </Link>
                    <Link to='/warehouse-export' style={{textDecoration: 'none'}}>
                        <li>
                            <Warehouse className='icon' />
                            <span>Warehouse Export</span>
                        </li>
                    </Link>
                    <p className='title'>STATISTICS</p>
                    <Link to='/chart'  style={{textDecoration: 'none'}}>
                        <li>
                            <InsertChartIcon className='icon' />
                            <span>Chart</span>
                        </li>
                    </Link>
                    <li>
                        <NotificationsNoneIcon className='icon' />
                        <span>Notifications</span>
                    </li>
                    <p className='title'>USER</p>
                    <li>
                        <AccountCircleOutlinedIcon className='icon' />
                        <span>Profile</span>
                    </li>
                    <li>
                        <ExitToAppIcon className='icon' onClick={handleClickLogout} />
                        <span onClick={handleClickLogout}>Logout</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'>
                <div className='colorOption' onClick={() => dispatch({type: 'LIGHT'})}></div>
                <div className='colorOption' onClick={() => dispatch({type: 'DARK'})}></div>
            </div>
        </div>
    );
};

export default Sidebar;
