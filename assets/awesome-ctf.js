var getFileData = function(url) {
  $.ajax({
    url: url,
    headers: {
      "Accept": "application/vnd.github.v3.raw"
    }
  }).done(function(data) {
    var converter = new Showdown.converter();
    var html = converter.makeHtml(data);
    $("#content").html(html)
    var thanks = '<div id="thanks">Styles for the website were quickly taken from <a href="http://awesome-go.com/" title="Awesome Go">awesome-go</a></div>';
    $("#content").append(thanks);
  })
};

$(document).ready(function(){
  $.getJSON("https://api.github.com/repos/apsdehal/awesome-ctf/git/trees/HEAD").
    done(function(data){
      for (var i = data.tree.length - 1; i >= 0; i--) {
        if(data.tree[i].path == "README.md") {
          getFileData(data.tree[i].url);
          break;
        }
      };
    });
});