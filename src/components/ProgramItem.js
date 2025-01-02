import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/ProgramItem.module.css";
import * as Icon from "react-bootstrap-icons";
import { setStorageItem } from "../utilities/LocalStorage";

const ProgramItem = ({ key, program, bookmarks, set_bookmarks }) =>
{
    async function onClickBookmarkBtn(e, program)
    {
        e.stopPropagation();

        const new_bookmarks = { ...bookmarks };

        if (program?.folder in new_bookmarks)
            delete new_bookmarks[program?.folder];
        else
            new_bookmarks[program?.folder] = program;

        set_bookmarks(new_bookmarks);

        await setStorageItem('bookmarks', new_bookmarks);
    }

    return (
        <Link
            key={key}
            className={styles.mainContainer}
            to={`/selectEpisode?channel=${program?.channel}&program=${program?.folder}&programName=${program?.title}`} state={{ program }}>
            {/* <a
           
            onClick={() => navigation(`/selectEpisode`, { state: { program } })}
          
        > */}
            <div className={styles.leftContainer}>
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
            </div>

            <div className={styles.bookmarkBtnContainer} onClick={(e) => { onClickBookmarkBtn(e, program); }}>
                {program?.folder in bookmarks ?
                    <Icon.BookmarkFill size={30} className={styles.bookmarkBtn} /> :
                    <Icon.Bookmark size={30} className={styles.bookmarkBtn} />
                }

            </div>
        </Link>
    )
}

export default ProgramItem;