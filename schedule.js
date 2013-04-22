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

            console.log(room.Schedule);
            $.each(room.Schedule, function (it, event) {

                var start = new Date(event.StartTime);
                var end = new Date(event.EndTime);

                var eventDiv = $("<div>").addClass("Event");
                eventDiv.append($("<span>").addClass("EventTitle").html(event.EventName));
                eventDiv.append($("<span>").addClass("EventStartTime").html(start.getDay + " " + start.getTime));
                eventDiv.append($("<span>").addClass("EventEndTime").html(end.getDay + " " + end.getTime));

                roomDiv.append(eventDiv);
            });

            scheduleDiv.append(roomDiv);
        });
    };
    
});