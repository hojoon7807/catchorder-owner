import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/styles';
import { v4 as uuidv4 } from 'uuid';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
// material-ui
import {
    Box,
    Button,
    Container,
    Grid,
    Input,
    TextField,
    Typography,
    IconButton,
    InputLabel,
    Autocomplete,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Divider
} from '@material-ui/core';

// project imports
import { PhotoCamera } from '@material-ui/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookies } from 'cookies';
import { storageService } from 'fbase';

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const MenuEdit = () => {
    const state = useLocation();
    console.log(state.state.menu);

    const InputStyle = {
        display: 'none'
    };
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [menuImageString, setMenuImageString] = useState('');
    const [storeAuthImage, setStoreAuthImage] = useState('');
    const [categories, setCategoryies] = useState([]);
    const [tag, setTag] = useState([]);
    const [sendTag, setSendTag] = useState(null);
    const [sendCategoryIdx, setSendCategoryIdx] = useState(null);
    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState('');
    const [menuContent, setMenuContent] = useState('');

    const getTag = async () => {
        try {
            const jwtToken = getCookies('jwtToken');
            const response = await axios.get('http://52.78.243.176/web/tags', {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            console.log(response.data.result);
            setTag(response.data.result);
        } catch (e) {
            console.log(e);
        }
    };

    const onChangeMenuImage = (e) => {
        e.stopPropagation();
        const {
            target: { files }
        } = e;
        const imageFile = files[0];
        const reader = new FileReader();
        console.log(imageFile);
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result }
            } = finishedEvent;
            setMenuImageString(result);
        };
        reader.readAsDataURL(imageFile);
    };

    console.log(categories);
    useEffect(() => {
        setCategoryies(state.state.categories);
        getTag();
        setLoading(false);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        let imageUrl;
        if (menuImageString !== '') {
            const fileRef = storageService.ref().child(`menu/${uuidv4()}`);
            const response = await fileRef.putString(menuImageString, 'data_url');
            imageUrl = await response.ref.getDownloadURL();
        }
        const menuObj = {
            isSoldOut: 'N'
        };
        if (menuName) {
            menuObj.name = menuName;
        }
        if (menuPrice) {
            menuObj.price = menuPrice;
        }
        if (menuContent) {
            menuObj.content = menuContent;
        }
        if (imageUrl) {
            menuObj.image = imageUrl;
        }
        if (sendCategoryIdx) {
            menuObj.menuCategoryIdx = sendCategoryIdx;
        }
        if (sendTag) {
            menuObj.tag = sendTag;
        }

        console.log(menuObj);
        const jwtToken = getCookies('jwtToken');
        try {
            const response = await axios.patch(`http://52.78.243.176/web/menu/${state.state.menu.menuIdx}`, menuObj, {
                headers: {
                    'x-access-token': jwtToken
                }
            });
            console.log(response);
            if (response.data.code === 200) {
                navigate('/store/menu');
            }
        } catch (e) {
            console.log(e);
        }
        console.log('submit!!');
    };

    const defaultProps = {
        options: categories,
        getOptionLabel: (option) => option.name
    };

    const tagHandleChange = (event) => {
        const { name, checked, id } = event.target;

        if (checked === true) {
            setSendTag((sendTag) => sendTag.concat(Number(id)));
        } else {
            setSendTag(sendTag.filter((tagIdx) => tagIdx !== Number(id)));
        }
        console.log(event.target.checked);
        console.log(event.target.name);
        console.log(event.target.id);
    };

    console.log(sendTag);

    const autoHandleChange = (e) => {
        const { innerText } = e.target;
        let categoryIdx;
        if (innerText) {
            const category = categories.filter((category) => category.name === innerText);
            categoryIdx = category[0].menuCategoryIdx;
            console.log(categoryIdx);
            setSendCategoryIdx(categoryIdx);
        }
        console.log(e.target.innerText);
    };

    const onChangeMenu = (e) => {
        const { value, name } = e.target;
        if (name === 'name') {
            setMenuName(value);
        } else if (name === 'price') {
            setMenuPrice(value);
        } else if (name === 'content') {
            setMenuContent(value);
        }
        console.log(name, value);
    };
    console.log(sendCategoryIdx);
    return (
        <MainCard title="메뉴 수정">
            <Container maxWidth="xs">
                <Typography variant="body2">메뉴 수정 페이지</Typography>
                <Box component="form" noValidate mt={2} onSubmit={onSubmit}>
                    <Grid container spacing={2} alignItems="flex-start" justifyContent="flex-start">
                        <Grid item xs={12}>
                            <Autocomplete
                                {...defaultProps}
                                id="clear-on-escape"
                                clearOnEscape
                                onChange={autoHandleChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="카테고리" id="outlined-required" onChange={autoHandleChange} />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="메뉴 명"
                                id="outlined-start-adornment"
                                name="name"
                                fullWidth
                                onChange={onChangeMenu}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="outlined-required" label="가격" name="price" fullWidth onChange={onChangeMenu} />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField required id="outlined-required" label="메뉴 사진" fullWidth value={menuImageString} />
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
                                    onChange={onChangeMenuImage}
                                    style={InputStyle}
                                />
                            </InputLabel>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="메뉴 설명"
                                name="content"
                                multiline
                                rows={4}
                                fullWidth
                                onChange={onChangeMenu}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">태그</Typography>
                        </Grid>
                        {tag.map((tagCategory) => (
                            <Grid item xs={4}>
                                <FormLabel component="legend" key={tagCategory.tagCategoryIdx}>
                                    {tagCategory.tagCategoryName}
                                </FormLabel>
                                <FormGroup>
                                    {tagCategory.tag.map((tag) => (
                                        <FormControlLabel
                                            control={<Checkbox onChange={tagHandleChange} name={tag.tagName} id={`${tag.tagIdx}`} />}
                                            label={tag.tagName}
                                        />
                                    ))}
                                </FormGroup>
                            </Grid>
                        ))}
                        <Grid item xs={9}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                메뉴 수정
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </MainCard>
    );
};

export default MenuEdit;
