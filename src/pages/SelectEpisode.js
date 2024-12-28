import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDateBeforeDays } from "../utilities/DateTime";
import { downloadSegments, getSegmentUrls, mergeSegments } from "../utilities/DownloadUtil";
import Loading from "../components/Loading";
import styles from "./styles/SelectEpisode.module.css";
import Navigation from "../components/Navigation";
import EpisodeItem from "../components/EpisodeItem";
import { Spinner } from "react-bootstrap";

const SelectEpisode = () =>
{
    const location = useLocation();
    const program = location.state?.program?.folder;
    const channel = location.state?.program?.channel;
    const programName = location.state?.program?.title;

    const [episodes, setEpisodes] = useState([]);
    const [daysBefore, setDaysBefore] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [showLoading, set_showLoading] = useState(false);
    const [downloadProgress, set_downloadProgress] = useState({});
    const isCancelDownloadRef = useRef({});
    const isCancelLoadingRef = useRef(false);

    useEffect(() =>
    {
        getEpisodeList();

        return () =>
        {
            isCancelLoadingRef.current = true;
            Object.keys(isCancelDownloadRef.current).forEach((episode) =>
            {
                isCancelDownloadRef.current[episode] = true;
            });
        };
    }, []);

    async function checkUrl(url)
    {
        try
        {
            const response = await axios.head(url, { validateStatus: status => status < 400, timeout: 500 });
            return true;
        }
        catch (error)
        {
            console.log('URL check error:', error.message);
            return false;
        }
    }

    async function getEpisodeList()
    {
        if (showLoading) return;

        set_showLoading(true);
        try
        {
            const new_episodes = [];

            let failCount = 0;
            let tryCount = 0;
            while (new_episodes.length < 5 && failCount < 8)
            {
                if (isCancelLoadingRef.current == true)
                {
                    break;
                }

                const url = `https://rthkaod2022.akamaized.net/m4a/radio/archive/${channel}/${program}/m4a/${getDateBeforeDays(daysBefore + tryCount).replaceAll('-', '')}.m4a/index_0_a.m3u8`;
                const valid = await checkUrl(url);
                if (valid)
                {
                    new_episodes.push(getDateBeforeDays(daysBefore + tryCount));
                    failCount = 0;
                }
                else
                {
                    failCount++;
                }
                tryCount++;
            }

            if (new_episodes.length === 0)
            {
                setHasMore(false);
            }
            else
            {
                setEpisodes(prevList => [...prevList, ...new_episodes]);
                setDaysBefore(daysBefore + tryCount);
            }

        } catch (error)
        {
            console.error('Error fetching episodes:', error);
            setHasMore(false);
        }
        finally
        {
            set_showLoading(false);
        }
    }

    async function startDownload(episode)
    {
        // initial download
        isCancelDownloadRef.current[episode] = false;

        set_downloadProgress((prev) =>
        {
            const newState = prev;
            newState[episode] = 0;
            return newState;
        });

        let segmentUrls;
        let segmentFiles;

        if (isCancelDownloadRef.current[episode] == false)
            segmentUrls = await getSegmentUrls(channel, program, episode, isCancelDownloadRef);

        if (isCancelDownloadRef.current[episode] == false)
            segmentFiles = await downloadSegments(channel, program, episode, segmentUrls, isCancelDownloadRef, set_downloadProgress);

        if (isCancelDownloadRef.current[episode] == false)
            await mergeSegments(segmentFiles, episode, programName, isCancelDownloadRef);

        // when download is finished
        delete isCancelDownloadRef.current[episode];

        set_downloadProgress((prev) =>
        {
            const newState = prev;
            delete newState[episode];
            console.log(newState);
            return newState;
        })
    }

    async function cancelDownload(episode)
    {
        isCancelDownloadRef.current[episode] = true;

        set_downloadProgress((prev) =>
        {
            const newState = prev;
            delete newState[episode];
            return newState;
        })
    }

    return (
        <div className={styles.container}>
            <Navigation currentLocation={'selectProgram'} />

            <div className={styles.contentContainer}>
                {/* <Loading showLoading={showLoading} /> */}

                {/* PROGRAM DETAILS */}
                <div className={styles.programDetails}>
                    <div className={styles.channel}>{channel}</div>
                    <div className={styles.programName}>{programName}</div>
                </div>

                {/* EPISODE LIST */}
                <div className={styles.episodeList} >
                    {episodes.map((episode, index) =>
                        <EpisodeItem
                            episode={episode}
                            onClickDownload={() => startDownload(episode)}
                            onClickCancel={() => { cancelDownload(episode) }}
                            downloadProgress={downloadProgress}
                        />
                    )}

                    {(hasMore || showLoading) &&
                        <div
                            className={showLoading ? styles.loadMoreBtnInactive : styles.loadMoreBtnActive}
                            onClick={() => { showLoading == false && getEpisodeList() }}
                        >
                            {showLoading ? '讀取中' : '讀取更多'}
                            {showLoading &&  <Spinner animation="border" size="sm" variant="light" style={{ marginLeft:'5px'}} />}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default SelectEpisode;