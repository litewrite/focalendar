(function(app) {



  var baseMonth = $('.month');
  baseMonth.remove();


  // returns a month DOM element for the month of the given date
  app.month = function(date) {

    var month = baseMonth.clone();
    var header = month.find('.month-header');
    var days = month.find('.days');
    var monthNumber = date.getMonth();

    // TODO: year for January is wrong when scrolling down
    header.text( nameOfMonth(date) + ' ' + date.getUTCFullYear() );

    // start at first of month
    date.setDate(1);

    while (date.getMonth() === monthNumber) {
      var day = app.day(date);
      days.append(day);
      date.setDate( date.getDate() + 1 );
    }

    return month;
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



})(focalendar);
