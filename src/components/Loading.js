import { Fade, Spinner } from 'react-bootstrap';
import styles from './styles/Loading.module.css';

const Loading = ({ showLoading }) =>
{

    return (
        <> 
            {showLoading &&
                <Fade in={showLoading} appear={true} >
                    <div className={styles.spinnerContainer} >
                        <div className={styles.spinnerGrid}>
                            <Spinner animation="border" size="lg" variant="primary" />
                        </div>
                    </div>
                </Fade> 
            }
        </>
    )
}

export default Loading;