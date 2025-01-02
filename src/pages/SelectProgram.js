import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProgramItem from "../components/ProgramItem";
import styles from "./styles/SelectProgram.module.css";
import Loading from "../components/Loading";
import Navigation from "../components/Navigation";
import { getStorageItem } from "../utilities/LocalStorage";
import { Fade } from "react-bootstrap";
import ChannelButton from "../components/ChannelButton";
import LoadMoreButton from "../components/LoadMoreButton";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";

const SelectProgram = ({ }) =>
{
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
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


    async function initialize()
    {
        const new_bookmarks = await getStorageItem('bookmarks');
        set_bookmarks(new_bookmarks);

        let new_selectedChannel = '';
        if (urlParams.has('channel'))
            new_selectedChannel = urlParams.get('channel');
        else
            new_selectedChannel = 'radio1';

        set_selectedStation(new_selectedChannel)

        getProgramList(true, new_selectedChannel);
    }

    async function getProgramList(reset = false, selectedStation_in)
    {
        if (showLoading) return;

        set_showLoading(true);
        try
        {
            // await new Promise(r => setTimeout(r, 5000));
            const segment = reset ? 1 : loadSegment;

            const timestamp = new Date().getTime();
            const rthkUrl = `https://www.rthk.hk/archive/archive_channel/${selectedStation_in}_latest/${segment}?_t=${timestamp}`;
            const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rthkUrl);

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

    function onClickChannel(channel_in)
    {
        scrollToTop();
        set_selectedStation(channel_in);
        getProgramList(true, channel_in);
        set_loadSegment(1);
        setHasMore(true);
        urlParams.set('channel', channel_in);
        navigate('?' + urlParams.toString(), { replace: true });
    }

    return (
        <div className={styles.container}>
            <Navigation currentLocation={'selectProgram'} />
            <Loading showLoading={showLoading} />

            <Fade in={showContent}>
                <div className={styles.contentContainer}>

                    <div className={styles.radioButtonContainer}>
                        <ChannelButton
                            text={'第一台'}
                            onClick={() => { onClickChannel('radio1'); }}
                            isSelected={selectedStation == 'radio1'}
                        />
                        <ChannelButton
                            text={'第二台'}
                            onClick={() => { onClickChannel('radio2'); }}
                            isSelected={selectedStation == 'radio2'}
                        />
                        <ChannelButton
                            text={'第三台'}
                            onClick={() => { onClickChannel('radio3'); }}
                            isSelected={selectedStation == 'radio3'}
                        />
                        <ChannelButton
                            text={'第四台'}
                            onClick={() => { onClickChannel('radio4'); }}
                            isSelected={selectedStation == 'radio4'}
                        />
                        <ChannelButton
                            text={'第五台'}
                            onClick={() => { onClickChannel('radio5'); }}
                            isSelected={selectedStation == 'radio5'}
                        />
                    </div>

                    <div className={styles.programList} ref={programListRef}>

                        {programList && programList.map((program, index) =>
                            <ProgramItem
                                key={index}
                                program={program}
                                bookmarks={bookmarks}
                                set_bookmarks={set_bookmarks}
                            />
                        )}

                        {programList && programList.length > 0 && (hasMore || showLoading) &&
                            <LoadMoreButton
                                text={showLoading ? '讀取中' : '讀取更多'}
                                onClick={() => { showLoading == false && getProgramList(false, selectedStation) }}
                                isLoading={showLoading}
                            />
                        }

                        {!programList || programList.length == 0 &&
                            <Error text={'找不到節目'} />
                        }
                    </div>
                </div>
            </Fade >
        </div >
    )
}

export default SelectProgram;