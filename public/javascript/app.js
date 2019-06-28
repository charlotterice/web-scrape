


var displayArticles = function () {
    $.getJSON("/articles", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append("<div id='artDiv'class='col-4'><img class='art-image' src='" + data[i].image + "'>" + "<h3>" + data[i].title + "</h3>" + "</p><br/><p class='summary'>" + data[i].summary + "</p>" + "<a class='btn btn-secondary' href='https://www.lonelyplanet.com/travel-tips-and-articles" + data[i].link + "' role='button'>Read Article</a>  <a class='btn btn-danger save-btn' id='" + data[i]._id + "'method='POST'  role='button'>Save Article</a></div>");
        }

    });
}


var displaySaved = function () {
    console.log("im here")
    $("#saved-well").empty();
    $.getJSON("/saved/display", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#saved-well").append("<div id='saveDiv'class='col-12'><div class='row'><img class='save-image col-3' src='" + data[i].image + "'>" + "<div class='col-9'><h3>" + data[i].title + "</h3>" + "</p><br/><p class='summary'>" + data[i].summary + "</p>" + "<a class='btn btn-secondary' href='https://www.lonelyplanet.com/travel-tips-and-articles" + data[i].link + "' role='button'>Read Article</a>  <a class='btn btn-warning remove-save-btn' id='" + data[i]._id + "'  role='button'>Remove from Saved</a>  <a class='btn note-btn' data-id='" + data[i]._id + "'data-toggle='modal' data-target='#myModal' role='button'>Add a Note</a>  <a class='btn  view-notes-btn' data-id='" + data[i]._id + "'data-toggle='modal' data-target='#myNotesModal' role='button'>View Notes</a><br></div></div></div>");
        }

    });
}


// Get articles as json, display on page
$("#scrape-btn").on("click", function () {

    displayArticles();
});

$("#save-display").on("click", function () {

console.log("click")
    displaySaved();
    // displayNotes();
});

$(document).on("click", ".remove-save-btn", function () {

    console.log("Remove click");
    var thisId = $(this).attr("id");
    console.log(thisId);
    $.ajax({
        method: "POST",
        url: "/articles/saved/remove/" + thisId,
        success: function (response) {
            console.log("Success remove!!!");

            displaySaved();
        },
        error: function (error) {
            console.log(error);
        }
        
    });
    
});

$(document).on("click", ".save-btn", function () {

    console.log("click");
    var thisId = $(this).attr("id");
    console.log(thisId);
    $.ajax({
        method: "POST",
        url: "/articles/saved/" + thisId,
        success: function (response) {
            console.log("Success!!!");
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$(document).on("click", ".note-btn", function() {
    // Empty the notes from the note section
    $("#notes").empty();
   
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2 class='note-title'>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<label>Title: </label><br><input class='noteInput' id='titleinput' name='title' ><br>");
        // A textarea to add a new note body
        $("#notes").append("<label>Message: </label> <br><textarea class='noteInput' id='bodyinput' name='body'></textarea><br>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-dismiss='modal' data-id='" + data._id + "' class='noteBtn' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.notes) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.notes.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.notes.body);
        }
      });
  });
  $(document).on("click", ".view-notes-btn", function() {
    // Empty the notes from the note section
    $("#notes").empty();
   
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    // $.ajax({
    //   method: "GET",
    //   url: "/articles/notes/" + thisId
    // })
    //   // With that done, add the note information to the page
    //   .then(function(data) {
    //     console.log("new"+ data);
    //     // The title of the article
    //     $("#viewNotes").append("<h2 class='note-title'>" + data.title + "</h2>");
       
  
      
    //   });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // displayNotes();
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
   
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });