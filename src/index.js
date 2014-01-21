(function() {

  // ROADMAP
  //
  // januaray sometimes has the wrong year
  // make month header sticky
  // add a notifier pointing in the direction where today is.
  // make events draggable.
  // only show first part of event description (title). expand on hover/click.
  // dynamic day size.
  // on mobile: hide menu when keyboard open
  // multiple calendars ?
  // add remotestorage.
  // update calendar at least once a day. select today & adjust sizes of days.
  // compatible with other calendars.
  // add web notifications.


  var app = window.focalendar = {};


  app.$container = $('#container');


  // main entry point for the application
  app.run = function() {
    addCurrentMonth();

    $(window)
      .on('scroll', app.infiniteScroll)
      .on('touchmove', app.infiniteScroll);

    app.goToToday();
  };


  function addCurrentMonth() {
    var now = new Date();
    var $month = app.month(now);
    app.$container.append($month);
  }

})();
