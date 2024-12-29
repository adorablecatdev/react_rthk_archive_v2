import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import styles from "./styles/Home.module.css";
import * as Icon from "react-bootstrap-icons";
import { Fade } from "react-bootstrap";
import { useEffect, useState } from "react";

const Home = ({ }) =>
{
    const navigation = useNavigate();
    const [showContent, set_showContent] = useState(false);

    useEffect(() => {
        initialize();
    },[])

    async function initialize()
    {
        set_showContent(true);
    }

    return (
        <div className={styles.container}>
            <Navigation currentLocation={'home'} />

            <Fade in={showContent}>
                <div className={styles.contentContainer}>

                    <div className={styles.logo}>
                        <img src={`${process.env.PUBLIC_URL}/image/rthk_logo.png`} style={{ width: '100%', height: '100%' }} />
                    </div>

                    <div className={styles.header1}> 香港電台節目重溫 </div>

                    <div className={styles.header2}> 此網站內容均來自 rthk.hk </div>

                    <div style={{ padding: '10px' }} />

                    <IconButton
                        navigation={navigation}
                        navigateTo={'selectProgram'}
                        icon={(<Icon.Broadcast size={30} className={styles.btnIcon} />)}
                        text={'選擇節目'}
                    />

                    <IconButton
                        navigation={navigation}
                        navigateTo={'bookmark'}
                        icon={(<Icon.Bookmark size={30} className={styles.btnIcon} />)}
                        text={'收藏節目'}
                    />

                </div>
            </Fade>
        </div>
    )
}

export default Home;

const IconButton = ({ navigation, navigateTo, icon, text }) =>
{
    return (
        <div className={styles.btnContainer} onClick={() => { navigation(`/${navigateTo}`) }}>
            {icon}
            <div className={styles.btnText}>
                {text}
            </div>
        </div>
    )
}