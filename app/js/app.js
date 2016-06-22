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
          badges: teacherJSON.badges,
          name: teacherJSON.name,
          id: teacherJSON.id
        }
        var compiledHtml = theTemplate(context);
        $.select('#placeholder').innerHTML = compiledHtml;
        attachFormListener();
      })
    });
  }

  var attachFormListener = function(){
    $.on('#badge-form', 'submit', function(event){
      event.preventDefault();
      var oldURL = this.getAttribute('action');
      var that = this;
      var qString = "phrase=" + that.childNodes[5].value + "&votes=0" +"&teacher_id=" + that.childNodes[3].value
      var newURL = oldURL + "?" + qString
      var specificBadge = $.request({
        type: 'POST',
        url: newURL
      }).then(function(response) {
        console.log("SUCCESS" + response)
        var teacherLink = 'http://spa-badge-api.herokuapp.com/teachers/' + JSON.parse(response).teacher_id
        var specificTeacher = $.request({
          type: 'GET',
          url: teacherLink
        }).then(function(response) {
          var theBadgeScript = $.select('#badge-template').innerHTML;
          var teacherJSON = JSON.parse(response);
          var theTemplate = Handlebars.compile(theBadgeScript)
          var context = {
            badges: teacherJSON.badges,
            name: teacherJSON.name,
            id: teacherJSON.id
          }
          var compiledHtml = theTemplate(context);
          $.select('#placeholder').innerHTML = compiledHtml;
        })

      }).catch(function(response) {
        console.log("FAILURE" + response)
      })
    })
  }

})
