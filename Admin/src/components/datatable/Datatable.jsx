import './datatable.scss';
import {DataGrid} from '@mui/x-data-grid';
import {Link, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
import HashLoader from 'react-spinners/HashLoader';
import axiosClient from '../api/axiosClient';
import Swal from 'sweetalert2';

const Datatable = ({columns}) => {
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const res = await axiosClient.get(path);
        console.log(res.data.data);
        setList(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showCancelButton: true,
                confirmButtonText: 'Save',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const params = {id};
                    const res = await axiosClient.delete(path, {params});
                    if (res.data.message === 'DELETED') {
                        Swal.fire('Saved!', '', 'success');
                        await fetchData();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        });
                    }
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info');
                }
            });
        } catch (err) {}
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Link to={`/${path}/${params.row.id}`} style={{textDecoration: 'none'}}>
                            <div className='viewButton'>View</div>
                        </Link>
                        <div className='deleteButton' onClick={() => handleDelete(params.row.id)}>
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    const cssOverride = {
        display: 'block',
        margin: '400px auto',
        verticalAlign: 'middle',
    };
    if (loading) return <HashLoader cssOverride={cssOverride} loading={loading} color='#6439FF' />;
    return (
        <div className='datatable'>
            <div className='datatableTitle'>
                {path}
                <div className='group-action'>
                    {path === 'warehouse-receipt' && (
                        <Link to={`/${path}/new`} className='link'>
                            Export
                        </Link>
                    )}
                    {path === 'order-bill' && (
                        <Link to={`/${path}/new`} className='link'>
                            Export
                        </Link>
                    )}
                    <Link to={`/${path}/new`} className='link'>
                        Add New
                    </Link>
                </div>
            </div>
            <DataGrid
                className='datagrid'
                rows={list}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row.id}
            />
        </div>
    );
};

export default Datatable;
