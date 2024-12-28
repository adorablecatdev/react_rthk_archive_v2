import axios from "axios";

async function getSegmentUrls(station, program, episode, isCancelDownloadRef)
{
    var segmentUrls = [];

    try
    {
        const url = `https://rthkaod2022.akamaized.net/m4a/radio/archive/${station}/${program}/m4a/${episode.replaceAll('-', '')}.m4a/index_0_a.m3u8?`;
        const response = await axios.get(url);
        const content = response.data;

        var splitArray = content.toString().split('\n');

        for (var i = 0; i < splitArray.length; i++)
        {
            if (splitArray[i].substring(0, 7) == 'segment')
                segmentUrls.push(splitArray[i]);
        }
    }
    catch
    {
        // delete downloadControllersRef.current[episode];
        // delete isCancelDownloadRef.current[episode];
    }
    return segmentUrls;
}

async function downloadSegments(station, program, episode, segmentUrls, isCancelDownloadRef, set_downloadProgress)
{
    var segmentFiles = [];
    try
    {
        for (var i = 0; i < segmentUrls.length; i++)
        {
            if (isCancelDownloadRef.current[episode] == false)
            {
                const url = `https://rthkaod2022.akamaized.net/m4a/radio/archive/${station}/${program}/m4a/${episode.replaceAll('-', '')}.m4a/${segmentUrls[i]}`;
                const response = await axios.get(url, { responseType: 'arraybuffer' });
                segmentFiles.push(response.data);


                set_downloadProgress((prev) => ({ ...prev, [episode]: parseInt(i * 100 / segmentUrls.length) }));
            }
            else
            {
                break;
            }
        }
    }
    catch
    {
        delete isCancelDownloadRef.current[episode];
    }

    return segmentFiles;
}

async function mergeSegments(segmentFiles, episode, programName, isCancelDownloadRef)
{
    try 
    {
        const mergedBlobParts = [];

        for (var i = 0; i < segmentFiles.length; i++)
        {
            if (isCancelDownloadRef.current[episode] == false)
            {
                mergedBlobParts.push(new Blob([segmentFiles[i]], { type: 'video/mp2t' }));
            }
        }

        if (isCancelDownloadRef.current[episode] == false)
        {
            const mergedBlob = new Blob(mergedBlobParts, { type: 'video/mp2t' });
            const downloadUrl = URL.createObjectURL(mergedBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = `${programName} ${episode}.ts`;
            downloadLink.click();
        }

        // setDownloadProgress(100);
        // setIsDownloadFinish(true);
    }
    catch (error) 
    {
        console.error('Error merging TS files:', error);
        delete isCancelDownloadRef.current[episode];
    }
}


export { getSegmentUrls, downloadSegments, mergeSegments }