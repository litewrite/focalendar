(function($) {



  // baseDay has to be removed before removing baseMonth
  var baseDay = $.byClass('day');
  baseDay.remove();


  // returns a day DOM element
  $.day = function(date) {
    var day = baseDay.cloneNode(true);
    var label = $.byClass('day-label', day);

    label.innerHTML = dayOfWeek(date) + ' ' + date.getDate();
    day.setAttribute('data-date', date.toDateString());

    if (isToday(date)) {
      day.id = 'today';
    } else if (isPast(date)) {
      day.classList.add('past');
    }

    return day;
  };



  // returns a boolean
  function isToday(date) {
    return date.toDateString() === new Date().toDateString();
  }

  // returns a boolean
  function isPast(date) {
    return date < new Date();
  }


  // return something like 'MON' or 'SUN'
  function dayOfWeek(date) {
    return date.toString().match(/[^\s]+/)[0].toUpperCase();
  }



})(focalendar);
