import axios from 'axios';

// React Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';

// Store actions
import { authActions } from '../../store/index';

// Styles
import classes from './FileUploadForm.module.css';



const FileUploadForm = () => {
    const dispatch = useDispatch();

    const fileRef = useRef();

    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const [ selectedFile, setSelectedFile ] = useState(null);

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        let formData = new FormData();

        formData.append('loggedInUser', loggedInUser);
        formData.append('email', loggedInUser.email);
        formData.append('file', selectedFile);

        try {
            fileRef.current.value = null;
            setSelectedFile(null);
            const res = await axios.post('http://localhost:4500/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            const res1 = await axios.get(`http://localhost:4500/getFiles/${ loggedInUser.email }`);
            console.log(res1.data);
            dispatch(authActions.changeFilesList(res1.data.files));
        } catch (err) {
            console.log('Oh no! Could not upload the file!');
            console.log(err);
        }
    };

    const fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    }

    return (
        <form encType='multipart/form-data' onSubmit={ formSubmitHandler }>
            <div>
                <input type='file' id="file" name="file" onChange={ fileSelectedHandler } ref={ fileRef } />
            </div>
            <div>
                { selectedFile !== null ? <button className={ classes.uploadButton } type='submit'>Upload File</button> : <button className={ classes.uploadButton } type='submit' disabled>Upload File</button> }
            </div>
        </form>
    );
};


export default FileUploadForm;