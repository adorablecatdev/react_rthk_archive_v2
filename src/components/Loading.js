import { Fade, Spinner } from 'react-bootstrap';
import styles from './styles/Loading.module.css';

const Loading = ({ showLoading }) =>
{

    return (
        <>
            {showLoading &&
                <div className={styles.spinnerContainer} >
                    <div className={styles.spinnerGrid}>
                        <Spinner animation="border" size="lg" variant="primary" />
                    </div>
                </div>
            }
        </>
    )
}

export default Loading;