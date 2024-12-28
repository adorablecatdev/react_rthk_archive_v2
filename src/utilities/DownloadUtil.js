import axios from "axios";

async function getSegmentUrls(station, program, date)
{
    var segmentUrls = [];

    try
    {
        const url = `https://rthkaod2022.akamaized.net/m4a/radio/archive/${station}/${program}/m4a/${date}.m4a/index_0_a.m3u8?`;
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

    }
    return segmentUrls;
}

async function downloadSegments(station, program, date, segmentUrls, isCancelDownload, set_downloadProgress)
{
    var segmentFiles = [];
    try
    {
        for (var i = 0; i < segmentUrls.length; i++)
        {
            if (isCancelDownload.current == false)
            {
                const url = `https://rthkaod2022.akamaized.net/m4a/radio/archive/${station}/${program}/m4a/${date}.m4a/${segmentUrls[i]}`;
                const response = await axios.get(url, { responseType: 'arraybuffer' });
                segmentFiles.push(response.data);

                set_downloadProgress(parseInt(i * 100 / segmentUrls.length));
            }
            else
            {
                break;
            }
        }
    }
    catch
    {
        isCancelDownload.current = true
    }

    return segmentFiles;
}

async function mergeSegments(segmentFiles, date, programName)
{
    try 
    {
        const mergedBlobParts = [];

        for (var i=0 ; i<segmentFiles.length ; i++)
        {
            mergedBlobParts.push(new Blob([segmentFiles[i]], { type: 'video/mp2t' }));
        }

        const mergedBlob = new Blob(mergedBlobParts, { type: 'video/mp2t' });
        const downloadUrl = URL.createObjectURL(mergedBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = `${programName} ${date}.ts`;
        downloadLink.click();
        // setDownloadProgress(100);
        // setIsDownloadFinish(true);
    } 
    catch (error) 
    {
        console.error('Error merging TS files:', error);
    }
}


export { getSegmentUrls, downloadSegments, mergeSegments }