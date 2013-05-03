$(document).ready(function() {

    var stuff;

    var fetch = function () {
        $.getJSON("stundenplan.json", function(data) {
            stuff = data;
        });
    };
    setInterval(function() {
                renderSchedule();
            },1000);
    setInterval(function() {
                fetch();
            },60000);
    fetch();
    

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

    var renderSchedule = function() {
        console.log("render");
        var scheduleDiv = $("#schedule");
        scheduleDiv.html("");

        var now = new Date();
        var nowString = intToDay(now.getDay()) + " " + pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());

        scheduleDiv.append($("<div>").addClass("well Time").html(nowString));

        $.each(stuff, function (i, room) {
            console.log("render room");
            var roomDiv = $("<div>").addClass("Room well");
            roomDiv.append($("<h4>").addClass("RoomName").html(room.RoomName + " - " + room.RoomBuilding));

            var nextEvents = _.filter(room.Schedule, function(e,i) {
                var end = new Date(e.EndTime);
                var now = new Date();
                console.log(now);
                console.log(end);
                console.log(now < end);
                return now < end;
            });

            console.log(nextEvents);

            $.each(nextEvents, function (it, event) {
                console.log("render event?");
                if (it < 3) {
                    console.log("render event");
                    var start = new Date(event.StartTime);
                    var startString = intToDay(start.getDay()) + " " + pad(start.getHours()) + ":" + pad(start.getMinutes());
                    var end = new Date(event.EndTime);
                    var endString = " - " + pad(end.getHours()) + ":" + pad(end.getMinutes());

                    var eventDiv = $("<div>").addClass("Event");
                    eventDiv.append($("<span>").addClass("EventTitle").html(event.EventName));
                    eventDiv.append($("<span>").addClass("EventTime" + ((start < now) ? " now" : "")).html(startString + endString));

                    roomDiv.append(eventDiv);
                }
            });

            scheduleDiv.append(roomDiv);
        });
    };
    
});