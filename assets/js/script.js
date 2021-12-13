// #1 current day is displayed at the top of the calendar using moment.js formatting
$("#currentDay").text(moment().format('dddd, MMMM Do YYYY | h:mm:ss a'));

// #2 presented with time blocks for standard 9.00a-5.00p business hours
var dailyEvents = {
    date: moment().format('dddd, MMMM Do YYY'),
    09: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: ""
};

// #3 each time block is color-coded to indicate whether it is in the past, present, or future
var timeOfDay = function() {
    var currentHour = moment().hour();
    var textAreaEl = document.querySelectorAll("textarea");
    for (var i = 0; i < textAreaEl.length; i++) {
        if (parseInt(textAreaEl[i].getAttribute("data-hour")) > currentHour) {
            textAreaEl[i].classList.add("future");
        }
        else if (parseInt(textAreaEl[i].getAttribute("data-hour")) < currentHour) {
            textAreaEl[i].classList.add("past");
        }
        else {
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
    } else {
        var schedule = JSON.parse(localStorage.getItem("Scheduler"));
        schedule[hour] = text;
        localStorage.setItem("Scheduler", JSON.stringify(schedule));
    }
};

// #6 refresh page, saved events persist
var checkLocalStorage = function() {
    var schedule = JSON.parse(localStorage.getItem("Scheduler"));
    if (!schedule) {
        return false;
    } else if (schedule.date !== dailyEvents.date) {
        return false;
    } else {
        return true;
    }
};

// loading localStorage saved events into scheduler
var loadEvents = function() {
    var schedule = JSON.parse(localStorage.getItem("Scheduler"));
    if (schedule) {
        if (schedule.date === moment().format('dddd, MMMM Do YYYY')) {
            for (var i = 9; i < 18; i++) {
                $("#" + i).children("textarea").val(schedule[i]);
            }
        }
    }
};

// #4 event listener to make #5 & #6 happen
$(".saveBtn").click(function() {
    var hour = $(this).parent().attr("id");
    var text = $(this).parent().children("textarea").val();
    if (!text) {
        // 4a save will not occur without text input
        alert('enter an event before saving');
    } saveEvents(hour, text);
        //4b event saved indicated by appearing & disappearing bootstrap icon
    $("#saved").html('<i class="bi bi-calendar-check-fill"> ᴇᴠᴇɴᴛ s a v e d</i>');
    setInterval(function() {
        $("#saved").html("");
    }, 2000);
});

timeOfDay();
setInterval(timeOfDay, (1000 * 60));
loadEvents();