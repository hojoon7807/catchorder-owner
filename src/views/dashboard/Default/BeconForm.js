import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { Box, Button, CardContent, Container, Grid, Input, TextField, Typography, IconButton, InputLabel } from '@material-ui/core';

// project imports
import { PhotoCamera } from '@material-ui/icons';
import { getCookies } from 'cookies';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const BeconForm = () => {
    const InputStyle = {
        display: 'none'
    };

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [storeimageString, setStoreImageString] = useState('');
    const [beaconId, setBeaconId] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const jwtToken = getCookies('jwtToken');
        console.log(jwtToken);
        try {
            const response = await axios.post(
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
            console.log(response);
        } catch (e) {
            console.log(e);
        }
        console.log('submit!!');
    };

    const onChange = (e) => {
        const { value } = e.target;
        setBeaconId(value);
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainCard title="비콘 추가">
            <Container maxWidth="xs">
                <Typography variant="body2">비콘 추가 페이지</Typography>
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
                                비콘 추가
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </MainCard>
    );
};

export default BeconForm;
