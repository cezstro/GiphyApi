$(document).ready(function() {

  // VARIABLES
  // buttonArray
  var gifButtons = ["Boxing", "Shaw Brothers", "Maserati", "Bitcoin", "Al Bundy"];
  // apiKey
  var apiKey = "90420a160f1b4c4d80e07ed70244f385";
  // queryURL
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=";


  // FUNCTIONS
  // printButtons
  function printButtons() {

    // empties out our div so we can reprint them
    $("#button-holder").empty();

    // Loop over our button array and print out buttons to the DOM
    for (var i = 0; i < gifButtons.length; i++) {

      // Creates Button HTML Tag
      var button = $("<button>");
      
      // Add Classes to Button
      button.addClass("btn btn-block btn-lg btn-dark gif-button");

      // Add attribute to button
      button.attr("data-search", gifButtons[i]);

      // Give button text value
      button.text(gifButtons[i]);

      // Add button to div with ID of button-holder
      $("#button-holder").append(button);


    }
  }
  printButtons();
  
  // printGifs
  function printGifs(gifArray) {
    $("#gif-holder").empty();

    for (var i = 0; i < gifArray.length; i++) {
      // holder div
      var gifDiv = $("<div>");

      // add classes to divs
      gifDiv.addClass("col-md-6");

      var gifRating = gifArray[i].rating;

      var gifTitle = gifArray[i].title;

      gifDiv.append("<h3>" + gifTitle + "</h3>");

      gifDiv.append("<h5>" + gifRating + "</h5>");
      
      var gifImage = $("<img>");

      gifImage.addClass("gif-image");

      gifImage.attr("src", gifArray[i].images.fixed_width_still.url);
      
      gifImage.attr("data-state", "still");

      gifImage.attr("data-still", gifArray[i].images.fixed_width_still.url);

      gifImage.attr("data-animated", gifArray[i].images.fixed_width.url);

      gifDiv.append(gifImage);

      $("#gif-holder").append(gifDiv);

    }

  }



  // apiCall
  function apiCall(query) {

    $.ajax({
      url: queryURL + query,
      method: "GET"
    }).done(function(gifResponse) {
      console.log(gifResponse);
      var returnedData = gifResponse.data;

      printGifs(returnedData);
    })

  }


  // EVENT LISTENERS
  // Click Event for searchTerm
  $("#search-submit").on("click", function(event) {
    event.preventDefault();

    // Grabs value of our search box and cuts off white space
    var searchVal = $("#search").val().trim();
    $("#search").val("");

    // Check to see if search value is empty or not
    if (searchVal !== "") {
      // Push new search term into gif buttons array
      gifButtons.push(searchVal);

      // rerun printButtons
      printButtons();
    }



  });


  // Click Event for gifButton
  $(document).on("click", ".gif-button", function() {
    console.log(this);
    var buttonValue = $(this).attr("data-search");
    console.log(buttonValue);

    apiCall(buttonValue);

  })


  // Click event for pausing/starting our gifs
  $(document).on("click", ".gif-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animated"));

      $(this).attr("data-state", "animated");
    }
    else if (state === "animated") {
      $(this).attr("src", $(this).attr("data-still"));
      
      $(this).attr("data-state", "still");
    }
  })


})