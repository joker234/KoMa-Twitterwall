$(document).ready(function() {

    var stuff;
    var news;
    var currentNews = -1;

    var fetch = function () {
        $.getJSON("stundenplan.json", {
                cache: false
            }, function(data) {
                stuff = data;
        });

	   $.getJSON("news.json", {
                cache: false
            }, function(data) {
                console.log("Newsupdate ", data.length);
                if (news == null)
                {
                    news = data;
                    changeNews();
                } else {
                    news = data;
                }
        });
    };

    setInterval(function() {
                renderSchedule();
            },1000);
    setInterval(function() {
                fetch();
            },33000);
    fetch();
    setInterval(function() {
        changeNews();
    }, 10000);


    var changeNews = function() {
        console.log("there are news: ", news.length);
        newsPara = $("#news-data");
        currentNews = (currentNews+1) % news.length;
        var newNews = "<b>" + news[currentNews].author + "</b> | " +
            news[currentNews].message;

        newsPara.animate({
            left: (window.innerWidth * -1) + "px"
        },3000, function() {
            newsPara.html(newNews);
            newsPara.css("left", window.innerWidth + "px");
            newsPara.animate({"left": (window.innerWidth/2) - (newsPara.width()/2)},3000);
        });
    };
    

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
        case 0:
            return "Sonntag";
        default:
            return "Keintag(" + d + ")";
        }
    };

    var renderSchedule = function() {
        var scheduleDiv = $("#schedule");
        scheduleDiv.html("");

        var now = new Date();
        var nowString = intToDay(now.getDay()) + " " + pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());

        scheduleDiv.append($("<div>").addClass("well Time").html(nowString));

        $.each(stuff, function (i, room) {
            var roomDiv = $("<div>").addClass("Room well");

            var roomName = room.RoomName;
            if (room.RoomBuilding != "")
            {
                roomName = roomName + " - " + room.RoomBuilding;
            }

            roomDiv.append($("<h4>").addClass("RoomName").html(roomName));

            var nextEvents = _.filter(room.Schedule, function(e,i) {
                var end = new Date(e.EndTime);
                var now = new Date();
                return now < end;
            });

            if (nextEvents.length > 0)
            {
                $.each(nextEvents, function (it, event) {
                    if (it < 3) {
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
            }
        });
    };
    
});
