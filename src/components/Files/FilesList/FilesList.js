import axios from 'axios';

// React Hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import File from '../File/File';

// Store actions
import { authActions } from '../../../store/index';

// Styles
import classes from './FilesList.module.css';


const FilesList = () => {
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const filesList = useSelector((state) => state.auth.filesList);
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        const getFiles = async (userId) => {
            try {
                const res = await axios.get(`http://localhost:4500/file/getFiles/${ userId }`, {
                    headers: {
                        'Authorization': `Bearer ${ accessToken }`
                    }
                });
                console.log(res.data);
                dispatch(authActions.changeFilesList(res.data.files.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())));
            } catch(err) {
                console.log(err);
            }
        };

        getFiles(loggedInUser._id);
    }, []);

    let content = <></>;

    if (filesList.length === 0) {
        content = <>
            <h2>No files found</h2>
        </>;
    } else {
        content = <ul>
            { filesList.map((file) => (
                <File file={ file } key={ file.key } />
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