$(document).ready(function() {
    console.log("Initializing Schedule");

    $.getJSON("stundenplan.json", function(data) {
        renderSchedule(data);
    });
    

    var intToDay = function(d) {
        switch (d) {
        case 1:
            return "Montag";
        case 2:
            return "Dienstag";
        case 3:
            return "Mittwoch";
        case 4:
            return "Donnerstag";
        case 5:
            return "Freitag";
        case 6:
            return "Samstag";
        case 7:
            return "Sonntag";
        default:
            return "Keintag(" + d + ")";
        }
    };

    var renderSchedule = function(data) {
        var scheduleDiv = $("#schedule");
        $.each(data, function (i, room) {
            var roomDiv = $("<div>").addClass("Room well pull-left");
            roomDiv.append($("<span>").addClass("RoomName").html(room.RoomName + " - " + room.RoomBuilding));

            console.log(room.Schedule);
            $.each(room.Schedule, function (it, event) {

                var start = new Date(event.StartTime);
                var startString = intToDay(start.getDay()) + " " + pad(start.getHours()) + ":" + pad(start.getMinutes());
                var end = new Date(event.EndTime);
                var endString = intToDay(end.getDay()) + " " + pad(end.getHours()) + ":" + pad(end.getMinutes());


                var eventDiv = $("<div>").addClass("Event");
                eventDiv.append($("<span>").addClass("EventTitle").html(event.EventName));
                eventDiv.append($("<span>").addClass("EventEndTime").html(endString));
                eventDiv.append($("<span>").addClass("EventStartTime").html(startString));
                
                roomDiv.append(eventDiv);
            });

            scheduleDiv.append(roomDiv);
        });
    };
    
});