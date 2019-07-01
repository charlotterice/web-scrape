

    $.getJSON("/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append("<h1 data-id='" + data[i]._id + "'>" +  data[i].title + "<br />" + "http://www.theonion.com/" + data[i].link + "</h1>");

$(document).on("click", "h1", function(){
  $("#notes").empty();
  var thisID = $(this).attr("data-id");
})

$.ajax({
  method: "GET",
  url: "/articles/" + thisID
})

// after AJAX, dynamically add info to the page
.then(function(data) {
  console.log(data);
  // Append the title of the article to the page
  $("#notes").append
  ("<h2>" + data.title + "</h2");

  // Append an input to enter a new note
  $("#notes").append("<input id='titleinput' name='title' >");

  // A button to submit a new note, with the ID of the article saved to it
  $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

  if (data.note) {
    $("#titleinput").val
    (data.note.title);
    // Place body of note in the body text area
    $("#bodyinput").val
    (data.note.body);
  }
});

// Save note button functionality
$(document).on("click", "#savenote", function () {
// Pull in id with that article
var thisID = $(this).attr("data-id");

// Post request to update the note
$.ajax({
  method: "POST",
  url: "/articles/" + thisID,
  data: {
    title: $("#titleinput").val(),
    body: $("#bodyinput").val()
  }
})
// If AJAX is successful,
.then(function(data) {
  console.log(data);
  $("#notes").empty();
});

// Remove all the values entered by the user
$("#titleinput").val("");
$("#bodyinput").val("");
});}});