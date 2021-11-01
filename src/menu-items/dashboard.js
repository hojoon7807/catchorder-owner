// assets
import { IconDashboard, IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = {
    IconDashboard,
    IconDeviceAnalytics
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
    id: 'store',
    title: '나의 가게',
    type: 'group',
    children: [
        {
            id: 'default',
            title: '가게 관리',
            type: 'item',
            url: '/',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'b',
            title: '메뉴 관리',
            type: 'item',
            url: '/store/menu',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },
        {
            id: 'r',
            title: '비콘 관리',
            type: 'item',
            url: '/store/becon',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
