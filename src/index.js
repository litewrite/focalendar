(function() {

  var app = window.focalendar = {};


  app.$container = $('#container');


  // main entry point for the application
  app.run = function() {
    addCurrentMonth();

    $(window)
      .on('scroll', app.infiniteScroll)
      .on('touchmove', app.infiniteScroll);

    setTimeout(app.goToToday, 500);
  };


  function addCurrentMonth() {
    var now = new Date();
    var $month = app.month(now);
    app.$container.append($month);
  }

})();
