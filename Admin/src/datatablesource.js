export const userColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'name',
        headerName: 'User Name',
        width: 400,
        renderCell: (params) => {
            return (
                <div className='cellWithImg'>
                    <img
                        className='cellImg'
                        src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                        alt='avatar'
                    />
                    {params.row.name}
                </div>
            );
        },
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 360,
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 300,
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone',
        width: 220,
    },
];

export const hotelColumns = [
    {field: '_id', headerName: 'ID', width: 250},
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 100,
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'city',
        headerName: 'City',
        width: 100,
    },
];

export const roomColumns = [
    {field: '_id', headerName: 'ID', width: 70},
    {
        field: 'title',
        headerName: 'Title',
        width: 230,
    },
    {
        field: 'desc',
        headerName: 'Description',
        width: 200,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 100,
    },
    {
        field: 'maxPeople',
        headerName: 'Max People',
        width: 100,
    },
];

export const accountColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'authorizationId',
        headerName: 'Authorization',
        width: 200,
        renderCell: (params) => {
            return (
                <div className='cellWithImg'>
                    <img
                        className='cellImg'
                        src={params.row.img || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                        alt='avatar'
                    />
                    {/* {params.row.name} */}
                </div>
            );
        },
    },
    {
        field: 'userId',
        headerName: 'User ID',
        width: 100,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 300,
    },
    {
        field: 'password',
        headerName: 'Password',
        width: 350,
    },
    {
        field: 'token',
        headerName: 'Token',
        width: 330,
    },
];

export const productColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'productTypeId',
        headerName: 'ProductType ID',
        width: 150,
    },
    {
        field: 'unitId',
        headerName: 'User ID',
        width: 100,
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 300,
    },
    {
        field: 'img',
        headerName: 'Image',
        width: 350,
        renderCell: (params) => {
            return (
                <div className='cellWithImg'>
                    {params.row.img?.map((image) => {
                        return (
                            <img
                                style={{height: '50px', width: 'auto'}}
                                className='cellImg'
                                src={`http://localhost:3001/assets/${image}.png`}
                                alt='avatar'
                            />
                        );
                    })}
                </div>
            );
        },
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 130,
    },
    {
        field: 'purchasePrice',
        headerName: 'Purchase Price',
        width: 130,
    },
    {
        field: 'isSell',
        headerName: 'Status',
        width: 130,
        renderCell: (params) => {
            return (
                <div className='cellWithStatus'>
                    <div className={`cellWithStatus ${params.row.isSell ? 'active' : 'pending'}`}>
                        {params.row.isSell ? 'Còn bán' : 'Không còn bán'}
                    </div>
                </div>
            );
        },
    },
    {
        field: 'shortDescription',
        headerName: 'Short Description',
        width: 230,
    },
];

export const orderBillColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'name',
        headerName: 'Product',
        width: 330,
    },
    {
        field: 'orderId',
        headerName: 'Order ID',
        width: 200,
    },
    {
        field: 'price',
        headerName: 'Price',
        width: 200,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 100,
    },
    {
        field: 'color',
        headerName: 'Color',
        width: 100,
        renderCell: (params) => {
            return (
                <div style={{backgroundColor:params.row.color, color: params.row.color}} className='cellWithColor'>
                </div>
            );
        },
    },
    {
        field: 'capacity',
        headerName: 'Capacity',
        width: 150,
    },
    {
        field: 'statusId',
        headerName: 'Status',
        width: 200,
        renderCell: (params) => {
            return (
                <div className='cellWithStatus'>
                    <div className={`cellWithStatus ${params.row.statusId === 1 ? 'active' : 'pending'}`}>
                        {params.row.statusId ? 'Đã xác nhận' : 'Chưa xác nhận'}
                    </div>
                </div>
            );
        },
    },
];

export const warehouseReceiptColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'name',
        headerName: 'Product',
        width: 330,
    },
    {
        field: 'creatorId',
        headerName: 'Creator ID',
        width: 200,
    },
    {
        field: 'productId',
        headerName: 'Product ID',
        width: 200,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 100,
    },
    {
        field: 'color',
        headerName: 'Color',
        width: 100,
        renderCell: (params) => {
            return (
                <div style={{backgroundColor:params.row.color, color: params.row.color}} className='cellWithColor'>
                </div>
            );
        },
    },
    {
        field: 'capacity',
        headerName: 'Capacity',
        width: 150,
    },
    {
        field: 'statusId',
        headerName: 'Status',
        width: 200,
        renderCell: (params) => {
            return (
                <div className='cellWithStatus'>
                    <div className={`cellWithStatus ${params.row.statusId === 1 ? 'active' : 'pending'}`}>
                        {params.row.statusId ? 'Đã xác nhận' : 'Chưa xác nhận'}
                    </div>
                </div>
            );
        },
    },
];

export const warehouseExportColumns = [
    {field: 'id', headerName: 'ID', width: 70},
    {
        field: 'productId',
        headerName: 'Product ID',
        width: 200,
    },
    {
        field: 'name',
        headerName: 'Product',
        width: 330,
    },
    {
        field: 'creatorId',
        headerName: 'Creator ID',
        width: 200,
    },
    {
        field: 'userName',
        headerName: 'Receiptor',
        width: 200,
    },
    {
        field: 'quantity',
        headerName: 'Quantity',
        width: 100,
    },
    {
        field: 'color',
        headerName: 'Color',
        width: 100,
        renderCell: (params) => {
            return (
                <div style={{backgroundColor:params.row.color, color: params.row.color}} className='cellWithColor'>
                </div>
            );
        },
    },
    {
        field: 'capacity',
        headerName: 'Capacity',
        width: 150,
    },
];
