import styles from "./styles/EpisodeItem.module.css";
import * as Icon from "react-ionicons";

const EpisodeItem = ({ episode, onClickDownload, onClickCancel, downloadProgress }) =>
{
    return (
        <div className={styles.mainContainer} >
            <div className={styles.horizontalContainer}>
                {episode}
                <div className={styles.icon}
                    onClick={() =>
                    {
                        if (episode in downloadProgress)
                            onClickCancel();
                        else
                            onClickDownload();
                    }}
                >
                    {episode in downloadProgress ?
                        <Icon.CloseCircleOutline width={"100%"} height={"100%"} color={"#38BDF8"} /> :
                        <Icon.DownloadOutline width={"100%"} height={"100%"} color={"#38BDF8"} />
                    }
                </div>
            </div>
            <div className={episode in downloadProgress ? styles.progressActive : styles.progressInactive}>
                {episode in downloadProgress &&
                    <div className={styles.progress} style={{ width: `${downloadProgress?.[episode]}%` }}></div>
                }
            </div>
        </div>
    )
}

export default EpisodeItem;