import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import styles from "./styles/Bookmark.module.css";
import { getStorageItem } from "../utilities/LocalStorage";
import BookmarkItem from "../components/BookmarkItem";
import { Fade } from "react-bootstrap";

const Bookmark = ({ }) =>
{
    const [showContent, set_showContent] = useState(false);
    const [bookmarks, set_bookmarks] = useState({});

    useEffect(() =>
    {
        initialize();
    }, [])

    async function initialize()
    {
        const new_bookmarks = await getStorageItem('bookmarks');
        set_bookmarks(new_bookmarks);
        set_showContent(true);
    }

    return (
        <div className={styles.container}>
            <Navigation currentLocation={'bookmark'} />

            <Fade in={showContent}>
                <div className={styles.contentContainer}>

                    <div className={styles.leftSectionContainer}>
                        收藏節目
                    </div>

                    <div className={styles.bookmarkList}>
                        {bookmarks && Object.entries(bookmarks).map(([key, bookmark]) =>
                            <BookmarkItem key={key} program={bookmark} bookmarks={bookmarks} set_bookmarks={set_bookmarks} />
                        )}
                    </div>

                </div>
            </Fade>
        </div>
    )
}

export default Bookmark;