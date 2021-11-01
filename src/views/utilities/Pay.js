import React, { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';

// material-ui
import { Grid, Typography } from '@material-ui/core';

// project imports
// ===========================|| DEFAULT DASHBOARD ||=========================== //

const Pay = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainCard title="결제 내역">
            <Typography variant="body2">결제 내역 페이지</Typography>
        </MainCard>
    );
};

export default Pay;
