// Packages
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// React Hooks
import { useDispatch, useSelector } from 'react-redux';

// Components
import { GoogleLogin } from '@react-oauth/google';

// Store Actions
import { authActions } from '../../store';

// Styles
// import classes from './Login.module.css';


const Login = () => {
    const dispatch = useDispatch();

    const onSuccess = async (res) => {
        const access_token = res.credential;
        const decoded = jwt_decode(res.credential);
        try {
            const response = await axios.post('http://localhost:4500/auth/verifyToken', {
                accessToken: `${ access_token }`
            });
            console.log(response);
            dispatch(authActions.changeLoggedInUser(response.data.user));
            dispatch(authActions.changeAccessToken(response.data.accessToken));
        } catch (err) {
            console.log('Token could not be verified');
            console.log(err);
        }
    };

    const onError = () => {
        console.log('Login Failed :(');
        dispatch(authActions.changeIsLoggedIn(false));
        dispatch(authActions.changeLoggedInUser({}));
    };
    
    return (
        <GoogleLogin
            onSuccess={ onSuccess }
            onError={ onError }
        />
    );
};


export default Login;