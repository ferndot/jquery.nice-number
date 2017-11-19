# jQuery Nice Number
A tiny plugin that converts HTML numeric inputs (`type="number"`) into an
easily-styled format.

## Usage
### Prerequisites
Include the plugin files in your source.
```html
<link rel="stylesheet" href="jquery.nice-number/jquery.nice-number.css">
<script src="jquery.nice-number/jquery.nice-number.js"></script>
```

### Basic usage
Call the `niceNumber()` function on your jQuery element of choice.
> Pro Tip: use `$('input[type="number"]')` to select all numeric inputs in the
current page.
```javascript
$('input[type="number"]').niceNumber();
```

### Advanced usage
You can pass an optional object to `niceNumber()` containing advanced
configuration options.

#### Currently supported options
Name | Permitted values | Description | Default value
---- | ---------------- | ----------- | -------------
buttonDecrement | jQuery element, HTML element, HTML string, or plain string | The contents of the decrement button | `'-'`
buttonIncrement | jQuery element, HTML element, HTML string, or plain string | The contents of the increment button | `'+'`
buttonPosition | `'around'`, `'left'`, or `'right'` | The positions of the control buttons | `'around'`
