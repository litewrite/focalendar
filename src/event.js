(function(app) {



  var baseEvent = $('.event');
  baseEvent.remove();


  // returns a event DOM element
  app.event = function(date) {

    var event = baseEvent.clone();

    var content = event.find(',event-content');
    content.html('some bla');

    return event;
  }



})(focalendar);
