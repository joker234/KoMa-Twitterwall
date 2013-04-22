$(document).ready(function() {
    console.log("Initializing Schedule");

    $.getJSON("stundenplan.json?", function(data) {
        renderSchedule(data);
    });

    var intToDay = function(d) {
        switch (d) {
        case 0:
            return "Montag";
        case 0:
            return "Dienstag";
        case 0:
            return "Mittwoch";
        case 0:
            return "Donnerstag";
        case 0:
            return "Freitag";
        case 0:
            return "Samstag";
        case 0:
            return "Sonntag";
        default:
            return "Keintag";
        }
    };

    var renderSchedule = function(data) {
        var scheduleDiv = $("#schedule");
        $.each(data, function (i, room) {
            var roomDiv = $("<div>").addClass("Room");
            roomDiv.append($("<span>").addClass("RoomName").html(room.RoomName + " - " + room.RoomBuilding));

            console.log(room.Schedule);
            $.each(room.Schedule, function (it, event) {

                var start = new Date(event.StartTime);
                var startString = intToDay(start.getDay()) + " " + start.getHours() + " " + start.getMinutes();
                var end = new Date(event.EndTime);
                var endString = intToDay(end.getDay()) + " " + end.getHours() + " " + end.getMinutes();


                var eventDiv = $("<div>").addClass("Event");
                eventDiv.append($("<span>").addClass("EventTitle").html(event.EventName));
                eventDiv.append($("<span>").addClass("EventStartTime").html(startString));
                eventDiv.append($("<span>").addClass("EventEndTime").html(endString));

                roomDiv.append(eventDiv);
            });

            scheduleDiv.append(roomDiv);
        });
    };
    
});