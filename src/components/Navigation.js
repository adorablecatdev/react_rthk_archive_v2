import styles from "./styles/Navigation.module.css";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Navigation = ({ currentLocation }) =>
{
    const navigation = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.buttonContainer} onClick={() => { navigation("/") }}>
                    <div className={styles.icon} >
                        {currentLocation == 'home' ?
                            <Icon.HouseFill width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.House width={"100%"} height={"100%"} color={"#38BDF8"} />
                        }

                    </div>
                    <div className={styles.label}>
                        首頁
                    </div>
                </div>

                <div className={styles.buttonContainer} onClick={() => { navigation("/selectProgram") }}>
                    <div className={styles.icon}>
                        {currentLocation == 'selectProgram' ?
                            <Icon.Broadcast width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.Broadcast width={"100%"} height={"100%"} color={"#38BDF8"} />
                        }
                    </div>
                    <div className={styles.label}>
                        電台
                    </div>
                </div>

                <div className={styles.buttonContainer} onClick={() => { navigation("/bookmark") }}>
                    <div className={styles.icon}>
                        {currentLocation == 'bookmark' ?
                            <Icon.BookmarkFill width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.Bookmark width={"100%"} height={"100%"} color={"#38BDF8"} />
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
                            <Icon.GearFill width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                            <Icon.Gear width={"100%"} height={"100%"} color={"#38BDF8"} />
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