// #1 current day is displayed at the top of the calendar using moment.js formatting
$('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));

// #2 presented with time blocks for standard business hours
var dailyEvents = {
    date: moment().format('MMMM Do YYYY'),
    09: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: ""
};

// #3 each time block is color-coded to indicate whether it is in the past, present, or future
var timeOfDay = function() {
    var currentHour = moment().hour();
    var textAreaEl = document.querySelectorAll("textarea");
    for (var i = 0; i < textAreaEl.length; i++) {
        if (parseInt(textAreaEl[i].getAttribute("data-hour")) > currentHour) {
            textAreaEl[i].classList.add("future");
        }
        else if (parseInt(textAreaEl[i].getAttribute("data-hour")) > currentHour) {
            textAreaEl[i].classList.add("past");
        }
        else (parseInt(textAreaEl[i].getAttribute("data-hour")) > currentHour) {
            textAreaEl[i].classList.add("present");
        }       
    }
};

// #5 click save, text for that event is saved in local storage
var saveEvents = function(hour, text) {
    var keepCurrentStorage = checkLocalStorage();
    if (!keepCurrentStorage) {
        dailyEvents[hour] = text;
        localStorage.setItem("Scheduler", JSON.stringify(dailyEvents));
    }
    // else () {}???
};

// #6 refresh page, saved events persist
var checkLocalStorage = function() {

};
var loadEvents = function() {

};

// #4 event listener to make above happen
$('.saveBtn').click(function(){
    var hour = $(this).parent().attr('id');
    var text = $(this).parent().children('textarea').val();
});

timeOfDay();