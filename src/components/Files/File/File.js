// Packages
import axios from 'axios';
import fileDownload from 'js-file-download';


// React Hooks
import { useSelector } from 'react-redux';


// Styles
import classes from './File.module.css';


const File = (props) => {
    console.log(props.file);

    const accessToken = useSelector((state) => state.auth.accessToken);

    const downloadHandler = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.get(`http://localhost:4500/file/download?fileKey=${ props.file.key }`, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${ accessToken }`
                }
            });
            fileDownload(res.data, `${ props.file.key }`);
        } catch (err) {
            console.log('Oh no! Could not download file!');
            console.log(err);
        }
    };

    return (
        <li key={ props.file.key }>
            <form onSubmit={ downloadHandler } className={ classes.downloadForm }>
                <button className={ classes.fileButton }>{ props.file.key.split('/')[1] }</button>
            </form>
        </li>
    );
};


export default File;