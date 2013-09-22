(function(app) {



  var baseEvent = $('.event');
  baseEvent.remove();



  app.container.on('click', '.event', function(e) {
    e.stopPropagation();
  });

  app.container.on('click', '.event-content', function(e) {

    var content = $(e.currentTarget);

    content.addClass('hide');
    content.parent().find('.event-edit').addClass('show')

  });

  app.container.on('blur', '.event-edit', function(e) {
    var edit = $(e.currentTarget);
    edit.removeClass('show');
    var event = edit.parent();
    var content = edit.val();
    if (!content) return event.remove();
    event.find('.event-content')
      .text(content)
      .removeClass('hide');
  });



  // returns a event DOM element
  app.event = function(date) {

    var event = baseEvent.clone();

    return event;
  }



})(focalendar);
