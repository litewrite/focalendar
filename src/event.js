(function(app) {



  var $baseEvent = $('.event');
  $baseEvent.remove();



  app.$container
    .on('blur', '.event-content', manageEvent)
    .on('keyup', '.event-content', createOrUpdate)
    .on('click', '.event', app.stopPropagation);



  // returns a event DOM element
  app.event = function(data) {

    var $event = $baseEvent.clone();

    if (data) {
      $event.attr('data-id', data.id);
      $event.find('.event-content').val(data.content);
    }

    return $event;
  };



  function manageEvent(e) {

    if (createOrUpdate(e)) return;

    var $edit = $(e.currentTarget);
    var $event = $edit.parent();
    var id = $event.attr('data-id');

    // delete
    if (id) app.store.remove(id);

    // remove DOM element
    $event.remove();
    // TODO: sometimes there is a error here
    // (Uncaught NotFoundError: An attempt was made to reference a Node in a context where it does not exist.)

  }



  function createOrUpdate(e) {
    var $edit = $(e.currentTarget);
    var $event = $edit.parent();
    var id = $event.attr('data-id');
    var content = $edit.val().trim();

    if (!content) return;

    // NOTE: this can probably be done nicer ;)
    var day = $event.parent().parent();
    var date = new Date(day.attr('data-date'));
    var data = { date: date, content: content };

    if (id) {
      // update
      app.store.set(id, data);
    } else {
      // create
      app.store.add(data)
        .then(function(data) {
          $event.attr('data-id', data.id);
        });
    }

    return true;
  }



})(focalendar);
