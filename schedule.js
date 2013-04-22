$(document).ready(function() {
    console.log("Initializing Schedule");

    $.getJSON("stundenplan.json?callback=?", function(data) {
        renderSchedule(data);
    });

    var renderSchedule = function(data) {
        console.log(data);
        var scheduleDiv = $("#schedule");
        $.each(data, function (i, e) {
            console.log(e);
        });
    };
    
});