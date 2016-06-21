$.ready(function(){
  var p = $.request({
    type: 'GET',
    url: 'http://spa-badge-api.herokuapp.com/teachers'
  }).then(function(response) {
    var theTemplateScript = $.select("#teacher-template").innerHTML
    var teachersResponse = JSON.parse(response)
    var theTemplate = Handlebars.compile(theTemplateScript)
    var context={
      teachers: teachersResponse
    }

    var compiledHtml = theTemplate(context);

    $.select("#placeholder").innerHTML = compiledHtml;
  })


})
