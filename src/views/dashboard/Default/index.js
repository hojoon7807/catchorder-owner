import React, { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

// material-ui
import {
    Paper,
    Table,
    TableContainer,
    TableCell,
    TableBody,
    TableHead,
    TableRow,
    Avatar,
    Button,
    Box,
    Typography,
    Divider,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { DeleteForever, Image, Delete, Settings, Update, Preview } from '@material-ui/icons';
import { useNavigate } from 'react-router';
import { getCookies } from 'cookies';
import axios from 'axios';
// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Dashboard = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [dialog, setdialog] = useState({ open: false, type: '', description: '', handle: null });
    const [open, setOpen] = useState(false);
    const [storeObj, setStoreObj] = useState([]);
    const getStore = async () => {
        try {
            const jwtToken = getCookies('jwtToken');
            const response = await axios.get('http://52.78.243.176/web/store', {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            const { result } = response.data;
            if (response.data.code === 400) {
                setStoreObj([]);
            } else {
                setStoreObj([result]);
            }
            console.log(response);
            console.log(storeObj);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getStore();
    }, []);

    const storeCreateClick = (e) => {
        setOpen(false);
        navigate('write');
    };

    const storeDeleteClick = async (e) => {
        try {
            const jwtToken = getCookies('jwtToken');
            const response = await axios.delete('http://52.78.243.176/web/store', {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            const { result } = response.data;
            if (response.data.code === 200) {
                window.location.reload(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const test = (e) => {
        const type = e.target.outerText;
        if (type === '?????? ??????') {
            setdialog({ open: true, type, description: '?????? ?????? ???????????? ??????????????????????', handle: storeCreateClick });
        } else if (type === '?????? ??????') {
            setdialog({ open: true, type, description: '??????????????? ?????? ????????????????', handle: storeDeleteClick });
        }
    };

    const handleClickOpen = (e) => {
        setOpen(true);
        console.log(e.target.outerText);
    };

    const handleClose = () => {
        setdialog((prev) => ({ ...prev, open: false }));
    };

    const storeUpdateClick = (e) => {
        navigate('edit', { state: { storeObj } });
    };

    const storeBeaconClick = (e) => {
        navigate('becon');
    };

    const storeMenuClick = () => {
        navigate('menu');
    };

    return (
        <MainCard title="?????? ??????">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1400 }} aria-label="storeTable">
                    <TableHead>
                        <TableRow>
                            <TableCell>?????? ??????</TableCell>
                            <TableCell align="center">?????? ??????</TableCell>
                            <TableCell align="center">????????????</TableCell>
                            <TableCell align="center">?????? ??????</TableCell>
                            <TableCell align="center">???????????? ??????</TableCell>
                            <TableCell align="center">???????????? ??????</TableCell>
                            <TableCell align="center">?????? ??????</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {storeObj.map((store) => (
                            <TableRow key={store.storeIdx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" align="center">
                                    <Avatar src={store.image} sx={{ width: 80, height: 80 }} variant="square" alt="no" />
                                </TableCell>
                                <TableCell align="center">{store.name}</TableCell>
                                <TableCell align="center">{store.phone}</TableCell>
                                <TableCell align="center">
                                    <Button variant="text" endIcon={<Settings />} onClick={storeMenuClick}>
                                        ?????? ??????
                                    </Button>
                                </TableCell>
                                <TableCell align="center" onClick={storeUpdateClick}>
                                    <Button variant="text" endIcon={<Update />}>
                                        ?????? ??????
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="text" endIcon={<Delete />} onClick={test}>
                                        ?????? ??????
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="text" endIcon={<Settings />} onClick={storeBeaconClick}>
                                        ?????? ??????
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            <Box sx={{ marginTop: '15px' }} onClick={test}>
                <Button variant="text" color="error">
                    ?????? ??????
                </Button>
            </Box>
            <Dialog
                open={dialog.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{dialog.type}</DialogTitle>
                <DialogContent dialog>
                    <DialogContentText id="alert-dialog-description">{dialog.description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>??????</Button>
                    <Button onClick={dialog.handle} autoFocus>
                        ??????
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default Dashboard;
