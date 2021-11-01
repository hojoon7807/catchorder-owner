import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
// material-ui
import { Box, Button, Container, CssBaseline, Grid, IconButton, InputLabel, TextField, Typography, Input } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { PhotoCamera } from '@material-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookies } from 'cookies';
import { storageService } from 'fbase';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const StoreEdit = () => {
    const InputStyle = {
        display: 'none'
    };

    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoading, setLoading] = useState(true);
    const [storeName, setStoreName] = useState('');
    const [storeNum, setStoreNum] = useState('');
    const [storeAddr, setStoreAddr] = useState('');
    const [storeExplain, setStoreExplain] = useState('');
    const [storeimageString, setStoreImageString] = useState('');

    useEffect(() => {
        console.log(state);
        const storeObj = state.storeObj[0];
        setStoreName(storeObj.name);
        setStoreNum(storeObj.phone);
        setStoreExplain(storeObj.content);
        setStoreImageString(storeObj.image);
    }, []);
    const onChangeName = (e) => {
        const { value } = e.target;
        setStoreName(value);
    };

    const onChangeNum = (e) => {
        const { value } = e.target;
        setStoreNum(value);
    };

    const onChangeAddr = (e) => {
        const { value } = e.target;
        setStoreAddr(value);
    };

    const onChangeExplain = (e) => {
        const { value } = e.target;
        setStoreExplain(value);
    };

    const onChangeStoreImage = (e) => {
        e.stopPropagation();
        const {
            target: { files }
        } = e;
        const imageFile = files[0];
        const reader = new FileReader();
        console.log(imageFile.name);
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result }
            } = finishedEvent;
            setStoreImageString(result);
        };
        reader.readAsDataURL(imageFile);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = '';
        if (storeimageString !== '') {
            const fileRef = storageService.ref().child(`menu/${uuidv4()}`);
            const response = await fileRef.putString(storeimageString, 'data_url');
            imageUrl = await response.ref.getDownloadURL();
        }
        const editStoreObj = {
            name: storeName,
            image: imageUrl,
            phone: storeNum,
            address: storeAddr,
            content: storeExplain
        };
        const jwtToken = getCookies('jwtToken');
        try {
            const response = await axios.patch('http://52.78.243.176/web/store', editStoreObj, {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            console.log(response);
            if (response.status === 200) {
                navigate('/store');
            }
        } catch (e) {
            console.log(e);
        }
        console.log('submit!!');
    };

    return (
        <MainCard title="가게정보 수정">
            <Container maxWidth="xs">
                <Typography variant="body2">가게정보 수정 페이지</Typography>
                <Box component="form" noValidate mt={2} onSubmit={onSubmit}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="가게 이름"
                                id="outlined-start-adornment"
                                fullWidth
                                value={storeName}
                                onChange={onChangeName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-required"
                                label="가게 주소"
                                fullWidth
                                value={storeAddr}
                                onChange={onChangeAddr}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-required"
                                label="가게 전화번호"
                                fullWidth
                                value={storeNum}
                                onChange={onChangeNum}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="가게 설명"
                                multiline
                                rows={4}
                                fullWidth
                                value={storeExplain}
                                onChange={onChangeExplain}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                required
                                id="outlined-required"
                                label="가게 사진"
                                fullWidth
                                name="storeImg"
                                value={storeimageString}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <InputLabel htmlFor="icon-button-file3">
                                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                                    <PhotoCamera />
                                </IconButton>
                                <Input
                                    inputProps={{ accept: 'image/*' }}
                                    id="icon-button-file3"
                                    type="file"
                                    onChange={onChangeStoreImage}
                                    style={InputStyle}
                                />
                            </InputLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                가게 수정
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </MainCard>
    );
};

export default StoreEdit;
