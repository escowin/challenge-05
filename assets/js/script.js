// logic.display current time, updating every second
var currentDay = function() {
    $("#currentDay").text(moment().format('dddd, MMMM Do | h:mm:ss a'));
    console.log(`
    \u00A9 Edwin M. Escobar
    https://github.com/escowin/workday-scheduler
    `);
};

setInterval(currentDay, 1000);

// data.setting the working hours of the day
var dailyEvents = {
    date: moment().format('dddd, MMMM Do YYY'),
    06: "",
    07: "",
    08: "",
    09: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: ""
};

// logic.styling time blocks relative to current time.
var timeOfDay = function() {
    var currentHour = moment().hour();
    var textAreaEl = document.querySelectorAll("textarea");
    for (var i = 0; i < textAreaEl.length; i++) {
        if (parseInt(textAreaEl[i].getAttribute("data-hour")) > currentHour) {
            // future hours are shown in green
            textAreaEl[i].classList.add("future");
        } else if (parseInt(textAreaEl[i].getAttribute("data-hour")) < currentHour) {
            // past hours are shown in gray
            textAreaEl[i].classList.add("past");
        } else {
            // present is shown in red
            textAreaEl[i].classList.add("present");
        }
    }
};

// logic.saving events
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

// logic.checking the local storage for "Scheduler" key
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

// logic.loading localStorage saved events into scheduler
var loadEvents = function() {
    var schedule = JSON.parse(localStorage.getItem("Scheduler"));
    if (schedule) {
        for (var i = 0; i < schedule.date.length; i++) {
            $("#" + i).children("textarea").val(schedule[i]);
        }
    }
};

// #4 event listener to make #5 & #6 happen
$(".saveBtn").click(function() {
    var hour = $(this).parent().attr("id");
    var text = $(this).parent().children("textarea").val();
    localStorage.setItem(hour, text)
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