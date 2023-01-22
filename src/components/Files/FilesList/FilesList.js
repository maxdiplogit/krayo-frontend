import axios from 'axios';

// React Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import File from '../File/File';

// Store actions
import { authActions } from '../../../store/index';

// Styles
import classes from './FilesList.module.css';


const FilesList = () => {
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    let content = <></>;

    if (loggedInUser.filesList.length === 0) {
        content = <>
            <h2>No files found</h2>
        </>;
    } else {
        content = <ul>
            { loggedInUser.filesList.map((file) => (
                <File file={ file } key={ file.url } />
            )) }
        </ul>
    }

    return (
        <div className={ classes.filesList }>
            { content }
        </div>
    );
};


export default FilesList;