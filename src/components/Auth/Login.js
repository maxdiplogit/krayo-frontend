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
        const decoded = jwt_decode(res.credential);
        try {
            const res = await axios.get(`http://localhost:4500/getFiles/${ decoded.email }`);
            decoded.filesList = res.data.files;
            console.log(decoded);
            dispatch(authActions.changeLoggedInUser(decoded));
        } catch (err) {
            console.log('Could not get the files from the server');
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