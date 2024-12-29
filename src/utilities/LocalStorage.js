import localforage from "localforage";

async function getStorageItem(key)
{
    try
    {
        const value = await localforage.getItem(key);
        return value || {};
    }
    catch (error)
    {
        console.error(`Error retrieving ${key} from storage:`, error);
        return {};
    }
}

async function setStorageItem(key, value)
{
    try
    {
        await localforage.setItem(key, value);
        return true;
    } catch (error)
    {
        console.error(`Error storing ${key} to storage:`, error);
        return false;
    }
}

export { getStorageItem, setStorageItem }