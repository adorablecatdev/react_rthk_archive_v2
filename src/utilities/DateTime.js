function getCurrentDateTime()
{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');

    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function getDateBeforeDays(days){
    const now = new Date();
    const targetDate = new Date(now.setDate(now.getDate() - days));

    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getDateAfterDays(days){
    const now = new Date();
    const targetDate = new Date(now.setDate(now.getDate() + days));

    const year = targetDate.getFullYear();
    const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
    const day = targetDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getFirstDayOfCurrentYear()
{
    const now = new Date();

    const year = now.getFullYear();

    return `${year}-01-01`;
}

function getCurrentDateOfPrevMonth()
{
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`; // Returns format like: 20240102
}

function getCurrentDateOfPrevYear() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const previousYear = currentYear - 1;
    
    // Get current month and day
    let month = currentDate.getMonth(); // 0-11
    let day = currentDate.getDate();    // 1-31
    
    // Special handling for February 29th
    if (month === 1 && day === 29) {
        // Check if previous year was not a leap year
        if (!isLeapYear(previousYear)) {
            day = 28; // Change to February 28th for non-leap years
        }
    }
    
    // Create new date with previous year
    const newDate = new Date(previousYear, month, day);
    
    // Format the date
    const year = newDate.getFullYear();
    const monthFormatted = String(newDate.getMonth() + 1).padStart(2, '0');
    const dayFormatted = String(newDate.getDate()).padStart(2, '0');
    
    return `${year}-${monthFormatted}-${dayFormatted}`;
}

// Helper function to check for leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getCurrentDateTimeAmPm() {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, make it 12

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

function getCurrentDateTimeFilename()
{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');

    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}_${hour}${minute}${second}`;
}

function getCurrentDate()
{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function getCurrentDateForAdCsv10Digi()
{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');

    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${year}/${month}/${day}`;
}

function getCurrentDateForAdCsv8Digi()
{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');

    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}`;
}


function getCurrentYearMonth()
{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');

    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}`;
}

function getFirstDateOfMonth()
{
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}-01`;
}

function getLastDateOfMonth()
{
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    // Set date to 0 of next month to get last day of current month
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    return `${year}-${month}-${lastDay}`;
}

function getCurrentTime()
{
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');

    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    return `${hour}:${minute}:${second}`;
}

export { getCurrentDateTime, getCurrentDate, getCurrentTime, getCurrentDateTimeFilename, getLastDateOfMonth, getFirstDateOfMonth, getCurrentYearMonth, getCurrentDateForAdCsv10Digi,
    getCurrentDateTimeAmPm,
    getCurrentDateForAdCsv8Digi,
    getCurrentDateOfPrevMonth,
    getFirstDayOfCurrentYear,
    getCurrentDateOfPrevYear,
    getDateBeforeDays,
    getDateAfterDays,
 }