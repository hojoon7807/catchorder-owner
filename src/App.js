import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';
import { useRoutes } from 'react-router-dom';
import { Cookies } from 'react-cookie';
// routing
// defaultTheme
import themes from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import MainRoutes from 'routes/MainRoutes';

// ===========================|| APP ||=========================== //

const App = () => {
    const cookies = new Cookies();
    const customization = useSelector((state) => state.customization);
    const { isLoggedIn } = useSelector((state) => state.login);
    const jwtToken = cookies.get('jwtToken');

    const routing = useRoutes(MainRoutes(jwtToken));

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>{routing}</NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
