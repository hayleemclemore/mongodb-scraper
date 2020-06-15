$(document).ready(function() {
  var articleContainer = $(".article-container");

  $(document).on("click", ".btn.delete", articleDelete);
  $(document).on("click", ".btn.notes", articleNotes);
  $(document).on("click", ".btn-save", noteSave);
  $(document).on("click", ".btn.note-delete", noteDelete);

  init();

  function init() {
      articleContainer.empty();
      $.get("/api/headlines?saved=true")
      .then(function(data){
          console.log(data);

          if(data && data.length){
              renderArticles(data);
          } else {
              renderEmpty();
          }
      });
  }

  function renderArticles(articles) {
      var articlePanels = [];

      for (var i = 0; i <articles.length; i++){
          articlePanels.push(createPanel(articles[i]));
      }
      articleContainer.append(articlePanels);
  }

  function createPanel(article){
      var panel = 
      $(["<div class='panel panel-default'>",
          "<div class='panel-heading'>",
          "<h3>",
          article.headline,
          "<a class='btn btn-success save'>",
          "Save Article",
          "</a>",
          "</h3>",
          "</div>",
          "<div class='panel-body'>",
          article.summary,
          "</div>",
          "</div>"
      ].join(""));
      panel.data("_id", article._id);
      return panel;
  }

  function renderNotesList(data) {
      var notesToRender = [];
      var currentNote;
      if(!data.notes.length){
          currentNote = [
              "<li class='list-group-item'>",
              "No notes for this article.",
              "</li>"
          ].join("");
      }else {
          for (var i = 0; i < data.notes.length; i++){
              currentNote = $([
                  "<li class='list-group-item note'>",
                  data.notes[i].noteText,
                  "<button class='btn btn-danger note-delete'>",
                  "</li>"
              ].join(""));

              currentNote.children("button").data("_id", data.notes[i]._id);

              notesToRender.push(currentNote);
          }
      }
      $(".note-container").append(notesToRender);
  }

  function renderEmpty() {
      var emptyAlert = 
      $(["<div class='alert alert-warning text-center'>",
      "<h4>No new articles.</h4>",
      "</div>",
      "<div class='panel panel-default'>",
      "<div class 'panel-heading text-center'>",
      "<h3>What would you like to do?</h3>",
      "</div>",
      "<div class='panel-body text-center'>",
      "<h4><a class='scrape-new'>Scrape New Article</a></h4>",
      "<h4><a href='/saved'>Visit Saved Articles</a></h4>",
      "</div>",
      "</div>"
      ].join(""));
      articleContainer.append(emptyAlert);
  }

  function noteSave() {
      var note;
      var newNote = $(".bootbox-body textarea").val().trim();

      if(newNote){
          note = {
              _id: $(this).data("article")._id,
              noteText: newNote
          };
          $.post("/api/notes", note).then(function(){
              bootbox.hideAll();
          });
      }
  }

  function noteDelete() {
      var noteDelete = $(this).data("_id");

      $.ajax({
          url: "/api/notes" + noteDelete,
          method: "DELETE"
      }).then(function(){
          bootbox.hideAll();
      });
  }

  function articleDelete(){
      var articleDelete =$(this).parents(".panel").data();

      $.ajax({
          method: "DELETE",
          url: "/api/headlines" + articleDelete._id
      }).then(function(data){
          if(data.ok){
              init();
          }
      });
  }

  function articleNotes(){
      var currentArticle = $(this).parents(".panel").data();
      $.get("/api/notes/" + currentArticle._id).then(function(data){
          // constructing inital html to add to notes modal
          var modalText = [
              "<duv class='container-fluid text center'>",
              "<h4> Notes for Article: ",
              currentArticle._id,
              "<h4>",
              "<hr />",
              "<ul class='list-group note-container'>",
              "</ul>",
              "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
              "<button class='btn btn-success save'>Save Note</button",
              "</div>"
          ].join("");
          bootbox.dialog({
              message: modalText,
              closeButton: true
          });
          var note = {
              _id: currentArticle._id,
              notes: data|| []
          };

          $(".btn.save").data("article", note);

          renderNotesList(note);
      });
  }

  function noteSave(){
      var note;
      var newNote = $(".bootbox-body textarea").val().trim();

      if(newNote){
          note = {
              _id: $(this).data("article")._id,
              noteText: newNote
          };
          $.post("/api/notes", note).then(function(){
              bootbox.hideAll();
          });
      }
  }
}); 