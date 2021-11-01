import React, { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { Box, Button, Divider, Grid, TextField, Typography, Container } from '@material-ui/core';
import axios from 'axios';
import { getCookies, deleteCookies } from 'cookies';

// project imports

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const UserEdit = () => {
    const [isLoading, setLoading] = useState(true);
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const jwtToken = getCookies('jwtToken');

    useEffect(() => {
        setLoading(false);
    }, []);

    const onDeleteClick = async () => {
        const ok = window.confirm('정말 회원정보를 지우겠습니까??');
        if (ok) {
            try {
                const jwtToken = getCookies('jwtToken');
                const response = await axios.delete('http://52.78.243.176/web/store', {
                    headers: {
                        'x-access-token': jwtToken
                    }
                });
                if (response.status === 200) {
                    deleteCookies('jwtToken');
                    window.location.reload(false);
                }
            } catch (e) {
                console.log(e);
            }
            console.log('delete');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        const ok = window.confirm('정말 회원정보를 수정하겠습니까??');
        if (ok) {
            if (id) {
                try {
                    const response = await axios.patch(
                        'http://52.78.243.176/web/account/id',
                        { id },
                        {
                            headers: {
                                'x-access-token': jwtToken
                            }
                        }
                    );
                    console.log(response);
                    if (response.data.code === 200) {
                        deleteCookies('jwtToken');
                        window.location.reload(false);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            if (password) {
                try {
                    const response = await axios.patch(
                        'http://52.78.243.176/web/account/password',
                        { password },
                        {
                            headers: {
                                'x-access-token': jwtToken
                            }
                        }
                    );
                    console.log(response);
                    if (response.data.code === 200) {
                        deleteCookies('jwtToken');
                        window.location.reload(false);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
            console.log('delete');
        }
    };

    const onChangeId = (e) => {
        const { value } = e.target;
        setId(value);
        console.log(value);
    };

    const onChangePassword = (e) => {
        const { value } = e.target;
        setPassword(value);
        console.log(value);
    };

    return (
        <MainCard title="회원정보 수정">
            <Container maxWidth="xs">
                <Typography variant="body2">회원정보 수정 페이지</Typography>
                <Box component="form" noValidate mt={2} onSubmit={onSubmit}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12}>
                            <TextField
                                label="아이디"
                                id="outlined-start-adornment2"
                                fullWidth
                                type="text"
                                onChange={onChangeId}
                                value={id}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="비밀번호"
                                id="outlined-start-adornment"
                                fullWidth
                                type="password"
                                onChange={onChangePassword}
                                value={password}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                회원정보 수정
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Divider sx={{ marginTop: '15px' }} />
            <Box sx={{ marginTop: '15px' }}>
                <Button variant="text" color="error" onClick={onDeleteClick}>
                    회원 탈퇴
                </Button>
            </Box>
        </MainCard>
    );
};

export default UserEdit;
