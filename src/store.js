(function(app) {

  // simple, inefficent localstorage implementation
  // can be replaced with something like remotestorage later on


  var PATH = 'focalendar';
  var storage = [];



  loadStorage();



  app.store = {


    get: function(date) {
      var data = [];
      for (var i = 0; i < storage.length; i++) {
        if (sameMonth(date, storage[i].date)) {
          data.push(storage[i]);
        }
      }
      return $.Deferred().resolve(data);
    },


    add: function(data) {
      data.id = Date.now();
      storage.push(data);
      saveStorage();
      return $.Deferred().resolve(data);
    },


    set: function(id, data) {
      data.id = id;
      storage[findItem(id)] = data;
      saveStorage();
      return $.Deferred().resolve(data);
    },


    remove: function(id) {
      storage.splice(findItem(id), 1);
      saveStorage();
      return $.Deferred().resolve();
    }


  };



  function loadStorage() {
    var existingData = localStorage.getItem(PATH);
    if (existingData) storage = JSON.parse(existingData);
  }



  function saveStorage() {
    localStorage.setItem(PATH, JSON.stringify(storage));
  }



  function findItem(id) {
    for (var i = 0; i < storage.length; i++) {
      // NOTE: maybe it's save to test both ids with .toString() here
      if (storage[i].id == id) return i;
    }
  }



  function sameMonth(a, b) {
    var dateA = new Date(a);
    var dateB = new Date(b);
    var year = dateA.getUTCFullYear() === dateB.getUTCFullYear();
    var month = dateA.getUTCMonth() === dateB.getUTCMonth();
    return year && month;
  }



})(focalendar);