import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDateBeforeDays } from "../utilities/DateTime";
import { downloadSegments, getSegmentUrls, mergeSegments } from "../utilities/DownloadUtil";
import Loading from "../components/Loading";
import styles from "./styles/SelectEpisode.module.css";
import Navigation from "../components/Navigation";
import EpisodeItem from "../components/EpisodeItem";
import { Fade, Spinner } from "react-bootstrap";
import LoadMoreButton from "../components/LoadMoreButton";
import Error from "../components/Error";

const SelectEpisode = () =>
{
    const location = useLocation();
    const urlParams = new URLSearchParams(window.location.search);

    const [channel, set_channel] = useState('');
    const [programName, set_programName] = useState('');
    const [program, set_program] = useState('');

    const [episodes, setEpisodes] = useState([]);
    const [daysBefore, setDaysBefore] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [showContent, set_showContent] = useState(false);
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
            let new_program = urlParams.has('program') ? urlParams.get('program') : '';
            let new_channel = urlParams.has('channel') ? urlParams.get('channel') : '';
            let new_programName = urlParams.has('programName') ? urlParams.get('programName') : '';

            set_program(new_program);
            set_channel(new_channel);
            set_programName(new_programName);

            const new_episodes = [];
            let tryCount = 0;

            while (new_episodes.length < 5)
            {
                if (isCancelLoadingRef.current === true)
                {
                    break;
                }

                // Create batch of 8 URLs to check simultaneously
                const urlChecks = [];
                for (let i = 0; i < 7; i++)
                {
                    const currentDate = getDateBeforeDays(daysBefore + tryCount + i);
                    const url = `https://rthkaod2022.akamaized.net/m4a/radio/archive/${new_channel}/${new_program}/m4a/${currentDate.replaceAll('-', '')}.m4a/index_0_a.m3u8`;
                    urlChecks.push({
                        url,
                        date: currentDate,
                        checkPromise: checkUrl(url)
                    });
                }

                // Check all URLs in parallel
                const results = await Promise.all(urlChecks.map(check => check.checkPromise));

                // Process results
                results.forEach((valid, index) =>
                {
                    if (valid && new_episodes.length < 5)
                    {
                        new_episodes.push(urlChecks[index].date);
                    }
                });

                tryCount += 7;

                // Break if we've tried too many times
                if (tryCount > 35)
                {  // Arbitrary limit to prevent infinite loops
                    break;
                }
            }

            if (new_episodes.length === 0)
            {
                setHasMore(false);
            } else
            {
                setEpisodes(prevList => [...prevList, ...new_episodes]);
                setDaysBefore(daysBefore + tryCount);
            }

        } catch (error)
        {
            console.error('Error fetching episodes:', error);
            setHasMore(false);
        } finally
        {
            set_showLoading(false);
            set_showContent(true);
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
            <Loading showLoading={showLoading} />

            <Fade in={showContent}>
                <div className={styles.contentContainer}>

                    {/* PROGRAM DETAILS */}
                    <div className={styles.programDetails}>
                        <div className={styles.channel}>{channel}</div>
                        <div className={styles.programName}>{programName}</div>
                    </div>

                    {/* EPISODE LIST */}
                    <div className={styles.episodeList} >
                        {episodes && episodes.map((episode, index) =>
                            <EpisodeItem
                                episode={episode}
                                onClickDownload={() => startDownload(episode)}
                                onClickCancel={() => { cancelDownload(episode) }}
                                downloadProgress={downloadProgress}
                            />
                        )}


                        {episodes && episodes.length > 0 && (hasMore || showLoading) &&
                            <LoadMoreButton
                                text={showLoading ? '讀取中' : '讀取更多'}
                                onClick={() => { showLoading == false && getEpisodeList() }}
                                isLoading={showLoading}
                            />
                        }

                        {!episodes || episodes.length == 0 &&
                            <Error text={'找不到集數'} />
                        }
                    </div>
                </div>
            </Fade>
        </div>
    );
}
export default SelectEpisode;