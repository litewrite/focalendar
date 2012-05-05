$(function(){

	var Event = Backbone.Model.extend({

		defaults: function() {
			return {
				summary: "No event summary",
				dtstart: "No start date",
				dtend: "No end date",
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

		el: $("#focalenderapp"),

		events: {
			"keypress #new-event":	"createOnEnter"
		},

		initialize: function() {
			this.input = this.$("#new-event");

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
			this.$("#event-list").append(view.render().el);
		},
		
		addAll: function() {
			Events.each(this.addOne);
		},

		createOnEnter: function(e) {
			if (e.keyCode != 13) return;
			if (!this.input.val()) return;

			Events.create({title: this.input.val()});
			this.input.val('');
		}


	});

	var App = new AppView;



	$('.calendar').click(function(e) {
		$(this).append('<textarea id="newevent"></textarea>');
		$('#newevent').css('left',e.pageX-10).css('top',e.pageY-10).focus();
	});
});




function sizeEvents() {
		$(".vevent").each(function () { 
			 var ISOduration = $(this).children(".duration").attr("title");
			 var duration = ISOduration.substring(ISOduration.indexOf(1), ISOduration.indexOf('M'));
			 var heightMapping = 0.3;
			 $(this).height(duration*heightMapping);
		});
};


