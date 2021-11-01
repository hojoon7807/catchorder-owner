import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const getCookies = (name) => cookies.get(name);

export const deleteCookies = (name) => cookies.remove(name, { path: '/' });
