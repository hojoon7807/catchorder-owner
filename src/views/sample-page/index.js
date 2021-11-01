import React from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';

//= =============================|| SAMPLE PAGE ||==============================//

const SamplePage = () => (
    <MainCard title="로그아웃">
        <Typography variant="body2">로그아웃 페이지</Typography>
    </MainCard>
);

export default SamplePage;
