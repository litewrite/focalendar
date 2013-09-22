(function() {



  // main entry point for the application
  function main() {

    app.container = $('#container');

    addCurrentMonth();

    $(window).scroll(app.infiniteScroll);

    app.container.on('click', '.day', function(e) {
      var day = $(e.target);
      var events = day.find('.event');

      events.append(app.event());
    });

  }



  var app = window.focalendar = main;





  function addCurrentMonth() {
    var date = new Date();
    var month = app.month(date);
    app.container.append(month);
  }



  // ROADMAP
  //
  // add a notifier pointing in the direction where today is



})();
