(function(app) {


  var win = $(window);
  var menu = $('.menu');
  var todayLink = menu.find('a[href=#today]')



  todayLink.on('click', app.goToToday);



  app.goToToday = function(e) {

    console.log('here');
    if (e) e.preventDefault();


    var today = $('#today');
    var offsetTop = win.height() / 3;

    // TODO: maybe animate scrolling
    win.scrollTop(today.offset().top - offsetTop);

  }



})(focalendar);

