window.carbon = window.carbon || {};

(function($) {

	var carbon = window.carbon;

	if (typeof carbon.fields === 'undefined') {
		return false;
	}

	/*
	|--------------------------------------------------------------------------
	| Icon Field MODEL
	|--------------------------------------------------------------------------
	|
	| This class represents the model for the field.
	|
	| A model is responsible for holding the fields current state (data).
	| It also has all the logic surrounding the data management, like:
	|  - conversion
	|  - validation
	|  - access control
	|
	*/
	carbon.fields.Model.Icon = carbon.fields.Model.extend({
		defaults: _.extend({}, carbon.fields.Model.prototype.defaults, {
			'value': ''
		})
	});


	/*
	|--------------------------------------------------------------------------
	| Icon Field VIEW
	|--------------------------------------------------------------------------
	|
	| Holds the field DOM interactions (rendering, error state, etc..).
	| The field view also SYNCs the user entered data with the model.
	|
	| Views reflect what the applications data models look like.
	| They also listen to events and react accordingly.
	|
	| @element: .[id]
	| @holder:  carbon.views[id]
	|
	*/
	carbon.fields.View.Icon = carbon.fields.View.extend({
		// Add the events from the parent view and also include new ones
		events: function() {
			return _.extend({}, carbon.fields.View.prototype.events, {
				'change :input': '',
				'change :input[type="hidden"]:first': 'sync',
				'click .carbon-icon-preview': 'togglePopup',
				'click .carbon-icon-icon-trigger': 'changeValue',
				'keyup .carbon-icon-search input:first': 'search',
				'focus .carbon-icon-search input:first': 'focusSearch',
				'mousedown .carbon-icon-popup': 'iconScrollMouseDown'
			});
		},

		initialize: function() {
			// Initialize the parent view
			carbon.fields.View.prototype.initialize.apply(this); // do not delete

			this.on('field:rendered', (function() {
				this.$searchField = this.$('.carbon-icon-search input:first');
				this.$preview = this.$('.carbon-icon-preview:first');
				this.$previewIcon = this.$preview.find('i:first');
				this.$popup = this.$('.carbon-icon-popup:first');
			}).bind(this));
			this.listenTo(this.model, 'change:value', this.syncView);
		},

		togglePopup: function(event) {
			this.$popup.find('.carbon-icon-search input:first').focus();
			event.preventDefault();
		},

		changeValue: function(event) {
			var $a = this.$(event.currentTarget);
			var value = $a.attr('data-value');
			this.$('.carbon-icon-value').val(value).trigger('change');
			this.$('.carbon-icon-search').removeClass('carbon-icon-search-focus')
			event.preventDefault();
		},

		syncView: function(model) {
			this.$('.carbon-icon-icon-trigger').removeClass('active');
			this.$('.carbon-icon-icon-trigger[data-value="' + model.get('value') + '"]').addClass('active');

			var options = model.get('options');
			var value = model.get('value');
			var previousValue = model.previous('value');

			if ( previousValue && typeof options[previousValue] != 'undefined' ) {
				this.$previewIcon.removeClass(options[previousValue].class);
			}
			if ( value && typeof options[value] != 'undefined' ) {
				this.$previewIcon.addClass(options[value].class);
				this.$previewIcon.html(options[value].contents);
				this.$previewIcon.removeClass('hidden');
			} else {
				this.$previewIcon.addClass('hidden');
			}
		},

		search: function(event) {
			var query = $.trim( this.$(event.target).val().toLowerCase() );
			var options = this.model.get('options');

			if ( !query ) {
				this.$('.carbon-icon-icon-container').removeClass('hidden');
				return;
			}

			for (var id in options) {
				var option = options[id];
				var compareTo = [option.id, option.name].concat(option.categories);
				var match = false;
				for (var i = 0; i < compareTo.length; i++) {
					var str = compareTo[i].toLowerCase();
					if ( str.indexOf(query) !== -1 ) {
						match = true;
						break;
					}
				}

				var $container = this.$('.carbon-icon-icon-container-' + option.id);
				if ( match ) {
					$container.removeClass('hidden');
				} else {
					$container.addClass('hidden');
				}
			}

			var $iconList = this.$('.carbon-icon-list');
			var hasResults = this.$('.carbon-icon-icon-container:not(.hidden)').length > 0;
			$iconList.toggleClass('no-results', !hasResults);
		},

		focusSearch: function(event) {
			var $target = this.$('.carbon-icon-search').addClass('carbon-icon-search-focus');

			setTimeout(function() {
				$('body').one('mousedown', function(event) {
					$target.removeClass('carbon-icon-search-focus');
				});
			}, 10);
		},

		iconScrollMouseDown: function(event) {
			event.stopPropagation();
		}
	});

}(jQuery));
