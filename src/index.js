(function() {


  var app = window.focalendar = {};


  app.container = $('#container');



  // main entry point for the application
  app.run = function() {

    addCurrentMonth();

    $(window).scroll(app.infiniteScroll);
    $(window).on('touchmove', app.infiniteScroll);

  };



  function addCurrentMonth() {
    var now = new Date();
    var month = app.month(now);

    app.container.append(month);
  }



  // ROADMAP
  //
  // add remotestorage.
  // make events draggable.
  // dynamic day size.
  // update calendar at least once a day. select today & adjust sizes of days.
  // compatible with other calendars.
  // add times to events.
  // only show first part of event description (title). expand on hover/click.
  // add web notifications.
  // multiple calendars.
  // add a notifier pointing in the direction where today is.


})();
