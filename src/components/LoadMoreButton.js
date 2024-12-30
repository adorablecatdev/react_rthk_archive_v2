import { Spinner } from "react-bootstrap";
import styles from "./styles/LoadMoreButton.module.css";

const LoadMoreButton = ({ text, onClick, isLoading }) =>
{
    return (
        <div
            className={isLoading ? styles.buttonInactive : styles.buttonActive}
            onClick={onClick}
        >
            {text}
            {isLoading &&  <Spinner animation="border" size="sm" variant="secondary" style={{ marginLeft:'5px'}} />}
        </div>
    )
}

export default LoadMoreButton;