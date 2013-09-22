(function() {

  // main entry point for the application
  function main() {

    console.log('focalendar is up and running!');


    //
    // list days

    var container = byClass('container');

    var baseDay = byClass('day');
    baseDay.remove();

    var baseMonth = byClass('month');
    baseMonth.remove();


    var date = new Date();
    month = createMonth(baseMonth, baseDay, date);
    container.appendChild(month);

  }


  function createMonth(baseMonth, baseDay, date) {

    var month = baseMonth.cloneNode(true);
    var header = byClass('month-header', month);
    var days = byClass('days', month);

    var monthNumber = date.getMonth();

    header.innerText = nameOfMonth(date) + ' ' + date.getUTCFullYear();

    // start at first of month
    date.setDate(1);

    while (date.getMonth() === monthNumber) {
      var day = createDay(baseDay, date);
      days.appendChild(day);
      date.setDate( date.getDate() + 1 );
    }

    return month;
  }


  function createDay(base, date) {
    var day = base.cloneNode(true);
    var label = byClass('day-label', day);
    label.innerText = dayOfWeek(date) + ' ' + date.getDate();
    day.setAttribute('data-date', date.toDateString());
    if (isToday(date)) day.id = 'today';
    return day;
  }


  function isToday(date) {
    return date.toDateString() === new Date().toDateString();
  }


  // return something like 'MON' or 'SUN'
  function dayOfWeek(date) {
    return date.toString().match(/[^\s]+/)[0].toUpperCase();
  }


  // returns a function that takes a date
  // and returns something like 'JANURARY' or 'SEPTEMBER'
  var nameOfMonth = (function() {

    var monthNames = [
      'Janurary',
      'Februrary',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'SEPTEMBER',
      'October',
      'November',
      'December'
    ];

    return function(date) {
      return monthNames[date.getMonth()].toUpperCase();
    };

  })();


  // get single element by classname
  // optionally give parent element as second parameter
  function byClass(name, el) {
    return (el || document).getElementsByClassName(name)[0];
  }



  // kick of the application
  main();

  // ROADMAP
  //
  // highlight today
  // when you reach top or bottom while scrolling load more days
  // make month headers sticky to the month they belong to
  // add a notifier pointing in the direction where today is
  // grey out past days

})();
