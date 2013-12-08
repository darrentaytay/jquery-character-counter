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
            exceeded: false,
            limit: 150,
            counterWrapper: 'span',
            counterCssClass: 'counter',
            counterFormat: '%1',
            counterExceededCssClass: 'exceeded',
            onExceed: function(count) {},
            onDeceed: function(count) {},

            customFields: ['isjustatestchangeit=thevalueisthis', 'youhaveto=separatethisthatway', 'onlythefirstequalcharacter=willbecatch'],
        }; 
            
        var options = $.extend(defaults, options);

        return this.each(function() {
            $(this).after('<'+ options.counterWrapper +customFields(options.customFields)+' class="' + options.counterCssClass + '"></'+ options.counterWrapper +'>');
            bindEvents(this);
            checkCount(this);
        });
        
        function customFields (fields)
        {
            var i, fields_html;
      
            if(fields != null && fields.length>0 && fields != '')
            {
                for(i in fields)
                {
                split = fields[i].split(/=(.+)?/) /* Split only the first ocurrence of the string '=' */
                delete split[split.length - 1]
                field_name = split[0]
                field_value = split[1]
                fields_html += ' ' + field_name + '="' + field_value + '"'
                }
            }
            
            return fields_html
        }

        function renderText(count)
        {
            return options.counterFormat.replace(/%1/, count);
        }

        function checkCount(element)
        {
            var characterCount  = $(element).val().length;
            var remaining        = options.limit - characterCount;

            if( remaining < 0 )
            {
                $(element).next("." + options.counterCssClass).addClass(options.counterExceededCssClass);
                options.exceeded = true;
                options.onExceed(characterCount);
            }
            else
            {
                if(options.exceeded) {
                    $(element).next("." + options.counterCssClass).removeClass(options.counterExceededCssClass);
                    options.onDeceed(characterCount);
                    options.exceeded = false;
                }
            }

            $(element).next("." + options.counterCssClass).html(renderText(remaining));
        };    

        function bindEvents(element)
        {
            $(element)
                .bind("keyup", function () { 
                    checkCount(element); 
                })
                .bind("paste", function () { 
                    var self = this;
                    setTimeout(function () { checkCount(self); }, 0);
                });
        }
    };

})(jQuery);
