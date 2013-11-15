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
            counter_wrapper: 'span',
            counter_css_class: 'counter',
            counter_format: '%1',
            counter_exceeded_css_class: 'exceeded'
        }; 
            
        var options = $.extend(defaults, options);

        return this.each(function() {
            $(this).after('<'+ options.counter_wrapper +' class="' + options.counter_css_class + '"></'+ options.counter_wrapper +'>');

            bind_events(this);
            check_count(this);
        });

        function render_text(count)
        {
            return options.counter_format.replace(/%1/, count);
        }

        function check_count(element)
        {
            var character_count  = $(element).val().length;
            var remaining        = options.limit - character_count;

            if( remaining < 0 )
            {
                $(element).next("." + options.counter_css_class).addClass(options.counter_exceeded_css_class);
            }
            else
            {
                $(element).next("." + options.counter_css_class).removeClass(options.counter_exceeded_css_class);
            }

            $(element).next("." + options.counter_css_class).html(render_text(remaining));
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
