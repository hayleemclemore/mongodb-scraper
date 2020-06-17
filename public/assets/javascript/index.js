$(document).ready(function () {
  var articleContainer = $(".article-container");

  $(document).on("click", ".scrape-new", articleScrape);
  $(document).on("click", ".save", articleSave);

  init();

  function init() {
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(function (data) {


      if (data && data.length) {
        renderArticles(data);
      } else {
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    var panel = $(
      [
        "<li class='list-group-item'>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h5>",
        article.headline,
        "</h5>",
        "</div>",
        "<div class='panel-body'>",
        "<p>",
        article.summary,
        "</p>",
        "</div>",
        "<a class='btn btn-outline save'>",
        "Save Article",
        "</a>",
        "</div>",
        "</li>"
      ].join("")
    );
    panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
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
        "</div>",
      ].join("")
    );
    articleContainer.append(emptyAlert);
  }

  function articleSave() {
    var articleToSave = $(this).parents(".panel").data();
    articleToSave.saved = true;


    $.ajax({
      method: "PATCH",
      url: "/api/headlines",
      data: articleToSave,
    }).then(function (data) {
      if (data.ok) {
        init();
      }
    });
  }

  function articleScrape() {
    console.log("I was clicked!")
    $.get("/api/fetch").then(function (data) {
      init();
      bootbox.alert(
        "<h3 class='text-center m-top-80'>" + data.message + "</h3>"
      );
    });
  }
});