import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {productInputs, userInputs} from './formSource';
import './style/dark.scss';
import {useContext} from 'react';
import {DarkModeContext} from './context/darkModeContext';
import {AuthContext} from './context/AuthContext';
import {
    productColumns,
    orderBillColumns,
    warehouseReceiptColumns,
    warehouseExportColumns,
    userColumns,
    accountColumns,
} from './datatablesource';
import NewRoom from './pages/newRoom/NewRoom';
import Statistic from './pages/statistics/Statistics';
import NewUser from './pages/newUser/NewUser';
import NewAccount from './pages/newAccount/NewAccount';
import NewProduct from './pages/newProduct/NewProduct';
import NewWarehouseExport from './pages/newWarehouseExport/NewWarehouseExport';
import NewWarehouseReceipt from './pages/newWarehouseReceipt/NewWareHouseReceipt';
import NewOrderBill from './pages/newOrderBill/NewOrderBill';
import UpdateOrderBill from './pages/newOrderBill/UpdateOrderBill';

function App() {
    const {darkMode} = useContext(DarkModeContext);

    const ProtectedRoute = ({children}) => {
        const {user} = useContext(AuthContext);

        if (!user) {
            return <Navigate to='/login' />;
        }

        return children;
    };

    return (
        <div className={darkMode ? 'app dark' : 'app'}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route path='login' element={<Login />} />
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route path='users'>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={userColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=':userId'
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='new'
                                element={
                                    <ProtectedRoute>
                                        <NewUser />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path='account'>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={accountColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=':accountId'
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='new'
                                element={
                                    <ProtectedRoute>
                                        <NewAccount />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path='product'>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={productColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=':productId'
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='new'
                                element={
                                    <ProtectedRoute>
                                        <NewProduct />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path='order-bill'>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={orderBillColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=':orderBillId'
                                element={
                                    <ProtectedRoute>
                                        <UpdateOrderBill />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='new'
                                element={
                                    <ProtectedRoute>
                                        <NewOrderBill />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path='warehouse-receipt'>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={warehouseReceiptColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=':warehouseReceiptId'
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='new'
                                element={
                                    <ProtectedRoute>
                                        <NewWarehouseReceipt />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path='warehouse-export'>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List columns={warehouseExportColumns} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=':warehouseExportId'
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path='new'
                                element={
                                    <ProtectedRoute>
                                        <NewWarehouseExport />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path='chart'>
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <Statistic />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
