import axios from 'axios';
import jwtDecode from 'jwt-decode';

// React Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import Login from '../Auth/Login';
import LogoutButton from '../Auth/LogoutButton';
import FilesList from '../Files/FilesList/FilesList';
import FileUploadForm from '../FileUploadForm/FileUploadForm';

// Store actions
import { authActions } from '../../store';

// Styles
import classes from './Home.module.css';


// Returns a boolean based on whether the accessToken being used has expired or not
const checkAccessTokenValid = (access_token) => {
    if (access_token.length === 0) {
        return false;
    }
    const now = parseInt(Date.now() / 1000);
    const expiry = jwtDecode(access_token).exp;
    console.log('Now: ', now);
    console.log('Expiry: ', expiry);
    return now < expiry;
};


const Home = () => {
    const dispatch = useDispatch();
    
    const [ flag, setFlag ] = useState(false);

    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const accessToken = useSelector((state) => state.auth.accessToken);
    console.log(accessToken);
    
    let navContent = <>
        <Login />
    </>;
    let content = <>
        <p className={ classes.notLoggedIn }>Not Logged In</p>
    </>;

    // If loggedInUser does not exist, then make sure that isLoggedIn is also false and the accessToken is also an empty string
    if ((accessToken.length === 0 || !loggedInUser || !checkAccessTokenValid(accessToken)) && !flag) {
        dispatch(authActions.changeLoggedInUser({}));
        dispatch(authActions.changeAccessToken(''));
        dispatch(authActions.changeFilesList([]));
        setFlag(true);
    }

    console.log(loggedInUser);
    
    if (Object.keys(loggedInUser).length > 1) {
        navContent = <><LogoutButton /></>;
        content = <>
            <div className={ classes.fileUploadForm }>
                <FileUploadForm />
            </div>
            <div className={ classes.filesList }>
                <FilesList />
            </div>
        </>;
    }

    return (
        <div className={ classes.home }>
            <header>
                <h1 className={ classes.heading }>
                    Krayo
                </h1>
                <div className={ classes.nav }>
                    { navContent }
                </div>
            </header>
            <main>
                { content }
            </main>
        </div>
    );
};


export default Home;