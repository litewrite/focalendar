(function() {



  // main entry point for the application
  function main() {

    addCurrentMonth();

  }



  var app = window.focalendar = main;



  app.container = $('#container');



  function addCurrentMonth() {
    var date = new Date();
    var month = app.month(date);
    app.container.append(month);
  }



  // ROADMAP
  //
  // add a notifier pointing in the direction where today is



})();
