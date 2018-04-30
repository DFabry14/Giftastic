$(document).ready(function () {

    var topics = [
        "Chicago Cubs",
        "Chicago Bears",
        "Blackhawks",
        "Liverpool FC",
        "FC Barcelona"
    ];
    var API_KEY = "GXXwXr70K1uddvAyXyppmUoE10K1xLQy";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info topic");
        button.text(topics[i]);
        $("#buttons").append(button);
    }

    $(document).on("click", ".topic", function () {
        $(".gifs").empty();
        $.ajax({
            method: "GET",
            url: queryURL + $(this).text(),
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var img = createImage(response, i);
                $(".gifs").append(img);
                $(".ratings").text(response.data[i].rating);
            }
        })
    })

    $(document).on("click", ".giphy-img", function () {
        var state = $(this).attr("data-state");
        if (state === "animated") {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
            console.log($(this).attr("data-still"));
        } else {
            $(this).attr("data-state", "animated");
            $(this).attr("src", $(this).attr("data-animated"));
        }
    })

    $(document).on("click", ".newTeam", function () {
        var inputText = $("#teamInput").val();
        console.log(inputText);
        var button = $("<button>");
        button.addClass("btn btn-info topic");
        button.text(inputText);
        $("#buttons").append(button);
    })

    function createImage(response, i) {
        var img = $("<img class='giphy-img'>");
        img.attr("src", response.data[i].images.fixed_width.url);
        img.attr("data-animated", response.data[i].images.fixed_width.url);
        img.attr("data-still", response.data[i].images.fixed_width_still.url);
        img.attr("data-state", "animated");

        var gifCard = $("<div class='gif-card'>");
        var pRating = $("<p>");

        gifCard.append(img);
        pRating.append("Rating: " + response.data[i].rating);
        gifCard.append(pRating);
        return gifCard;
        return img;
    }

});
