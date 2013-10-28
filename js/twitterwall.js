function pad(num) {
    var s = num + "";
    while (s.length < 2) s = "0" + s;
    return s;
}

$(document).ready(function () {

    var baseURL = "http://1favre.de/wall/search.php";

    var refreshURL;

    $("#submitButton").click(function() {
        run($("#queryField").val());
        $("#search").hide(1000);
    });

    var run = function(searchTerm) {

        refreshURL = "?include_entities=true&q=" + encodeURIComponent(searchTerm);

        update();

        setInterval(update, 20000);

    };

    var update = function () {
        //console.log("Making request to: " + baseURL + refreshURL + "&callback=?");

        $.getJSON(baseURL + refreshURL + "&callback=?", {
            cache: false
        }, function (data) {
           
            console.log(data); 

            refreshURL = data.search_metadata.refresh_url;


            $.each(data.statuses.reverse(), function(i, e) {
                render(e);
            });
        });
    };

    var render = function (tweet) {
        var date = new Date(tweet.created_at);
        var div = $("<div>").addClass("tweet well")

        var tweettext = $("<span>").addClass("tweet-text").html("[" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + "] <b>" + tweet.user.screen_name + ":</b> " + tweet.text);

        var profileImage = $("<img />")
        profileImage.attr("src",tweet.user.profile_image_url);

        profileImage.addClass("img-polaroid profile-image");

        div.append(profileImage);
        div.append(tweettext);

        if (tweet.entities.media != null && tweet.entities.media[0].type == "photo")
        {
            var entity = tweet.entities.media[0];
            var image = $("<img />");
            image.attr("src",entity.media_url);
            image.addClass("img-polaroid tweet-image")
            image.css({
                width: entity.sizes.small.w,
                height: entity.sizes.small.h
                });
            div.append(image);
        }

        div.hide();
        $("#tweets").prepend(div);
        div.slideDown(1000);

        var count = $(".tweet").length;
        
        
        for (var i = 20; i < count; i++) {
            var item = $(".tweet:nth-child(" + i + ")");
            item.remove();
        }
    };
});
