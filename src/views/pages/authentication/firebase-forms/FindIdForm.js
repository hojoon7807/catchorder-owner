import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
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

const FindIdForm = (props, { ...others }) => {
    const classes = useStyles();
    const customization = useSelector((state) => state.customization);
    const scriptedRef = useScriptRef();
    const [checked, setChecked] = useState(true);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const [showId, setShowId] = useState(false);
    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    const onChangeLogin = (e) => {
        const {
            target: { name, value }
        } = e;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        }
        console.log(value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = { name, email };
        try {
            const response = await axios.post('http://52.78.243.176/web/account/id', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const {
                result: { id }
            } = response.data;
            if (id) {
                setShowId(true);
                setId(id);
            }
            console.log(id);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <form noValidate onSubmit={onSubmit}>
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
                {showId ? (
                    <div>
                        <Grid item xs={12} marginTop="10px">
                            <Grid item container direction="column" alignItems="center" xs={12}>
                                <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                    업주님의 아이디는 : {id} 입니다.
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <div />
                )}
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
                            아이디 찾기
                        </Button>
                    </AnimateButton>
                </Box>
            </form>
        </>
    );
};

export default FindIdForm;
