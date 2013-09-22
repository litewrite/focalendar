(function(app) {

  var body = $('body');
  var win = $(window);



  app.infiniteScroll = function() {
    var top = body.scrollTop();
    var maxTop = body.height() - win.height();

    if (top <= 0) return fetchEarlierDates();
    if (top >= maxTop) fetchLaterDates();
  };


  function fetchEarlierDates() {
    var firstDay = $('.day').attr('data-date');
    var previousDay = new Date(firstDay);

    previousDay.setDate( previousDay.getDate() - 1 );

    var previousMonth = app.month(previousDay);
    var currentMonth = $('.month');

    app.container.prepend(previousMonth);

    body.scrollTop(currentMonth.offset().top);
  }


  function fetchLaterDates() {
    var lastDay = $('.day').last().attr('data-date');
    var nextDay = new Date(lastDay);

    nextDay.setDate( nextDay.getDate() + 1 );

    var nextMonth = app.month(nextDay);

    app.container.append(nextMonth);
  }



})(focalendar);
