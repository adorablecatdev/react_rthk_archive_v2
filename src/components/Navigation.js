import styles from "./styles/Navigation.module.css";
import * as Icon from "react-ionicons";
import styled from 'styled-components';

const Navigation = ({ currentLocation }) =>
{

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <div className={styles.icon}>
                    <Icon.HomeOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                </div>
                <div className={styles.icon}>
                    <Icon.RadioOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                </div>
                <div className={styles.icon}>
                    <Icon.BookmarkOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                </div>
            </div>
            <div className={styles.rightContainer}>
                <div className={styles.icon}>
                    <Icon.SettingsOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                </div>
            </div>
        </div>
    )
}

export default Navigation