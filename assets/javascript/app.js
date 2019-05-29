var topics = [
    "Bleach", 
    "Naruto", 
    "One Piece", 
    "Attack On Titan", 
    "Sword Art Online", 
    "Samurai Champloo", 
    "One Punch Man"
];

function showButtons() {

    $("#buttons-div").empty();

    for (var i = 0; i < topics.length; i++) {
        var z = $("<button>")
        z.addClass("topic")
        z.addClass("btn btn-outline-success")
        z.attr("data-name", topics[i])
        z.text(topics[i])
        $("#buttons-div").append(z)
    }
}

$("#add-show").on("click", function(event) {
    event.preventDefault();
    var show = $("#show-search").val().trim();
    topics.push(show);
    showButtons();
})

showButtons()

function displayGif() {
    var show = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    show + "&api_key=7zsz39OTQyVE9ejYzhcxNabKgXCgFVxU&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            var results = response.data
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>")
                var rating = results[i].rating
                var p = $("<p>").text("Rating: " + rating)
                var image = $("<img>").attr("src", results[i].images.fixed_height.url)
                image.attr("data-animated", results[i].images.fixed_height.url)
                image.attr("data-still", results[i].images.fixed_height_still.url)
                image.attr("data-state", "animated")
                image.addClass("gif")
                gifDiv.append(p)
                gifDiv.append(image)
                $("#shows-div").prepend(gifDiv)
            }
        })
    
}

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state")
    
    if (state === "animated") {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
    else
        $(this).attr("src", $(this).attr("data-animated"))
        $(this).attr("data-state", "animated")
})

$(document).on("click", ".topic", displayGif)