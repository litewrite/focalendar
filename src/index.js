(function() {


  var app = window.focalendar = {};



  // main entry point for the application
  app.run = function() {

    addCurrentMonth();

    $(window).scroll(app.infiniteScroll);

  };



  app.container = $('#container');



  function addCurrentMonth() {
    var now = new Date();
    var month = app.month(now);

    app.container.append(month);
  }



  // ROADMAP
  //
  // make events draggable
  // add remotestorage
  // dynamic day size
  // multiple calendars
  // add a notifier pointing in the direction where today is


})();
