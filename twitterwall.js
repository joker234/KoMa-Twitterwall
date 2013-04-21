$(document).ready(function () {

    var baseURL = "http://search.twitter.com/search.json";

    var refreshURL;

    $("#submitButton").click(function() {
        run($("#queryField").val());
        $("#search").hide(1000);
    });

    var run = function(searchTerm) {

        refreshURL = "?include_entities=true&q=" + encodeURIComponent(searchTerm);

        update();

        setInterval(update, 1000);

    };

    var update = function () {
        console.log("Making request to: " + baseURL + refreshURL + "&callback=?");

        $.getJSON(baseURL + refreshURL + "&callback=?", {
            cache: false
            }, function (data) {

            console.log("result:");
            console.log(data);

            refreshURL = data.refresh_url;


            $.each(data.results.reverse(), function(i, e) {
                render(e);
            });
        });
    };

    var render = function (tweet) {
        var date = new Date(tweet.created_at);
        var div = $("<div>").addClass("tweet").html("[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + tweet.from_user + ": " + tweet.text);

        div.hide();
        $("#tweets").prepend(div);
        div.slideDown(1000);

    };
});
