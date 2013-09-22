(function() {



  // main entry point for the application
  function main() {

    $.container = $.byClass('container');

    addCurrentMonth();

    window.onscroll = $.infiniteScroll;

  }



  var $ = window.focalendar = main;





  function addCurrentMonth() {
    var date = new Date();
    var month = $.month(date);
    $.container.appendChild(month);
  }



  // ROADMAP
  //
  // add a notifier pointing in the direction where today is



})();
