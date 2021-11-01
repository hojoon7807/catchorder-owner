import React, { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

// material-ui
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Paper,
    Divider,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { Delete, Update } from '@material-ui/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCookies } from 'cookies';
import axios from 'axios';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Becon = () => {
    const [isLoading, setLoading] = useState(true);
    const [beacons, setBeacons] = useState([]);
    const navigate = useNavigate();
    const [dialog, setdialog] = useState({ open: false, type: '', description: '', onClick: null });
    const [open, setOpen] = useState(false);
    const jwtToken = getCookies('jwtToken');

    const getBeacon = async () => {
        try {
            const response = await axios.get('http://52.78.243.176/web/beacon', {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            const {
                result: { beaconId }
            } = response.data;
            setBeacons([{ beaconId }]);
            console.log(beaconId);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getBeacon();
        setLoading(false);
    }, []);

    const rows = [
        {
            beconId: 'id123'
        },
        {
            beconId: 'id1234'
        },
        {
            beconId: 'id1'
        },
        {
            beconId: 'id123455'
        }
    ];

    const handleClose = () => {
        setdialog((prev) => ({ ...prev, open: false }));
    };

    const beconCreateClick = (e) => {
        navigate('write');
    };

    const beconEditClick = () => {
        navigate('edit', {
            state: { beacons }
        });
    };

    const beaconDelete = async () => {
        try {
            const response = await axios.delete('http://52.78.243.176/web/beacon', { headers: { 'x-access-token': jwtToken } });
            console.log(response.result);
        } catch (e) {
            console.log(e);
        }
        console.log('submit!!');
    };

    const test = (e) => {
        const type = e.target.outerText;
        if (type === '비콘 추가') {
            setdialog({ open: true, type, description: '비콘 추가 페이지로 이동하겠습니까?', onClick: beconCreateClick });
        } else if (type === '비콘 삭제') {
            setdialog({ open: true, type, description: '비콘정보를 삭제 하겠습니까?', onClick: beaconDelete });
        }
    };

    return (
        <MainCard title="비콘 관리">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1400 }} aria-label="categoryTable">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">비콘 ID</TableCell>
                            <TableCell align="center">비콘 수정</TableCell>
                            <TableCell align="center">비콘 삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {beacons.map((beacon) => (
                            <TableRow key={beacon.beaconId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center">{beacon.beaconId}</TableCell>
                                <TableCell align="center">
                                    <Button variant="text" endIcon={<Update />} onClick={beconEditClick}>
                                        비콘 수정
                                    </Button>
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="text" endIcon={<Delete />} onClick={test}>
                                        비콘 삭제
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
                    비콘 추가
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
                    <Button onClick={handleClose}>취소</Button>
                    <Button onClick={dialog.onClick} autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default Becon;
