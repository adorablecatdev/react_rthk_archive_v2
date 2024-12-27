import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentDate, getDateBeforeDays } from "../utilities/DateTime";
import Loading from "../components/Loading";

const SelectEpisode = () =>
{
    const [showLoading, set_showLoading] = useState(false);
    const location = useLocation();
    const [episodes, setEpisodes] = useState([]);
    const [daysBefore, setDaysBefore] = useState(0);
    const program = location.state?.program;
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);

    useEffect(() =>
    {
        const newprogram = location.state?.program;
        getEpisodeList();
    }, []);

    // Add this useEffect to check container size
    useEffect(() =>
    {
        checkAndLoadMore();
    }, [episodes]);

    const checkAndLoadMore = () =>
    {
        if (!containerRef.current) return;

        const { scrollHeight, clientHeight } = containerRef.current;
        // If container is not scrollable (content is shorter than container)
        if (scrollHeight <= clientHeight && hasMore && !showLoading)
        {
            getEpisodeList();
        }
    };

    const checkUrl = async (url) =>
    {
        try
        {
            const response = await axios.head(url, {
                validateStatus: status => status < 400,
                timeout: 5000
            });
            return true;
        } catch (error)
        {
            console.log('URL check error:', error.message);
            return false;
        }
    };

    async function handleScroll(e)
    {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        // Check if scrolled near bottom (within 50px)
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;

        if (isNearBottom && !showLoading && hasMore)
        {
            await getEpisodeList();
        }
    }

    const getEpisodeList = async () =>
    {
        if (showLoading) return;

        set_showLoading(true);
        try
        {
            const new_episodes = [];

            let counter = 0;
            while (counter < 10)
            {
                const url = `https://rthkaod2022.akamaized.net/m4a/radio/archive/radio1/itsahappyday/m4a/${getDateBeforeDays(daysBefore + counter).replaceAll('-', '')}.m4a/index_0_a.m3u8`;
                const valid = await checkUrl(url);
                if (valid)
                {
                    new_episodes.push(getDateBeforeDays(daysBefore + counter));
                }
                counter++;
            }

            if (new_episodes.length === 0)
            {
                setHasMore(false);
            } 
            else
            {
                setEpisodes(prevList => [...prevList, ...new_episodes]);
                setDaysBefore(daysBefore + counter);
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

    return (
        <div
            onScroll={handleScroll}
            ref={containerRef}
            style={{
                height: '100dvh', // Set a fixed height or use dynamic height
                overflowY: 'auto',
                padding: '20px'
            }}
        >
            {episodes.map((episode, index) => (
                <div key={index} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}>
                    {episode}
                </div>
            ))}
            {showLoading && <Loading showLoading={showLoading} />}
            {!hasMore && <div>No more episodes</div>}
        </div>
    );
}
export default SelectEpisode;