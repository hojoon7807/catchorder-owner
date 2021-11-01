import { Cookies } from 'react-cookie';

const SET_JWT = 'login/SET_JWT';
const LOAD_JWT = 'login/LOAD_JWT';
const cookies = new Cookies();

const initialState = {
    jwtToken: null,
    isLoggedIn: false
};

export const setJwt = (jwtToken, isLoggedIn) => ({ type: SET_JWT, loginInfo: { jwtToken, isLoggedIn } });
export const loadJwt = () => ({ type: LOAD_JWT });

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JWT:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                jwtToken: action.jwtToken
            };

        case LOAD_JWT:
            return state;

        default:
            return state;
    }
};

export default loginReducer;
