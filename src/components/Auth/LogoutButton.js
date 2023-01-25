// Packages
import axios from 'axios';

// React Hooks
import { useDispatch, useSelector } from 'react-redux';

// Store Actions
import { authActions } from '../../store/index';

// Styles
import classes from './LogoutButton.module.css';


const LogoutButton = () => {
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.auth.accessToken);

    const logoutClickHandler = async (event) => {
        event.preventDefault();

        const res = await axios.post('http://localhost:4500/auth/logout', {
            accessToken: accessToken
        });

        dispatch(authActions.changeLoggedInUser({}));
        dispatch(authActions.changeAccessToken(''));
    };

    return (
        <button onClick={ logoutClickHandler } className={ classes.logoutButton }>
            Logout
        </button>
    );
};


export default LogoutButton;