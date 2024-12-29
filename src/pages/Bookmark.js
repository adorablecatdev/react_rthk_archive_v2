import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import styles from "./styles/Bookmark.module.css";
import { getStorageItem } from "../utilities/LocalStorage";
import BookmarkItem from "../components/BookmarkItem";

const Bookmark = ({ }) =>
{
    const [bookmarks, set_bookmarks] = useState({});

    useEffect(() =>
    {
        initialize();
    }, [])

    async function initialize()
    {
        const new_bookmarks = await getStorageItem('bookmarks');
        set_bookmarks(new_bookmarks);
        console.log(new_bookmarks);
    }

    return (
        <div className={styles.container}>
            <Navigation currentLocation={'bookmark'} />

            <div className={styles.contentContainer}>
                <div className={styles.bookmarkList}>
                    {bookmarks && Object.entries(bookmarks).map(([key, bookmark]) =>
                        <BookmarkItem key={key} program={bookmark} bookmarks={bookmarks} set_bookmarks={set_bookmarks} />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Bookmark;