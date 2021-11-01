import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import MainCard from 'ui-component/cards/MainCard';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
// material-ui
import { Box, Button, CardContent, Container, Grid, Input, TextField, Typography, IconButton, InputLabel } from '@material-ui/core';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { PhotoCamera } from '@material-ui/icons';
import { storageService } from 'fbase';
import { getCookies } from 'cookies';
import { useNavigate } from 'react-router-dom';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const StoreForm = () => {
    const InputStyle = {
        display: 'none'
    };
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [storeimageString, setStoreImageString] = useState('');
    const [storeAuthImage, setStoreAuthImage] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeNum, setStoreNum] = useState('');
    const [storeAddr, setStoreAddr] = useState('');
    const [storeExplain, setStoreExplain] = useState('');
    const [storeAuthNum, setStoreAuthNum] = useState('');

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

    const onChangeAuthNum = (e) => {
        const { value } = e.target;
        setStoreAuthNum(value);
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

    const onChangeStoreAuthImage = (e) => {
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
            setStoreAuthImage(result);
        };
        reader.readAsDataURL(imageFile);
    };

    useEffect(() => {
        setLoading(false);
    }, []);
    const onSubmit = async (e) => {
        console.log(storeName, storeNum, storeAddr);
        e.preventDefault();
        let imageUrl = '';
        let imageUrl2 = '';
        if (storeimageString !== '' && storeAuthImage !== '') {
            const fileRef = storageService.ref().child(`menu/${uuidv4()}`);
            const response = await fileRef.putString(storeimageString, 'data_url');
            const fileRef2 = storageService.ref().child(`menu/${uuidv4()}`);
            const response2 = await fileRef2.putString(storeAuthImage, 'data_url');
            imageUrl = await response.ref.getDownloadURL();
            imageUrl2 = await response2.ref.getDownloadURL();
        }
        const storeObj = {
            name: storeName,
            image: imageUrl,
            phone: storeNum,
            address: storeAddr,
            content: storeExplain,
            licenseNumber: storeAuthNum,
            licenseImage: imageUrl2
        };
        const jwtToken = getCookies('jwtToken');
        try {
            const response = await axios.post('http://52.78.243.176/web/store', storeObj, {
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
        <MainCard title="가게 추가">
            <Container maxWidth="xs">
                <Typography variant="body2">가게 추가 페이지</Typography>
                <Box component="form" noValidate mt={2} onSubmit={onSubmit}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="가게 이름"
                                id="outlined-start-adornment"
                                fullWidth
                                name="storeName"
                                onChange={onChangeName}
                                value={storeName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-required"
                                label="가게 주소"
                                fullWidth
                                name="storeAddr"
                                onChange={onChangeAddr}
                                value={storeAddr}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-required"
                                label="가게 전화번호"
                                fullWidth
                                name="storeNum"
                                onChange={onChangeNum}
                                value={storeNum}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="가게 설명"
                                multiline
                                rows={4}
                                fullWidth
                                name="storeExplain"
                                onChange={onChangeExplain}
                                value={storeExplain}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                required
                                id="outlined-required"
                                label="가게 사진"
                                fullWidth
                                value={storeimageString}
                                name="storeImg"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <InputLabel htmlFor="icon-button-file1">
                                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                                    <PhotoCamera />
                                </IconButton>
                                <Input
                                    inputProps={{ accept: 'image/*' }}
                                    id="icon-button-file1"
                                    type="file"
                                    onChange={onChangeStoreImage}
                                    style={InputStyle}
                                />
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="outlined-required"
                                label="사업자 등록번호"
                                fullWidth
                                name="storeAuthNum"
                                onChange={onChangeAuthNum}
                                value={storeAuthNum}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                required
                                id="outlined-required"
                                label="사업자 등록사진"
                                fullWidth
                                value={storeAuthImage}
                                name="storeAuthImg"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <InputLabel htmlFor="icon-button-file2">
                                <IconButton color="primary" aria-label="upload picture" component="span" size="large">
                                    <PhotoCamera />
                                </IconButton>
                                <Input
                                    inputProps={{ accept: 'image/*' }}
                                    id="icon-button-file2"
                                    type="file"
                                    onChange={onChangeStoreAuthImage}
                                    style={InputStyle}
                                />
                            </InputLabel>
                        </Grid>
                        <Grid item xs={9}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                가게 추가
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </MainCard>
    );
};

export default StoreForm;
