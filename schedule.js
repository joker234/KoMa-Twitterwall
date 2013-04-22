$(document).ready(function() {
    console.log("Initializing Schedule");

    $.getJSON("stundenplan.json?", function(data) {
        renderSchedule(data);
    });

    var renderSchedule = function(data) {
        var scheduleDiv = $("#schedule");
        $.each(data, function (i, room) {
            var roomDiv = $("<div>").addClass("Room");
            roomDiv.append($("<span>").addClass("RoomName").html(room.RoomName + " - " + room.RoomBuilding));

            $.each(room.Schedule, function (i, event) {
                var eventDiv = $("<div>").addClass("Event");
                eventDiv.append($("<span>").addClass("EventTitle").html(event.EventName));
                eventDiv.append($("<span>").addClass("EventStartTime").html(event.StartTime));
                eventDiv.append($("<span>").addClass("EventEndTime").html(event.EndTime));
            });

            scheduleDiv.append(roomDiv);
        });
    };
    
});