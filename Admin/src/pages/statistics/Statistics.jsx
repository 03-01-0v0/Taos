import Chart from '../../components/chart/Chart';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axiosClient from '../../components/api/axiosClient';
import "./statistic.scss"
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid } from 'recharts';
import { Tooltip } from '@mui/material';

const Statistic = () => {
    const [turnOver, setTurnOver] = useState(0);
    const [amount, setAmount] = useState(0);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);

    const fetchData = async () => {
        const resTurnOver = await axiosClient.get('order-bill/statistic');
        let totalTurnOver = 0;
        for (const obj of resTurnOver.data.data) {
            totalTurnOver += parseInt(obj.sum);
        }
        setData1(resTurnOver.data.data);
        setTurnOver(totalTurnOver);
        const resAmount = await axiosClient.get('order-bill/count-statistic');
        let totalAmount = 0;
        for (const obj of resAmount.data.data) {
            totalAmount += parseInt(obj.sum);
        }
        setData2(resAmount.data.data);
        setAmount(totalAmount);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='statistic'>
            <Sidebar />
            <div className="statisticContainer">
                <Navbar/>
                <div className='chartGroup'>
                    <div className='wrapper'>
                        <Chart path='order-bill/count-statistic' title="Last 6 Months (Revenue)" aspect={2 / 1} />
                    </div>
                    <div className='wrapper'>
                        <Chart path='order-bill/statistic' title="Last 6 Months (Revenue)" aspect={2 / 1} />
                    </div>
                    <div className='wrapper'>
                    <BarChart
                        width={750}
                        height={300}
                        data={data1}
                        barSize={25}
                        margin={{left: 50}}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar margin={{top: 10, right: 30, left: 0, bottom: 0}} dataKey="sum" fill="#8884d8" background={{ fill: "#eee" }} />
                    </BarChart>
                    </div>
                    <div className='wrapper'>
                        <div className='data'>
                            <div className='title'>Tổng quan</div>
                            <div className='content'>
                                <div>Tổng doanh thu: {turnOver}</div>
                                <div>Tổng số lượng sản phẩm: {amount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistic;