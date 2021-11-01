import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
// material-ui
import { Box, Button, CardContent, Container, Grid, Input, TextField, Typography, IconButton, InputLabel } from '@material-ui/core';

// project imports
import { PhotoCamera } from '@material-ui/icons';
import { getCookies } from 'cookies';
import { useLocation, useNavigate } from 'react-router-dom';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const CategoryForm = () => {
    const state = useLocation();
    const navigate = useNavigate();
    console.log(state);
    const InputStyle = {
        display: 'none'
    };

    const [isLoading, setLoading] = useState(true);
    const [categoryString, setCategoryString] = useState('');

    useEffect(() => {
        setLoading(false);
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        const jwtToken = getCookies('jwtToken');
        try {
            const response = await axios.post(
                'http://52.78.243.176/web/category',
                { name: categoryString },
                {
                    headers: {
                        'x-access-token': jwtToken
                    }
                }
            );
            console.log(response);
            if (response.status === 200) {
                navigate('/store/menu');
            }
        } catch (e) {
            console.log(e);
        }
        console.log('submit!!');
    };

    const onChange = (e) => {
        const { value } = e.target;
        setCategoryString(value);
    };

    return (
        <MainCard title="카테고리 추가">
            <Container maxWidth="xs">
                <Typography variant="body2">카테고리 추가 페이지</Typography>
                <Box component="form" noValidate mt={2} onSubmit={onSubmit}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="카테고리 명"
                                id="outlined-start-adornment"
                                fullWidth
                                onChange={onChange}
                                value={categoryString}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                카테고리 추가
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </MainCard>
    );
};

export default CategoryForm;
