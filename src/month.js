(function($) {



  // has to be removed after baseDay
  var baseMonth = $.byClass('month');
  baseMonth.remove();


  // returns a month DOM element for the month of the given date
  $.month = function(date) {

    var month = baseMonth.cloneNode(true);
    var header = $.byClass('month-header', month);
    var days = $.byClass('days', month);
    var monthNumber = date.getMonth();

    // TODO: year for January is wrong when scrolling down
    header.innerHTML = nameOfMonth(date) + ' ' + date.getUTCFullYear();

    // start at first of month
    date.setDate(1);

    while (date.getMonth() === monthNumber) {
      var day = $.day(date);
      days.appendChild(day);
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
