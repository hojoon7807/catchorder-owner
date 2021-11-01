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

const LoginForm = (props, { ...others }) => {
    const cookies = new Cookies();
    const classes = useStyles();
    const dispatch = useDispatch();
    const { jwtToken, isLoggedIn } = useSelector((state) => state.login);
    console.log(jwtToken);
    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

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
        }
        console.log(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = { id, password };
        try {
            const response = await axios.post('http://52.78.243.176/web/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            const { jwt } = response.data.result;
            cookies.set('jwtToken', jwt, {
                path: '/',
                secure: true,
                sameSite: false
            });
            dispatch({ type: 'login/SET_JWT', jwtToken: jwt, isLoggedIn: true });
            console.log(jwtToken);
            console.log(isLoggedIn);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            mb: 2
                        }}
                    >
                        <Typography variant="subtitle1">Sign in with ID</Typography>
                    </Box>
                </Grid>
            </Grid>
            <form noValidate onSubmit={onSubmit}>
                <FormControl fullWidth className={classes.loginInput}>
                    <InputLabel htmlFor="outlined-adornment-email-login">아이디</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-login"
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
                    {/* {touched.password && errors.password && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                            {' '}
                            {errors.password}{' '}
                        </FormHelperText>
                    )} */}
                </FormControl>
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(event) => setChecked(event.target.checked)}
                                name="checked"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Typography variant="subtitle1" component={Link} to="/pages/find-id" color="secondary" sx={{ textDecoration: 'none' }}>
                        아이디 찾기
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component={Link}
                        to="/pages/find-password"
                        color="secondary"
                        sx={{ textDecoration: 'none' }}
                    >
                        비밀번호 찾기
                    </Typography>
                </Stack>
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
                            로그인
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default LoginForm;
