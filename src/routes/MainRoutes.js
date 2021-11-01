import React, { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import MinimalLayout from 'layout/MinimalLayout';

// dashboard routing
const StoreDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const StoreMenu = Loadable(lazy(() => import('views/dashboard/Default/Menu')));
const StoreBecon = Loadable(lazy(() => import('views/dashboard/Default/Becon')));
const OrderDefault = Loadable(lazy(() => import('views/utilities/Order')));
const Logout = Loadable(lazy(() => import('views/utilities/Logout')));
const StoreForm = Loadable(lazy(() => import('views/dashboard/Default/StoreForm')));
const OrderPay = Loadable(lazy(() => import('views/utilities/Pay')));
const StoreEdit = Loadable(lazy(() => import('views/dashboard/Default/StoreEdit')));
const MenuForm = Loadable(lazy(() => import('views/dashboard/Default/MenuForm')));
const MenuEdit = Loadable(lazy(() => import('views/dashboard/Default/MenuEdit')));
const CategoryForm = Loadable(lazy(() => import('views/dashboard/Default/CategoryForm')));
const BeconForm = Loadable(lazy(() => import('views/dashboard/Default/BeconForm')));
const BeconEdit = Loadable(lazy(() => import('views/dashboard/Default/BeconEdit')));
const UserEdit = Loadable(lazy(() => import('views/dashboard/Default/UserEdit')));

// utilities routing
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const SignUp = Loadable(lazy(() => import('views/pages/authentication/authentication3/SignUp')));
const FindId = Loadable(lazy(() => import('views/pages/authentication/authentication3/FindId')));
const FindPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/FindPassword')));

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = (jwtToken) => [
    {
        path: '/store',
        element: jwtToken ? <MainLayout /> : <Navigate to="/pages/login" />,
        children: [
            {
                path: '/',
                element: <StoreDefault />
            },
            {
                path: '/logout',
                element: <Logout />
            },
            {
                path: '/user',
                element: <UserEdit />
            },
            {
                path: '/menu',
                element: <StoreMenu />
            },
            {
                path: '/menu/write',
                element: <MenuForm />
            },
            {
                path: '/menu/edit',
                element: <MenuEdit />
            },
            {
                path: '/category/write',
                element: <CategoryForm />
            },
            {
                path: '/becon',
                element: <StoreBecon />
            },
            {
                path: '/becon/write',
                element: <BeconForm />
            },
            {
                path: '/becon/edit',
                element: <BeconEdit />
            },
            {
                path: '/order',
                element: <OrderDefault />
            },
            {
                path: '/order/pay',
                element: <OrderPay />
            },
            {
                path: '/write',
                element: <StoreForm />
            },
            {
                path: '/edit',
                element: <StoreEdit />
            },
            {
                path: '/utils/util-shadow',
                element: <UtilsShadow />
            },
            {
                path: '/icons/tabler-icons',
                element: <UtilsTablerIcons />
            },
            {
                path: '/icons/material-icons',
                element: <UtilsMaterialIcons />
            },
            {
                path: '/sample-page',
                element: <SamplePage />
            }
        ]
    },
    {
        path: '/',
        element: !jwtToken ? <MinimalLayout /> : <Navigate to="/store" />,
        children: [
            {
                path: '/pages/login',
                element: <AuthLogin />
            },
            {
                path: '/pages/signup',
                element: <SignUp />
            },
            {
                path: '/pages/find-id',
                element: <FindId />
            },
            {
                path: '/pages/find-password',
                element: <FindPassword />
            }
        ]
    }
];

export default MainRoutes;
