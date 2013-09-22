(function($) {



  // get single element by classname
  // optionally give parent element as second parameter
  $.byClass = function(name, el) {
    return (el || document).getElementsByClassName(name)[0];
  }



})(focalendar);
