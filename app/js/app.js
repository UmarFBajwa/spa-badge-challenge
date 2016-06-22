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

    attachListener();
  })

  var attachListener = function(){
  $.on('#teacher-list', 'click', function(event) {
    event.preventDefault();
    var teacherLink = event.target.getAttribute('href');
    var specificTeacher = $.request({
      type: 'GET',
      url: teacherLink
    }).then(function(response) {
      var theBadgeScript = $.select('#badge-template').innerHTML;
      var teacherJSON = JSON.parse(response);
      var theTemplate = Handlebars.compile(theBadgeScript)
      var context = {
        badges: teacherJSON.badges
      }
      var compiledHtml = theTemplate(context);

      $.select('#placeholder').innerHTML = compiledHtml;
    })
  });
  }

})
