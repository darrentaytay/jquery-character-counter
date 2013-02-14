# jquery-character-counter

A simple, Twitter style character counter for HTML input fields. Based on your specified limit, the plugin simply adds a span ( by default ) after your HTML input and updates it as you type.

__Features:__
* Ctrl & V paste support
* Right click & paste support
* Customizable wrapper and css classes
* Customizable counter format

## Getting Started

To get started with the character counter, simply reference jQuery and the jQuery Character Counter plugin in your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>	
<script type="text/javascript" src="jquery.charactercounter.js"></script>
```

### Examples

#### Default Usage

__HTML:__
```html
<form>
  <textarea id="count_me"></textarea>
</form>
```
__Javascript:__
```javascript
$("#count_me").characterCounter();
```

#### Custom Limit

__HTML:__
```html
<form>
  <textarea id="count_me"></textarea>
</form>
```
__Javascript:__
```javascript
$("#count_me").characterCounter({
  limit: '250'  
});
```
***

### Options

The following options are currently available:

```javascript
limit: 150,
counter: { 
  wrapper: 'span', 
	css_class: 'counter',
	format: '%1'
},
exceeded: { 
	css_class: 'exceeded'
}
```

__limit:__ - the number of characters you wish to limit.  
__counter.wrapper__ - the element you wish to wrap your counter in.  
__counter.css_class__ - the CSS class to apply to your counter.  
__counter.format__ - the format of your counter text where '%1' will be replaced with the remaining character count.  
__exceeded.css_class__ - the CSS class to apply when your limit has been exceeded.  
