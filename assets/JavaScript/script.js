//Declare all the variables needed for later
const currDate = new Date();
let trackerDateCurr = currDate;
let trackerDateSwap = trackerDateCurr;
const months = [
    ['January', 31],
    ['February', 28],
    ['March', 31],
    ['April', 30],
    ['May', 31],
    ['June', 30],
    ['July', 31],
    ['August', 31],
    ['September', 30],
    ['October', 31],
    ['November', 30],
    ['December', 31]
];
const title = document.querySelector('.title');
const monthDays = document.querySelector('.month');
const next = document.querySelector('.arrow-right');
const prev = document.querySelector('.arrow-left');
const backToCurr = document.querySelector('.current-date');

//Function that takes a date as a parameter to update the calendar
function updateCal(date) {
    //Making the function's variables
    let updateDate = date;
    let yy = updateDate.getFullYear();
    let mm = updateDate.getMonth();
    let day = [];

    //Update title
    title.innerHTML = `<h1>${months[mm][0]} ${yy}`;

    //Checks for leap year and changes days in Feb accordingly
    if (yy % 4 === 0 && yy % 100 !== 0 || yy % 400 === 0) {
        months[1][1] = 29;
    }

    //Get last days of the last month, first day of the current month, and last day of the current month
    let firstDay = new Date(yy, mm, 1);
    let lastMMDay = (mm === 0)? months[11][1] : months[mm - 1][1];
    let lastDay = new Date(yy, mm, months[mm][1]);

    //Get the previous month's days to populate the empty calendar space
    for (let i = 0; i < firstDay.getDay(); i++) {
        day.unshift(`<div class="date not-this-month">${lastMMDay - i}</div>`);
    }

    //Adding the days of the current month
    for (let i = 1; i <= months[mm][1]; i++) {
        if (i === currDate.getDate() && mm === currDate.getMonth() && yy === currDate.getFullYear()) {
            day.push(`<div class="date active">${i}</div>`);
        } else {
            day.push(`<div class="date">${i}</div>`);
        }
    }

    //Get empty space at the end of the calendar will be populated with the first days of the next month
    let j = 1;
    for (let i = lastDay.getDay(); i < 6; i++) {
        day.push(`<div class="date not-this-month">${j}</div>`);
        ++j;
    }
    
    //Add days to the document
    monthDays.innerHTML = day.join('');
}

//Initialize the calendar with the current date first
updateCal(currDate);

//Create event listeners for buttons that update the calendar
next.addEventListener('click', function() {
    trackerDateCurr = new Date(trackerDateSwap.getFullYear(), trackerDateSwap.getMonth() + 1);
    updateCal(trackerDateCurr);
    trackerDateSwap = trackerDateCurr;
});

prev.addEventListener('click', function() {
    trackerDateCurr = new Date(trackerDateSwap.getFullYear(), trackerDateSwap.getMonth() - 1);
    updateCal(trackerDateCurr);
    trackerDateSwap = trackerDateCurr;
});

//Go back to the current date
backToCurr.addEventListener('click', function() {
    updateCal(currDate);
    trackerDateCurr = currDate;
    trackerDateSwap = currDate;
});