import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentDate, getDateBeforeDays } from "../utilities/DateTime";
import Loading from "../components/Loading";
import { downloadSegments, getSegmentUrls, mergeSegments } from "../utilities/DownloadUtil";

const SelectEpisode = () =>
{
    const [showLoading, set_showLoading] = useState(false);
    const location = useLocation();
    const [episodes, setEpisodes] = useState([]);
    const [daysBefore, setDaysBefore] = useState(0);
    const program = location.state?.program?.folder;
    const channel = location.state?.program?.channel;
    const programName = location.state?.program?.title;
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);
    const isCancelDownload = useRef(false);
    const [downloadProgress, set_downloadProgress] = useState(0);

    useEffect(() =>
    {
        getEpisodeList();
    }, []);

    const checkUrl = async (url) =>
    {
        try
        {
            const response = await axios.head(url, {
                validateStatus: status => status < 400,
                timeout: 500
            });
            return true;
        } catch (error)
        {
            console.log('URL check error:', error.message);
            return false;
        }
    };

    const getEpisodeList = async () =>
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
        } finally
        {
            set_showLoading(false);
        }
    };


    async function download(episode)
    {
        const segmentUrls = await getSegmentUrls(channel, program, episode.replaceAll('-',''));
        const segmentFiles = await downloadSegments(channel, program, episode.replaceAll('-',''), segmentUrls, isCancelDownload, set_downloadProgress);
        await mergeSegments(segmentFiles, episode, programName);
        console.log(segmentUrls);
    }

    return (
        <div
            style={{
                height: '100dvh', // Set a fixed height or use dynamic height
                overflowY: 'auto',
                padding: '20px'
            }}
        >
            {episodes.map((episode, index) => (
                <div key={index} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}
                    onClick={() => download(episode)}
                >
                    {episode}
                </div>
            ))}
            {showLoading && <Loading showLoading={showLoading} />}
            {!hasMore && <div>No more episodes</div>}

            {hasMore && <div onClick={() => {getEpisodeList()}}>Load More</div>}
        </div>
    );
}
export default SelectEpisode;