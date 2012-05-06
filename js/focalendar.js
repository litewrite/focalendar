$(function(){

	var Event = Backbone.Model.extend({

		defaults: function() {
			return {
				summary: null,
				dtstart: new Date(),
				dtend: new Date(),
				order: Events.nextOrder()
			};
		},

		initialize: function() {
			if (!this.get("summary")) {
				this.set({"summary": this.defaults.summary});
			}
			if (!this.get("dtstart")) {
				this.set({"dtstart": this.defaults.dtstart});
			}
			if (!this.get("dtend")) {
				this.set({"dtend": this.defaults.dtend});
			}
		},

		clear: function() {
			this.destroy();
		}

	});












	var EventList = Backbone.Collection.extend({

		model: Event,

		localStorage: new Store("events"),

		nextOrder: function() {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(event) {
			return event.get('order');
		}

	});

	var Events = new EventList;









	var EventView = Backbone.View.extend({

		tagName:	"li",

		template: _.template($('#item-template').html()),

		events: {
			"dblclick .view"	: "edit",
			"click a.destroy" : "clear",
			"keypress .edit"	: "updateOnEnter",
			"blur .edit"			: "close"
		},

		initialize: function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			console.log(this.$el);
			this.input = this.$('.edit');
			return this;
		},

		edit: function() {
			this.$el.addClass("editing");
			this.input.focus();
		},

		close: function() {
			var value = this.input.val();
			if (!value) this.clear();
			this.model.save({title: value});
			this.$el.removeClass("editing");
		},

		updateOnEnter: function(e) {
			if (e.keyCode == 13) this.close();
		},

		clear: function() {
			this.model.clear();
		}

	});











	var AppView = Backbone.View.extend({

		el: $('#calendars'),

		events: {
			// TODO: Add onEnter.
			//"keypress #new-event":	"createOnEnter",
			"click .calendar":	"createEvent"
		},

		initialize: function() {
			// Useless: Element is not available at startup.
			//this.input = this.$("#new-event");

			Events.bind('add', this.addOne, this);
			Events.bind('reset', this.addAll, this);
			Events.bind('all', this.render, this);

			this.main = $('#main');

			Events.fetch();
		},

		render: function() {
			if (Events.length) {
				this.main.show();
			} else {
				this.main.hide();
			}
		},

		addOne: function(event) {
			var view = new EventView({model: event});
			// This is the target at which all events get appended.
			this.$("#calendar").append(view.render().el);
		},
		
		addAll: function() {
			Events.each(this.addOne);
		},

		createOnEnter: function(e) {
			if (e.keyCode != 13) return;
			if (!this.input.val()) return;

			Events.create({title: this.input.val()});
			this.input.val('');
		},

		createEvent: function(e) {
			// Get fresh reference. Lazy loading.
			var input = this.$("#new-event");
			if (!input.val()) return;
			Events.create({title: input.val()});
			input.remove();
		}


	});

	var App = new AppView;

	// initialize remoteStorage.js
	syncer.display('remotestorage-connect', ['events'], 'syncer/', function (e) {
		App.render();
	});

	// creating a new event
	$('.calendar').click(function(e) {
		$(this).append('<textarea id="new-event"></textarea>');
		$('#new-event').css('top',e.pageY-10).css('left',$(this).left).focus();
	});

	// adding the label for days
	$('#grid').children('.row-fluid').each(function(index) {
		$(this).children('h3').html(moment($(this).attr('id')).format('D dddd'));
		if((moment($(this).attr('id')).format('dddd') == 'Saturday') || (moment($(this).attr('id')).format('dddd') == 'Sunday')) {
			$(this).addClass('weekend');
		}
	});


	// for each element (of class/id targets)
	// get the ISO-duration from the duration attribute (sth like "PT120M", see http://en.wikipedia.org/wiki/ISO_8601#Durations and http://microformats.org/wiki/hcalendar#Format
	// and set the height accordings to that duration, changed by a the dynFactor.

	function sizeEvents(targets, dynFactor) {
			$(targets).each(
				function () { 
					var ISOduration = $(this).children(".duration").attr("title");
					var duration = ISOduration.substring(ISOduration.indexOf(1), ISOduration.indexOf('M'));
					$(this).height( duration * dynFactor );
					}
			);
	}

	// factor: pixels per minute
	// window.innerHeight = amount of vertical space available
	// 24h => 1440min. 

	// example: availabe space => 600px. factor: 600 px / 1440 minutes = 0.41
	// available space currently 40% of innerHeight (#today is set to 40%), hence the 0.4.

	sizeEvents('.demovevent', ( (window.innerHeight*0.4)/1440) )

});



