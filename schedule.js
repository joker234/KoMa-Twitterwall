$(document).ready(function() {
    console.log("Initializing Schedule");

    var schedule = $.getJSON("stundenplan.json?callback=?");

    console.log(schedule);

});