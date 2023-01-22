// Styles
import classes from './File.module.css';


const File = (props) => {
    console.log(props.file);
    return (
        <li key={ props.file.url }>
            <div className={ classes.fileButton }>
                <a href={ props.file.url }>{ props.file.key }</a>
            </div>
        </li>
    );
};


export default File;