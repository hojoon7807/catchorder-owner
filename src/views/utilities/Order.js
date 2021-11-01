import React, { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { Button, Card, CardActions, CardContent, Container, Grid, Paper, Typography, Box } from '@material-ui/core';
import { getCookies } from 'cookies';
import axios from 'axios';

// project imports

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Order = () => {
    const [isLoading, setLoading] = useState(true);
    const jwtToken = getCookies('jwtToken');
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState('주문 접수');

    const getOrder = async () => {
        try {
            const response = await axios.get('http://52.78.243.176/web/orders', {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            const { result } = response.data;
            console.log(result);
            if (response.data.code === 400) {
                setOrders([]);
            } else {
                setOrders(result);
            }
        } catch (e) {
            console.log(e);
        }
    };
    const onClick = async (e) => {
        const { innerText, id, name } = e.target;
        if (innerText === '주문 접수') {
            const ok = window.confirm('주문을 접수하겠습니까??');
            if (ok) {
                try {
                    const respose = await axios.patch(
                        `http://52.78.243.176/web/orders/${id}`,
                        { statusIdx: 2 },
                        {
                            headers: {
                                'x-access-token': jwtToken
                            }
                        }
                    );
                    if (respose.data.code === 200) {
                        e.target.innerText = '조리 중';
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        } else {
            const ok = window.confirm('조리 완료하겠습니까??');
            if (ok) {
                try {
                    const respose = await axios.patch(
                        `http://52.78.243.176/web/orders/${id}`,
                        { statusIdx: 3 },
                        {
                            headers: {
                                'x-access-token': jwtToken
                            }
                        }
                    );
                    if (respose.data.code === 200) {
                        e.target.innerText = '조리 완료';
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        console.log(e.target.name);
    };

    useEffect(() => {
        getOrder();
        setLoading(false);
        console.log(orders);
    }, []);
    return (
        <MainCard title="주문 현황">
            <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
                {orders.map((order) => (
                    <Grid item xs={3}>
                        <Box sx={{ minWidth: 200 }}>
                            <Card variant="outlined" key={orders.orderIdx}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {order.receiptId}
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {order.isTakeOut === 'Y' ? '포장' : '매장'}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {order.createdAt}
                                    </Typography>
                                    {order.menu.map((menu) => (
                                        <Grid container justifyContent="space-between">
                                            <Grid>
                                                <Typography variant="h5">{menu.name}</Typography>
                                            </Grid>
                                            <Grid>
                                                <Typography variant="h5">{menu.amount}</Typography>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </CardContent>
                                <CardActions>
                                    {order.statusIdx === 1 ? (
                                        <Button size="medium" onClick={onClick} id={order.orderIdx} name={order.statusIdx}>
                                            주문 접수
                                        </Button>
                                    ) : (
                                        <Button size="medium" onClick={onClick} id={order.orderIdx} name={order.statusIdx}>
                                            조리 중
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

export default Order;
