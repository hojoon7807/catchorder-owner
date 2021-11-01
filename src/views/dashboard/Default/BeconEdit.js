import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { Box, Button, CardContent, Container, Grid, Input, TextField, Typography, IconButton, InputLabel } from '@material-ui/core';

// project imports
import { PhotoCamera } from '@material-ui/icons';
import { getCookies } from 'cookies';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// ===========================|| DEFAULT DASHBOARD ||=========================== //

const BeconEdit = (props) => {
    const InputStyle = {
        display: 'none'
    };
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [beaconId, setBeaconId] = useState('');

    const onChange = (e) => {
        const { value } = e.target;
        setBeaconId(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const jwtToken = getCookies('jwtToken');
        try {
            const response = await axios.patch(
                'http://52.78.243.176/web/beacon',
                { beaconId },
                {
                    headers: {
                        'x-access-token': jwtToken
                    }
                }
            );
            if (response.status === 200) {
                navigate('/store/becon');
            }
            console.log(response.result);
        } catch (e) {
            console.log(e);
        }
        console.log('submit!!');
    };

    useEffect(() => {
        console.log(state.beacons[0].beaconId);
        setBeaconId(state.beacons[0].beaconId);
        setLoading(false);
    }, []);

    return (
        <MainCard title="비콘 수정">
            <Container maxWidth="xs">
                <Typography variant="body2">비콘 수정 페이지</Typography>
                <Box component="form" noValidate mt={2} onSubmit={onSubmit}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="비콘 ID"
                                id="outlined-start-adornment"
                                fullWidth
                                value={beaconId}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                비콘 수정
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </MainCard>
    );
};

export default BeconEdit;
