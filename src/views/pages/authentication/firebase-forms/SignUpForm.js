import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Cookies } from 'react-cookie';
// material-ui
import { makeStyles } from '@material-ui/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@material-ui/core';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Google from 'assets/images/icons/social-google.svg';

// style constant
const useStyles = makeStyles((theme) => ({
    redButton: {
        fontSize: '1rem',
        fontWeight: 500,
        backgroundColor: theme.palette.grey[50],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        color: theme.palette.grey[700],
        textTransform: 'none',
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.875rem'
        }
    },
    signDivider: {
        flexGrow: 1
    },
    signText: {
        cursor: 'unset',
        margin: theme.spacing(2),
        padding: '5px 56px',
        borderColor: `${theme.palette.grey[100]} !important`,
        color: `${theme.palette.grey[900]}!important`,
        fontWeight: 500
    },
    loginIcon: {
        marginRight: '16px',
        [theme.breakpoints.down('sm')]: {
            marginRight: '8px'
        }
    },
    loginInput: {
        ...theme.typography.customInput
    }
}));

//= ===========================|| FIREBASE - LOGIN ||============================//

const SignUpForm = (props, { ...others }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChangeLogin = (e) => {
        const {
            target: { name, value }
        } = e;
        if (name === 'id') {
            setId(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'checkPassword') {
            setCheckPassword(value);
        } else if (name === 'name') {
            setName(value);
        } else if (name === 'phone') {
            setPhone(value);
        } else if (name === 'email') {
            setEmail(value);
        }
        console.log(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = { id, password, passwordCheck: checkPassword, name, phone, email };
        try {
            const response = await axios.post('http://52.78.243.176/web/sign-up', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (response.status === 200) {
                navigate('/pages/login');
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <form noValidate onSubmit={onSubmit}>
                <FormControl fullWidth className={classes.loginInput}>
                    <InputLabel htmlFor="outlined-adornment-id-login">아이디</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-id-login"
                        type="text"
                        name="id"
                        value={id}
                        inputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                        onChange={onChangeLogin}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.loginInput}>
                    <InputLabel htmlFor="outlined-adornment-password-login">비밀번호</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password-login"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={onChangeLogin}
                        inputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.loginInput}>
                    <InputLabel htmlFor="outlined-adornment-checkPassword-login">비밀번호 확인</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-checkPassword-login"
                        type={showPassword ? 'text' : 'password'}
                        name="checkPassword"
                        value={checkPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={onChangeLogin}
                        inputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.loginInput}>
                    <InputLabel htmlFor="outlined-adornment-name-login">이름</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-name-login"
                        type="text"
                        name="name"
                        value={name}
                        inputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                        onChange={onChangeLogin}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.loginInput}>
                    <InputLabel htmlFor="outlined-adornment-phone-login">전화번호</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-phone-login"
                        type="text"
                        name="phone"
                        value={phone}
                        inputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                        onChange={onChangeLogin}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.loginInput}>
                    <InputLabel htmlFor="outlined-adornment-email-login">이메일</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-login"
                        type="email"
                        name="email"
                        value={email}
                        inputProps={{
                            classes: {
                                notchedOutline: classes.notchedOutline
                            }
                        }}
                        onChange={onChangeLogin}
                    />
                </FormControl>
                <Box
                    sx={{
                        mt: 2
                    }}
                >
                    <AnimateButton>
                        <Button
                            disableElevation
                            // disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            회원가입
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default SignUpForm;
