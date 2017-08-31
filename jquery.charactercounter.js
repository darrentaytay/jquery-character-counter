/**
 * Character Counter v1.5.2
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

    $.fn.characterCounter = function(opts){

        var defaults = {
            exceeded: false,
            counterSelector: false,
	    countNewLineChars: false,
            limit: 150,
            renderTotal: false,
            counterWrapper: 'span',
            counterCssClass: 'counter',
            counterFormat: '%1',
            counterExceededCssClass: 'exceeded',
            increaseCounting: false,
            onExceed: function(count) {},
            onDeceed: function(count) {},
            customFields: {}
        };

        var options = $.extend(defaults, opts);

        return this.each(function() {
            var html5len = $(this).attr('maxlength');
            if (typeof html5len !== typeof undefined && html5len !== false) {
                $.extend(defaults, {
                    limit: parseInt($(this).attr('maxlength'))
                });
            }
            if (!options.counterSelector) {
                $(this).after(generateCounter());
            }
            bindEvents(this);
            checkCount(this);
        });

        function customFields(params)
        {
            var i, html='';

            for (i in params)
            {
                html += ' ' + i + '="' + params[i] + '"';
            }

            return html;
        }

        function generateCounter()
        {
            var classString = options.counterCssClass;

            if ( options.customFields['class'] )
            {
                classString += " " + options.customFields['class'];
                delete options.customFields['class'];
            }

            return '<'+ options.counterWrapper +customFields(options.customFields)+' class="' + classString + '"' + ' data-limit="' + options.limit + '"' + '></'+ options.counterWrapper +'>';
        }

        function renderText(count, limit)
        {
            var rendered_count = options.counterFormat.replace(/%1/, count);

            if ( options.renderTotal )
            {
                rendered_count += '/'+ (limit !== undefined ? limit : options.limit);
            }

            return rendered_count;
        }

        function checkCount(element)
        {
            var characterCount = $(element).val().length;

	    if (options.countNewLineChars) {
		characterCount+=$(element).val().split(/\r*\n/).length;
	    }

            var counter = options.counterSelector ? $(options.counterSelector) : $(element).nextAll("." + options.counterCssClass).first();
            var counterLimit = counter.attr('data-limit');
            var remaining = counterLimit - characterCount;
            var condition = remaining < 0;

            if ( options.increaseCounting )
            {
                remaining = characterCount;
                condition = remaining > counterLimit;
            }

            if ( condition )
            {
                counter.addClass(options.counterExceededCssClass);
                options.exceeded = true;
                options.onExceed(characterCount);
            }
            else
            {
                if ( options.exceeded ) {
                    counter.removeClass(options.counterExceededCssClass);
                    options.onDeceed(characterCount);
                    options.exceeded = false;
                }
            }

            counter.html(renderText(remaining, counterLimit));
        }

        function bindEvents(element)
        {
            $(element)
                .on("input change", function () {
                    checkCount(element);
                });
        }
    };

})(jQuery);
