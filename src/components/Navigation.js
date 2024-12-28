import styles from "./styles/Navigation.module.css";
import * as Icon from "react-ionicons";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Navigation = ({ currentLocation }) =>
{
    const navigation = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.buttonContainer} onClick={() => { navigation("/") }}>
                    <div className={styles.icon} >
                        {currentLocation == 'home' ?
                            <Icon.Home width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.HomeOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                        }

                    </div>
                    <div className={styles.label}>
                        首頁
                    </div>
                </div>

                <div className={styles.buttonContainer} onClick={() => { navigation("/selectProgram") }}>
                    <div className={styles.icon}>
                        {currentLocation == 'selectProgram' ?
                            <Icon.Mic width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.MicOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                        }
                    </div>
                    <div className={styles.label}>
                        電台
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <div className={styles.icon}>
                        {currentLocation == 'bookmark' ?
                            <Icon.Bookmark width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.BookmarkOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                        }
                    </div>
                    <div className={styles.label}>
                        收藏
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.buttonContainer}>
                    <div className={styles.icon}>
                        {currentLocation == 'settings' ?
                            <Icon.Settings width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.SettingsOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                        }
                    </div>
                    <div className={styles.label}>
                        設定
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation