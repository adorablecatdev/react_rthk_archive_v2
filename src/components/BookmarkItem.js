import { useNavigate } from "react-router-dom";
import styles from "./styles/BookmarkItem.module.css";
import * as Icon from "react-bootstrap-icons";
import { setStorageItem } from "../utilities/LocalStorage";

const BookmarkItem = ({ key, program, bookmarks, set_bookmarks }) =>
{
    const navigation = useNavigate();

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
        <a
            className={styles.mainContainer}
            onClick={() => navigation(`/selectEpisode`, { state: { program } })}
            key={key}
        >
            <div className={styles.leftContainer}>
                <div className={styles.channelContainer}>
                    {`${program?.channel}`}
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
        </a>
    )
}

export default BookmarkItem;