import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

// material-ui
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableBody,
    Button,
    Avatar,
    Divider,
    Box,
    Switch,
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
import { Delete, ExpandMore, ExpandOutlined, Settings, Update } from '@material-ui/icons';
import { getCookies } from 'cookies';
import axios from 'axios';
import { storageService } from 'fbase';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Menu = () => {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [checked, setChecked] = useState(false);
    const jwtToken = getCookies('jwtToken');
    const [categories, setCategoryies] = useState([]);
    const [menus, setMenus] = useState([]);
    const [dialog, setdialog] = useState({ open: false, type: '', description: '', onClick: null });

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const getMenu = async () => {
        try {
            const response = await axios.get('http://52.78.243.176/web/menu', {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            const {
                result: { category, menu }
            } = response.data;
            setCategoryies(category);
            setMenus(menu);
            console.log(category, menu);
        } catch (e) {
            console.log(e);
        }
    };

    const categoryDelete = async (id) => {
        try {
            const response = await axios.delete(`http://52.78.243.176/web/category/${id}`, {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            console.log(response);
            if (response.status === 200) {
                setCategoryies(categories.filter((category) => category.menuCategoryIdx !== id));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getMenu();
        setLoading(false);
    }, []);

    const categoryCreateClick = (e) => {
        navigate('/store/category/write');
    };

    const menuCreateClick = (e) => {
        navigate('write', { state: { categories } });
    };

    const menuEditClick = (menu) => {
        navigate('edit', {
            state: { menu }
        });
    };

    const onClickSwitch = async (e) => {
        const { checked, value, id } = e.target;
        console.log(checked, value, id);
        if (checked) {
            try {
                const response = await axios.patch(
                    `http://52.78.243.176/web/menu/${id}`,
                    { isSoldOut: 'Y' },
                    {
                        headers: {
                            'x-access-token': jwtToken
                        }
                    }
                );
                console.log(response);
                // if (response.status === 200) {
                //     navigate('/store');
                // }
            } catch (e) {
                console.log(e);
            }
        } else if (!checked) {
            try {
                const response = await axios.patch(
                    `http://52.78.243.176/web/menu/${id}`,
                    { isSoldOut: 'N' },
                    {
                        headers: {
                            'x-access-token': jwtToken
                        }
                    }
                );
                console.log(response);
                // if (response.status === 200) {
                //     navigate('/store');
                // }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleClose = () => {
        setdialog((prev) => ({ ...prev, open: false }));
    };

    const menuDelete = async (idx) => {
        try {
            const response = await axios.delete(`http://52.78.243.176/web/menu/${idx}`, {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            const { code } = response.data;
            const menu = menus.filter((menu) => menu.menuIdx === Number(idx));
            console.log(menu);
            if (code === 200) {
                console.log(menu[0].image);
                await storageService.refFromURL(menu[0].image).delete();
                // setMenus(menus.filter((menu) => menu.menuIdx !== Number(idx)));
                window.location.reload(false);
                console.log(code);
            }
        } catch (e) {
            console.log(e);
        }
        console.log(idx);
    };

    const handleDialog = (e) => {
        const type = e.target.outerText;
        const { id } = e.target;
        if (type === '메뉴 삭제') {
            setdialog({ open: true, type, description: '메뉴 정보를 삭제하시겠습니까?', onClick: () => menuDelete(id) });
        }
    };

    return (
        <MainCard title="메뉴 관리">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>카테고리</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1400 }} aria-label="categoryTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">카테고리명</TableCell>
                                    <TableCell align="center">카테고리 삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.menuCategoryIdx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{category.name}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                endIcon={<Delete />}
                                                onClick={() => categoryDelete(category.menuCategoryIdx)}
                                            >
                                                카페고리 삭제
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Divider />
            <Box sx={{ marginTop: '15px' }}>
                <Button variant="text" color="error" onClick={categoryCreateClick}>
                    카테고리 추가
                </Button>
            </Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
                    <Typography>메뉴</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1400 }} aria-label="menuTable">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">카테고리</TableCell>
                                    <TableCell>이미지</TableCell>
                                    <TableCell align="center">메뉴명</TableCell>
                                    <TableCell align="center">가격</TableCell>
                                    <TableCell align="center">상태</TableCell>
                                    <TableCell align="center">메뉴 수정</TableCell>
                                    <TableCell align="center">메뉴 삭제</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menus.map((menu) => (
                                    <TableRow key={menu.menuIdx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center">{menu.categoryName}</TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            <Avatar src={menu.image} sx={{ width: 40, height: 40 }} variant="square" />
                                        </TableCell>
                                        <TableCell align="center">{menu.name}</TableCell>
                                        <TableCell align="center">{menu.price}</TableCell>
                                        {menu.isSoldOut === 'N' ? (
                                            <TableCell align="center">
                                                <Switch
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    onClick={onClickSwitch}
                                                    value={menu.isSoldOut}
                                                    id={menu.menuIdx}
                                                />
                                            </TableCell>
                                        ) : (
                                            <TableCell align="center">
                                                <Switch
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    onClick={onClickSwitch}
                                                    value={menu.isSoldOut}
                                                    id={menu.menuIdx}
                                                    defaultChecked
                                                />
                                            </TableCell>
                                        )}
                                        <TableCell align="center">
                                            <Button variant="text" endIcon={<Update />} onClick={() => menuEditClick(menu)}>
                                                메뉴 수정
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="text" endIcon={<Delete />} onClick={handleDialog} id={menu.menuIdx}>
                                                메뉴 삭제
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
            <Divider />
            <Box sx={{ marginTop: '15px' }}>
                <Button variant="text" color="error" onClick={menuCreateClick}>
                    메뉴 추가
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

export default Menu;
