/**
* Character Counter v1.0
* ======================
*
* Character Counter is a simple, Twitter style character counter.
* 
* https://github.com/dtisgodsson/jquery-character-counter
*
* @author Darren Taylor
* @author Email: shout@darrenonthe.net
* @author Twitter: darrentaytay
* @author Website: http://darrenonthe.net
*
*/
(function($) {

	$.fn.characterCounter = function(options){
	  
		var defaults = {	
			limit: 150,
			counter: { 
				element: 'span', 
				css_class: 'counter',
				format: '%1'
			},
			exceeded: { 
				css_class: 'exceeded', 
				callback: null 
			}
		}; 
			
		var options = $.extend(defaults, options);

		return this.each(function() {
			$(this).after('<'+ options.counter.element +' class="' + options.counter.css + '"></'+ options.counter.element +'>');

			bind_events(this);
			check_count(this);
		});

		function render_text(count)
		{
			return options.counter.format.replace(/%1/, count);
		}

		function check_count(element)
		{
			var character_count  = $(element).val().length;
			var remaining        = options.limit - character_count;

			if( remaining < 0 )
			{
				$(element).next().addClass(options.exceeded.css_class);
			}
			else
			{
				$(element).next().removeClass(options.exceeded.css_class);
			}

			$(element).next().html(render_text(remaining));
		};	  

		function bind_events(element)
		{
			$(element)
				.bind("keyup keypress", function () { 
					check_count(element); 
				})
				.bind("paste", function () { 
					var self = this;
					setTimeout(function () { check_count(self); }, 0);
				});
		}
	};

})(jQuery);
