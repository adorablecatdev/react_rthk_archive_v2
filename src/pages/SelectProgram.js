import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProgramItem from "../components/ProgramItem";
import styles from "./styles/SelectProgram.module.css";
import { DatePicker, Select } from "antd";
import Loading from "../components/Loading";
import { getCurrentDate, getDateAfterDays, getDateBeforeDays } from "../utilities/DateTime";
import dayjs from "dayjs";

const SelectProgram = ({ }) =>
{
    const [showLoading, set_showLoading] = useState(false);
    const [selectedDate, set_selectedDate] = useState(getCurrentDate());
    const [selectedStation, set_selectedStation] = useState('radio1');
    const [programList, set_programList] = useState([]);
    const [loadSegment, set_loadSegment] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const containerRef = useRef(null);

    useEffect(() =>
    {
        getProgramList(true);
    }, [selectedStation, selectedDate]);

    // Check if we should load more after the list updates
    useEffect(() =>
    {
        checkAndLoadMore();
    }, [programList]);

    const checkAndLoadMore = () =>
    {
        if (!containerRef.current) return;

        const { scrollHeight, clientHeight } = containerRef.current;
        // If container is not scrollable (content is shorter than container)
        if (scrollHeight <= clientHeight && hasMore && !showLoading)
        {
            getProgramList(false);
        }
    };

    async function handleScroll(e)
    {
        const bottom = Math.abs(e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight) < 1;

        if (bottom && !showLoading && hasMore) { await getProgramList(false); }
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
        }
    }

    return (
        <div>
            <Loading showLoading={showLoading} />

            <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={(e) =>
                {
                    set_selectedStation(e);
                    setHasMore(true);
                    set_loadSegment(1);
                }}
                options={[
                    { value: 'radio1', label: '第一台' },
                    { value: 'radio2', label: '第二台' },
                    { value: 'radio3', label: '第三台' },
                    { value: 'radio4', label: '第四台' },
                    { value: 'radio5', label: '第五台' },
                ]}
                value={selectedStation}
            />

            <div
                ref={containerRef}
                className={styles.programList}
                onScroll={handleScroll}
            >
                {programList && programList.map((program, index) =>
                    <ProgramItem key={index} program={program} />
                )}

                {showLoading && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        Loading more...
                    </div>
                )}

                {!hasMore && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        No more programs to load
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectProgram;