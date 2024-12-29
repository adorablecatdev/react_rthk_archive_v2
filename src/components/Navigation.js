import styles from "./styles/Navigation.module.css";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Navigation = () =>
{
    const navigation = useNavigate();

    return (
        <div className={styles.container}>

            <div className={styles.leftContainer}>
                <HomeButton navigation={navigation} />
            </div>

            <div className={styles.rightContainer}>
                <IconButton navigation={navigation} navigateTo={"bookmark"} icon={(<Icon.Bookmark size={30} />)} />
                <IconButton navigation={navigation} navigateTo={"setting"} icon={(<Icon.Gear size={30} />)} />
            </div>

        </div>
    )
}

export default Navigation;

const HomeButton = ({ navigation }) =>
{
    return (
        <div className={styles.homeBtnContainer} onClick={() => { navigation("/") }}>
            <img className={styles.homeBtnIcon} src={`${process.env.PUBLIC_URL}/image/rthk_logo.png`} />
            <div className={styles.homeBtnText}>
                香港電台節目重溫
            </div>
        </div>
    )
}

const IconButton = ({ navigation, navigateTo, icon }) =>
{
    return (
        <div className={styles.btnIcon} onClick={() => { navigation(`/${navigateTo}`) }}>
            {icon}
        </div>
    )
}