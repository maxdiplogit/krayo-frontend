import axios from 'axios';

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
const checkAccessTokenValid = (loggedInUser) => {
    const now = parseInt(Date.now() / 1000);
    const expiry = loggedInUser.exp;
    console.log('Now: ', now);
    console.log('Expiry: ', expiry);
    return now < expiry;
};


const Home = () => {
    const dispatch = useDispatch();
    
    const [ flag, setFlag ] = useState(false);

    const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    useEffect(() => {
        const getFiles = async (fLoggedInUser) => {
            try {
                const res = await axios.get(`http://localhost:4500/getFiles/${ fLoggedInUser.email }`);
                dispatch(authActions.changeFilesList(res.data.files));
            } catch(err) {
                console.log(err);
            }
        };

        if (Object.keys(loggedInUser).length > 1) {
            getFiles(loggedInUser);
        }
    }, []);
    
    let navContent = <>
        <Login />
    </>;
    let content = <>
        <h1>Not Logged In</h1>
    </>;

    // If loggedInUser does not exist, then make sure that isLoggedIn is also false and the accessToken is also an empty string
    if ((!checkAccessTokenValid(loggedInUser) && Object.keys(loggedInUser).length > 1 && !flag) || (Object.keys(loggedInUser).length <= 1 && !flag)) {
        dispatch(authActions.changeLoggedInUser({}));
        dispatch(authActions.changeFilesList([]));
        setFlag(true);
    }

    console.log(loggedInUser);
    console.log(checkAccessTokenValid(loggedInUser));
    
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
                <h1>
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