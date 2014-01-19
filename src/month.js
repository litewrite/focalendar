(function(app) {



  var $baseMonth = $('.month');
  $baseMonth.remove();



  // returns a month DOM element for the month of the given date
  app.month = function(date) {

    var $month = $baseMonth.clone();
    var $header = $month.find('.month-header');
    var $days = $month.find('.days');
    var monthNumber = date.getMonth();
    var waitForEvents = getEvents(date);

    // TODO: year for January is wrong when scrolling down
    $header.text( nameOfMonth(date) + ' ' + date.getUTCFullYear() );

    // start at first of month
    date.setDate(1);

    while (date.getMonth() === monthNumber) {
      var day = app.day(date);
      $days.append(day);
      date.setDate( date.getDate() + 1 );
    }

    waitForEvents.then(function(events) {
      addEvents($month, events);
    });

    return $month;
  };



  function getEvents(date) {
    return app.store.get(date);
  }



  function addEvents($month, events) {
    $month.find('.day').each(function() {
      var $day = $(this);
      createDayEvents($day, events);
    });
  }



  function createDayEvents($day, events) {
    var dayDate = $day.attr('data-date');
    for (var i = 0, len = events.length; i < len; i++) {
      var event = events[i];
      if (sameDay(dayDate, event.date)) {
        app.day.addEvent($day, event);
      }
    };
  }



  var monthNames = [
    'JANURARY',
    'FEBRURARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
  ];


  // returns the name of the month
  // example: 'JANURARY' or 'SEPTEMBER'
  function nameOfMonth(date) {
    return monthNames[date.getMonth()];
  }



  function sameDay(a, b) {
    return new Date(a).toDateString() === new Date(b).toDateString();
  }



})(focalendar);
