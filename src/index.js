(function() {

main(document);


// main entry point for the application
function main(d) {

  console.log('focalendar is up and running!');


  //
  // list days

  var baseDay = byClass('day');
  baseDay.remove();

  var baseMonth = byClass('month');
  baseMonth.remove();


  var date = new Date();
  date.setMonth(date.getMonth() - 1);
  var month = createMonth(baseMonth, baseDay, date);
  byClass('container').appendChild(month);

  var date = new Date();
  month = createMonth(baseMonth, baseDay, date);
  byClass('container').appendChild(month);

  var date = new Date();
  date.setMonth(date.getMonth() + 1);
  var month = createMonth(baseMonth, baseDay, date);
  byClass('container').appendChild(month);

}


function createMonth(baseMonth, baseDay, date) {

  var month = baseMonth.cloneNode(true);
  var header = byClass('header', month);
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
  var label = byClass('label', day);
  label.innerText = dayOfWeek(date) + ' ' + date.getDate();
  day.setAttribute('data-date', date);
  return day;
}


// return something like 'MON' or 'SUN'
function dayOfWeek(date) {
  return date.toString().match(/[^\s]+/)[0].toUpperCase();
}


// return something like 'Janurary' or 'September'
function nameOfMonth(date) {

  var monthNames = [
    'Janurary',
    'Februrary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return monthNames[date.getMonth()];

}

function log(data) {
  // just proxy to console.log
  console.log.apply(console, arguments);
  // and make first arg available globally for debugging
  window.d = data;
}


// get single element by classname
// optionally give parent element as second parameter
function byClass(name, el) {
  return (el || document)['getElementsByClassName'](name)[0];
}




// ROADMAP
//
// each day has a number, a name and a events area
// add a month header wherever a month starts
// highlight weekends
// highlight today
// when you reach top or bottom while scrolling load more days
// make month headers sticky to the month they belong to
// add a notifier pointing in the direction where today is
// grey out past days

})();
