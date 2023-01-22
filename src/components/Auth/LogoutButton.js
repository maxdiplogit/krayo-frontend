// React Hooks
import { useDispatch, useSelector } from 'react-redux';

// Store Actions
import { authActions } from '../../store/index';

// Styles
import classes from './LogoutButton.module.css';


const LogoutButton = () => {
    const dispatch = useDispatch();

    const logoutClickHandler = (event) => {
        event.preventDefault();

        dispatch(authActions.changeLoggedInUser({}));
        dispatch(authActions.changeFilesList([]));
    };

    return (
        <button onClick={ logoutClickHandler } className={ classes.logoutButton }>
            Logout
        </button>
    );
};


export default LogoutButton;