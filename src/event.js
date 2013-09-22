(function(app) {



  var baseEvent = $('.event');
  baseEvent.remove();



  app.container.on('click', '.event', function(e) {
    e.stopPropagation();
  });

  app.container.on('blur', '.event-content', function(e) {
    var edit = $(e.currentTarget);
    var event = edit.parent();
    var content = edit.val();
    // TODO: sometimes there is a error here
    // (Uncaught NotFoundError: An attempt was made to reference a Node in a context where it does not exist.)
    if (!content) event.remove();
  });



  // returns a event DOM element
  app.event = function(date) {

    var event = baseEvent.clone();

    return event;
  }



})(focalendar);
