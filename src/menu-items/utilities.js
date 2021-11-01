// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd, IconDashboard } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd,
    IconDashboard
};

// ===========================|| UTILITIES MENU ITEMS ||=========================== //

const utilities = {
    id: 'order',
    title: '주문 관리',
    type: 'group',
    children: [
        {
            id: 'c',
            title: '주문 현황',
            type: 'item',
            url: '/store/order',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
        // {
        //     id: 'd',
        //     title: '결제 내역',
        //     type: 'item',
        //     url: '/store/order/pay',
        //     icon: icons.IconDashboard,
        //     breadcrumbs: false
        // }
        // {
        //     id: 'icons',
        //     title: 'Icons',
        //     type: 'collapse',
        //     icon: icons.IconWindmill,
        //     children: [
        //         {
        //             id: 'tabler-icons',
        //             title: 'Tabler Icons',
        //             type: 'item',
        //             url: '/icons/tabler-icons',
        //             breadcrumbs: false
        //         },
        //         {
        //             id: 'material-icons',
        //             title: 'Material Icons',
        //             type: 'item',
        //             url: '/icons/material-icons',
        //             breadcrumbs: false
        //         }
        //     ]
        // }
    ]
};

export default utilities;
