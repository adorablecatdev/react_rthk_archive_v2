import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProgramItem from "../components/ProgramItem";
import styles from "./styles/SelectProgram.module.css";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import { getStorageItem } from "../utilities/LocalStorage";
import { Fade } from "react-bootstrap";

const SelectProgram = ({ }) =>
{
    const [showContent, set_showContent] = useState(false);
    const [showLoading, set_showLoading] = useState(false);
    const [selectedStation, set_selectedStation] = useState('radio1');
    const [programList, set_programList] = useState([]);
    const [loadSegment, set_loadSegment] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const programListRef = useRef(null);
    const [bookmarks, set_bookmarks] = useState({});

    useEffect(() =>
    {
        initialize();
    }, [])

    useEffect(() =>
    {
        getProgramList(true);
    }, [selectedStation]);

    async function initialize()
    {
        const new_bookmarks = await getStorageItem('bookmarks');
        set_bookmarks(new_bookmarks);
        getProgramList(true);
    }

    async function getProgramList(reset = false)
    {
        if (showLoading) return;

        set_showLoading(true);
        try
        {
            const segment = reset ? 1 : loadSegment;
            const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(`https://www.rthk.hk/archive/archive_channel/${selectedStation}_latest/${segment}`);

            const result = await axios.get(url);

            if (result?.data?.programmes?.programme)
            {
                const newPrograms = result.data.programmes.programme;
                console.log(newPrograms);

                if (!newPrograms || newPrograms.length === 0)
                {
                    setHasMore(false);
                    return;
                }

                set_programList(prevList =>
                    reset ? newPrograms : [...prevList, ...newPrograms]
                );

                set_loadSegment(reset ? 2 : prev => prev + 1);
            }
            else 
            {
                setHasMore(false);
            }
        }
        catch (e)
        {
            console.log(e);
            setHasMore(false);
        }
        finally 
        {
            set_showLoading(false);
            set_showContent(true);
        }
    }

    function scrollToTop()
    {
        if (programListRef.current)
        {
            programListRef.current.scrollTo({ top: 0 });
        }
    }

    return (
        <div className={styles.container}>
            <Navigation currentLocation={'selectProgram'} />
            <Loading showLoading={showLoading} />

            <Fade in={showContent}>
                <div className={styles.contentContainer}>
                    <div className={styles.radioButtonContainer}>
                        <div
                            className={selectedStation == 'radio1' ? styles.radioButtonSelected : styles.radioButton}
                            onClick={() => { scrollToTop(); set_selectedStation('radio1'); set_loadSegment(1); setHasMore(true); }}
                        >
                            第一台
                        </div>
                        <div
                            className={selectedStation == 'radio2' ? styles.radioButtonSelected : styles.radioButton}
                            onClick={() => { scrollToTop(); set_selectedStation('radio2'); set_loadSegment(1); setHasMore(true); }}
                        >
                            第二台
                        </div>
                        <div
                            className={selectedStation == 'radio3' ? styles.radioButtonSelected : styles.radioButton}
                            onClick={() => { scrollToTop(); set_selectedStation('radio3'); set_loadSegment(1); setHasMore(true); }}
                        >
                            第三台
                        </div>
                        <div
                            className={selectedStation == 'radio4' ? styles.radioButtonSelected : styles.radioButton}
                            onClick={() => { scrollToTop(); set_selectedStation('radio4'); set_loadSegment(1); setHasMore(true); }}
                        >
                            第四台
                        </div>
                        <div
                            className={selectedStation == 'radio5' ? styles.radioButtonSelected : styles.radioButton}
                            onClick={() => { scrollToTop(); set_selectedStation('radio5'); set_loadSegment(1); setHasMore(true); }}
                        >
                            第五台
                        </div>
                    </div>

                    <div
                        className={styles.programList}
                        ref={programListRef}
                    >
                        {programList && programList.map((program, index) =>
                            <ProgramItem
                                key={index}
                                program={program}
                                bookmarks={bookmarks}
                                set_bookmarks={set_bookmarks}
                            />
                        )}

                        {(hasMore || showLoading) && (
                            <div
                                className={styles.loadMoreBtn}
                                onClick={() => { showLoading == false && getProgramList() }}
                            >
                                {showLoading ? '讀取中' : '讀取更多'}
                            </div>
                        )}
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default SelectProgram;