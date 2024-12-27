import { useNavigate } from "react-router-dom";
import styles from "./styles/ProgramItem.module.css";

const ProgramItem = ({ program }) =>
{
    const navigation = useNavigate();

    return (
        <a
            className={styles.mainContainer}
            onClick={() => navigation(`/selectEpisode`, { state: { program }})}
        >
            <div className={styles.timeContainer}>
                {`${program?.latestDate}`}
            </div>

            <div className={styles.programNameAndPresenterContainer}>
                <div className={styles.programName}>
                    {program?.title || '-'}
                </div>
                <div className={styles.presenter}>
                    {program?.producer || '-'}
                </div>
            </div>
        </a>
    )
}

export default ProgramItem;