(function($) {



  $.infiniteScroll = function() {
    var top = scrollTop();
    var maxTop = document.body.scrollHeight - document.documentElement.clientHeight;

    if (top <= 0) return fetchEarlierDates();
    if (top >= maxTop) fetchLaterDates();
  }


  function fetchEarlierDates() {
    var firstDay = $.byClass('day').getAttribute('data-date');
    var previousDay = new Date(firstDay);
    previousDay.setDate( previousDay.getDate() - 1 );
    var previousMonth = $.month(previousDay);
    var currentMonth = $.byClass('month');
    $.container.insertBefore(previousMonth, currentMonth);
    scrollTop(currentMonth.offsetTop);
  }


  function fetchLaterDates() {
    var days = document.getElementsByClassName('day');
    var lastDay = days[days.length -1].getAttribute('data-date');
    var nextDay = new Date(lastDay);
    nextDay.setDate( nextDay.getDate() + 1 );
    var nextMonth = $.month(nextDay);
    $.container.appendChild(nextMonth);
  }



  // cross-browser get or set scrollTop
  function scrollTop(val) {
    var doc = document.documentElement;
    var body = document.body;

    if (val) return doc.scrollTop = body.scrollTop = val;

    return doc.scrollTop || body.scrollTop || 0;
  }



})(focalendar);
