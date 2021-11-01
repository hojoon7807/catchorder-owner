import React, { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { deleteCookies } from 'cookies';

// project imports

// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Logout = () => {
    const [isLoading, setLoading] = useState(true);
    const onClick = () => {
        deleteCookies('jwtToken');
        window.location.reload(false);
    };
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainCard title="로그아웃">
            <Box sx={{ marginTop: '15px' }}>
                <Button variant="text" color="error" onClick={onClick}>
                    로그 아웃
                </Button>
            </Box>
        </MainCard>
    );
};

export default Logout;
