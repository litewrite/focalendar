(function(app) {



  $('a[href="#today"]').on('click', goToToday);


  function goToToday() {

    var offsetTop = $(window).height() / 3;

    $('html,body').animate({
      scrollTop: $('#today').offset().top - offsetTop
    }, 700);

    return false;
  }


  app.goToToday = goToToday;



})(focalendar);
