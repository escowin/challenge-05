// #1 current day is displayed at the top of the calendar
$('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));

// #2 presented with time blocks for standard business hours
var dailyEvents = {
    date: (moment().format('MMMM Do YYYY, h:mm:ss a');
    09: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
};

// #3 each time block is color-coded to indicate whether it is in the past, present, or future
var timeOfDay = function() {
    var currentHour = moment().hour();
    var textAreaEl = document.querySelectorAll("textarea");
}
// #4 click into time block, enter an event

// #5 click save, text for that event is saved in local storage

// #6 refresh page, saved events persist