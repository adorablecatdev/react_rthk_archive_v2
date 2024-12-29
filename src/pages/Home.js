import Navigation from "../components/Navigation";
import styles from "./styles/Home.module.css";

const Home = ({ }) =>
{
    return (
        <div className={styles.container}>
            <Navigation currentLocation={'home'} />

            <div className={styles.contentContainer}>
                <div className={styles.logo}>
                    <img src={`${process.env.PUBLIC_URL}/image/rthk_logo.png`} style={{ width:'100%', height:'100%'}} />
                </div>
                <div className={styles.header1}>
                    香港電台節目重溫
                </div>
                <div className={styles.header2}>
                    此網站內容均來自 rthk.hk
                </div>
            </div>
        </div>
    )
}

export default Home;