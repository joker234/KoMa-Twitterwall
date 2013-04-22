$(document).ready(function() {
    console.log("Initializing Schedule");

    $.getJSON("stundenplan.json?", function(data) {
        renderSchedule(data);
    });

    var renderSchedule = function(data) {
        var scheduleDiv = $("#schedule");
        $.each(data, function (i, e) {
            var roomDiv = $("<div>").addClass("Room");
            roomDiv.append($("<span>").addClass("RoomName").html(e.RoomName + " - " + e.RoomBuilding));

            scheduleDiv.append(roomDiv);
        });
    };
    
});