(function() {

  var container = byClass('container');


  // main entry point for the application
  function main() {

    var date = new Date();
    var month = createMonth(date);
    container.appendChild(month);

    window.onscroll = infiniteScroll;

  }



  // createDay(date) - returns a day DOM element
  var createDay = (function() {

    var baseDay = byClass('day');
    baseDay.remove();

    return function(date) {
      var day = baseDay.cloneNode(true);
      var label = byClass('day-label', day);

      label.innerText = dayOfWeek(date) + ' ' + date.getDate();
      day.setAttribute('data-date', date.toDateString());

      // mark today
      if (isToday(date)) day.id = 'today';

      return day;
    };

  })();



  // createMonth(date)
  // returns a month DOM element for the month of the given date
  var createMonth = (function() {

    var baseMonth = byClass('month');
    baseMonth.remove();

    return function(date) {

      var month = baseMonth.cloneNode(true);
      var header = byClass('month-header', month);
      var days = byClass('days', month);
      var monthNumber = date.getMonth();

      // TODO: year for January is wrong when scrolling down
      header.innerText = nameOfMonth(date) + ' ' + date.getUTCFullYear();

      // start at first of month
      date.setDate(1);

      while (date.getMonth() === monthNumber) {
        var day = createDay(date);
        days.appendChild(day);
        date.setDate( date.getDate() + 1 );
      }

      return month;
    };

  })();



  // returns a boolean
  function isToday(date) {
    return date.toDateString() === new Date().toDateString();
  }


  // return something like 'MON' or 'SUN'
  function dayOfWeek(date) {
    return date.toString().match(/[^\s]+/)[0].toUpperCase();
  }



  // nameOfMonth(date) - returns the name of the month
  // example: 'JANURARY' or 'SEPTEMBER'
  var nameOfMonth = (function() {

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

    return function(date) {
      return monthNames[date.getMonth()].toUpperCase();
    };

  })();



  function infiniteScroll() {
    var top = scrollTop();
    var maxTop = document.body.scrollHeight - document.documentElement.clientHeight;

    if (top <= 0) return fetchEarlierDates();
    if (top >= maxTop) fetchLaterDates();
  }


  function fetchEarlierDates() {
    var firstDay = byClass('day').getAttribute('data-date');
    var previousDay = new Date(firstDay);
    previousDay.setDate( previousDay.getDate() - 1 );
    var previousMonth = createMonth(previousDay);
    var currentMonth = byClass('month');
    container.insertBefore(previousMonth, currentMonth);
    scrollTop(currentMonth.offsetTop);
  }


  function fetchLaterDates() {
    var days = document.getElementsByClassName('day');
    var lastDay = days[days.length -1].getAttribute('data-date');
    var nextDay = new Date(lastDay);
    nextDay.setDate( nextDay.getDate() + 1 );
    var nextMonth = createMonth(nextDay);
    container.appendChild(nextMonth);
  }



  // get single element by classname
  // optionally give parent element as second parameter
  function byClass(name, el) {
    return (el || document).getElementsByClassName(name)[0];
  }



  // cross-browser get or set scrollTop
  function scrollTop(val) {
    var doc = document.documentElement;
    var body = document.body;

    if (val) return doc.scrollTop = body.scrollTop = val;

    return doc.scrollTop || body.scrollTop || 0;
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
